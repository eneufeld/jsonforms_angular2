/// <reference path="../../typings/uischema.d.ts"/>

import { Directive, ElementRef, DynamicComponentLoader, Input, OnInit, provide, Injector, Inject} from 'angular2/core';
import {RendererRegistry,ChangeNotification,FormsService} from './forms';

@Directive({selector: 'form-inner'})
export class FormInner implements OnInit{
    @Input("uiSchema") private _uiSchema: IUISchemaElement;
    @Input("data") private _data: any;
    @Input("dataSchema") private _dataSchema: any;
    constructor(private _elementRef: ElementRef, private _rendererRegistry:RendererRegistry, private _loader:DynamicComponentLoader) {

    }
    ngOnInit() {
        this.render();
    }
    private render():void{
        this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this._uiSchema,this._dataSchema,this._data), this._elementRef,
        Injector.resolve([provide('uiSchema', {useValue: this._uiSchema}),provide('data', {useValue: this._data}),provide('dataSchema', {useValue: this._dataSchema})]));
    }
}
