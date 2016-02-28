/// <reference path="../typings/uischema.d.ts"/>

import { Directive, ElementRef, DynamicComponentLoader, Input, OnInit, DoCheck, provide, Injector, KeyValueDiffers, Inject, AfterContentInit} from 'angular2/core';
import {RendererRegistry,ChangeNotification,FormsService} from './forms';

@Directive({selector: 'form-outlet'})
export class FormOutlet implements OnInit, DoCheck,AfterContentInit{
    @Input("uiSchema") private _uiSchema: IUISchemaElement;
    @Input("data") private _data: any;
    @Input("dataSchema") private _dataSchema: any;
    private _differ: any;
    private _initialized=false;
    constructor(private _elementRef: ElementRef,private _rendererRegistry:RendererRegistry,private _loader: DynamicComponentLoader,differs: KeyValueDiffers,@Inject('FormServices') private _services: Array<FormsService> ) {
        this._differ = differs.find({}).create(null);
    }
    ngOnInit() {
        this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this._uiSchema,this._dataSchema,this._data), this._elementRef,
        Injector.resolve([provide('uiSchema', {useValue: this._uiSchema}),provide('data', {useValue: this._data}),provide('dataSchema', {useValue: this._dataSchema})]));
    }

    ngDoCheck() {
        if(!this._initialized)
            return;
        var changes = this._differ.diff(this._data);
        if (changes) {
            changes.forEachAddedItem(r => {
                this._services.forEach(service =>service.onAdd(new ChangeNotification( r.key, r.previousValue, r.currentValue)));
            });
            changes.forEachRemovedItem(r => {
                this._services.forEach(service =>service.onRemove(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
            });
            changes.forEachChangedItem(r => {
                this._services.forEach(service =>service.onChange(new ChangeNotification(r.key, r.previousValue, r.currentValue)));
            });
        }
    }
    ngAfterContentInit(): any {
        this._initialized=true;
        this._services.forEach(service =>service.init(this._dataSchema, this._uiSchema, this._data));
    }
}
