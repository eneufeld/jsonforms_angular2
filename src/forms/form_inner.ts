/// <reference path="../../typings/uischema.d.ts"/>

import { Directive, ElementRef, DynamicComponentLoader, Input, OnInit, provide, Injector, Inject} from 'angular2/core';
import {RendererRegistry,ChangeNotification} from './forms';
declare var JsonRefs;

@Directive({selector: 'form-inner'})
export class FormInner implements OnInit{
    @Input("uiSchema") private _uiSchema: IUISchemaElement;
    @Input("data") private _data: any;
    @Input("dataSchema") private _dataSchema: any;
    constructor(private _elementRef: ElementRef, private _rendererRegistry:RendererRegistry, private _loader:DynamicComponentLoader) {

    }
    ngOnInit() {
        JsonRefs.resolveRefs(this._dataSchema)
            .then(res =>{
                // Do something with the response
                // res.refs: JSON Reference locations and details
                // res.resolved: The document with the appropriate JSON References resolved
                this._dataSchema=res.resolved;
                this.render();
            }, err => {console.log(err.stack);}
        );


    }
    render():void{
        this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this._uiSchema,this._dataSchema,this._data), this._elementRef,
        Injector.resolve([provide('uiSchema', {useValue: this._uiSchema}),provide('data', {useValue: this._data}),provide('dataSchema', {useValue: this._dataSchema})]));
    }
}
