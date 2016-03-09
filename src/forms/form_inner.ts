/// <reference path="../../typings/uischema.d.ts"/>

import { Directive, ElementRef, DynamicComponentLoader, Input, OnInit, provide, Injector, Inject,Optional } from 'angular2/core';
import {RendererRegistry,ChangeNotification} from './forms';
declare var JsonRefs;

@Directive({selector: 'form-inner'})
export class FormInner implements OnInit{
    @Input("uiSchema") private _uiSchema: IUISchemaElement;
    @Input("data") private _data: any;
    @Input("dataSchema") private _dataSchema: any;
    private _refs:any;
    constructor(private _elementRef: ElementRef, private _rendererRegistry:RendererRegistry, private _loader:DynamicComponentLoader,@Optional()  @Inject('uiSchema') private _oldUiSchema:ILayout, @Optional() @Inject('dataSchema') private _oldDataSchema:any, @Optional() @Inject('data') private _oldData:any, @Optional() @Inject('uiSchemaRefs') private _oldUiSchemaRefs:any ) {

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
                    this.render();
                }, err => {console.log(err.stack);}
            );
        }
        else{
            this._dataSchema=this._oldDataSchema;
            this.render();
        }

    }
    render():void{
        if(this._uiSchema==null)
            this._uiSchema=this._oldUiSchema;
        if(this._data==null)
            this._data=this._oldData;
        if(this._oldUiSchemaRefs!=null)
            this._refs=this._oldUiSchemaRefs;

        this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this._uiSchema,this._dataSchema,this._data), this._elementRef,
        Injector.resolve([provide('uiSchema', {useValue: this._uiSchema}),provide('data', {useValue: this._data}),provide('dataSchema', {useValue: this._dataSchema}),provide('uiSchemaRefs', {useValue: this._refs})]));
    }
}
