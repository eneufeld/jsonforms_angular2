/// <reference path="../../typings/uischema.d.ts"/>

import { Directive, ElementRef, DynamicComponentLoader,ComponentRef, Input, OnInit, provide, Provider,Injector, Inject,Optional,KeyValueDiffers,IterableDiffers,AfterContentInit,DoCheck,OnChanges } from 'angular2/core';
import {RendererRegistry,ChangeNotification,FormsService,FormServiceFactory,UISchemaProviderService,UISchemaParameter} from './forms';
declare var JsonRefs;

@Directive({selector: 'form-outlet'})
export class FormOutlet implements OnInit,DoCheck,AfterContentInit,OnChanges{
    @Input("uiSchema") private _uiSchema: IUISchemaElement;
    @Input("data") private _data: any;
    @Input("dataSchema") private _dataSchema: any;
    @Input("uiSchemaParameter") private _uiSchemaParameter: UISchemaParameter;

    @Input("root") private _root: boolean;
    @Input("refs") private _refs:any;
    private _keyValueDiffer: any;
    private _iterableDiffer: {[key:string]:any}={};
    private _initialized=false;
    private _services:Array<FormsService>=[];
    private _renderedChild:ComponentRef;

    constructor(private _elementRef: ElementRef, private _rendererRegistry:RendererRegistry, private _loader:DynamicComponentLoader,
        private _keyValueDifferFactory: KeyValueDiffers, private _iterableDifferFactory: IterableDiffers, private _uiSchemaProvider:UISchemaProviderService ,
        @Inject('FormServiceFactories') private _serviceFactories: Array<FormServiceFactory>,
        @Optional()  @Inject('uiSchema') private _oldUiSchema:ILayout,
         @Optional() @Inject('dataSchema') private _oldDataSchema:any,
         @Optional() @Inject('data') private _oldData:any,
         @Optional() @Inject('uiSchemaRefs') private _oldUiSchemaRefs:any ) {
             this._root=false;
    }



    ngOnInit() {
        if(this._dataSchema!=null){
            JsonRefs.resolveRefs(this._dataSchema)
                .then(res =>{
                    // Do something with the response
                    // res.refs: JSON Reference locations and details
                    // res.resolved: The document with the appropriate JSON References resolved
                    this._dataSchema=res.resolved;
                    if(Object.keys(res.refs).length!=0)
                        this._refs=res.refs;
                    if(this._root){
                        this.initRoot();
                    }
                    this.render();
                }, err => {console.log(err.stack);}
            );
        }
        else{
            this._dataSchema=this._oldDataSchema;
            if(this._root){
                this.initRoot();
            }
            this.render();
        }

    }
    private initRoot(){
        if(this._uiSchema==null){
            this._uiSchema=this._uiSchemaProvider.getBestComponent(this._dataSchema,this._uiSchemaParameter);
        }
        this._serviceFactories.forEach(serviceFactory=>{
          this._services.push(serviceFactory.createFormService(this._dataSchema,this._uiSchema,this._data));
        });
        this._keyValueDiffer = this._keyValueDifferFactory.find({}).create(null);
        let properties=this._dataSchema.properties;
        if(properties!=null)
            Object.keys(properties).forEach(key => {
              let property=properties[key];
              if(property.type=='array'){
                  let differ = this._iterableDifferFactory.find([]).create(null);
                  this._iterableDiffer[key]=differ;
              }
            });
    }
    private render():void{
        if(this._renderedChild!=null)
            this._renderedChild.dispose();
        if(this._uiSchema==null)
            this._uiSchema=this._oldUiSchema;
        if(this._data==null)
            this._data=this._oldData;
        if(this._oldUiSchemaRefs!=null)
            this._refs=this._oldUiSchemaRefs;
        if(this._data==null)
          return;
        let curcomponent=this._rendererRegistry.getBestComponent(this._uiSchema,this._dataSchema,this._data);

        if(curcomponent){
            let toResolve:Array<Provider>=[
                provide('uiSchema', {useValue: this._uiSchema}),
                provide('data', {useValue: this._data}),
                provide('dataSchema', {useValue: this._dataSchema}),
                provide('uiSchemaRefs', {useValue: this._refs})
            ];
            if(this._uiSchemaParameter!=undefined){
                toResolve.push(provide('uiSchemaParameter', {useValue: this._uiSchemaParameter}));
            }

            let promise:Promise<ComponentRef>=this._loader.loadNextToLocation(curcomponent, this._elementRef,Injector.resolve(toResolve));
            promise.then(result=>{this._renderedChild=result;})
        }
        else{
            console.log(JSON.stringify(this._uiSchema));
            console.log(JSON.stringify(this._dataSchema));
        }
    }

    ngDoCheck() {
        if(!this._initialized || !this._root)
            return;
        var keyValueChanges = this._keyValueDiffer.diff(this._data);
        if (keyValueChanges) {
            keyValueChanges.forEachAddedItem(r => {
                this._services.forEach(service =>service.onAdd(new ChangeNotification( r.key, r.previousValue, r.currentValue)));
            });
            keyValueChanges.forEachRemovedItem(r => {
                this._services.forEach(service =>service.onRemove(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
            });
            keyValueChanges.forEachChangedItem(r => {
                this._services.forEach(service =>service.onChange(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
            });
        }
        //check all arrays in data schema and validate them
        Object.keys(this._iterableDiffer).forEach(key =>{
            var iterableChanges = this._iterableDiffer[key].diff(this._data[key]);
            if (iterableChanges) {
                iterableChanges.forEachAddedItem(r => {
                    this._services.forEach(service =>service.onAdd(new ChangeNotification( r.key, r.previousValue, r.currentValue)));
                });
                iterableChanges.forEachRemovedItem(r => {
                    this._services.forEach(service =>service.onRemove(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
                });
                iterableChanges.forEachIdentityChange(r => {
                    this._services.forEach(service =>service.onChange(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
                });
                iterableChanges.forEachMovedItem(r => {
                    this._services.forEach(service =>service.onChange(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
                });
            }
        });
    }
    ngAfterContentInit(): any {
        this._initialized=true;
    }
    ngOnChanges(){
        if(!this._initialized || !this._root)
            return;
        this.render();
    }
}
