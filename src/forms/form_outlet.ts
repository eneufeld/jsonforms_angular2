/// <reference path="../../typings/uischema.d.ts"/>

import { Component, ElementRef, DynamicComponentLoader, Input, OnInit, DoCheck, provide, Injector, KeyValueDiffers, Inject, AfterContentInit} from 'angular2/core';
import {RendererRegistry,ChangeNotification,FormsService,FormServiceFactory} from './forms';
import {FormInner} from './form_inner';

@Component({
    selector: 'form-outlet',
    template:'<div><form-inner [uiSchema]="_uiSchema" [data]="_data" [dataSchema]="_dataSchema"></form-inner></div>',
    directives:[FormInner]
})
export class FormOutlet implements OnInit, DoCheck,AfterContentInit{
    @Input("uiSchema") private _uiSchema: IUISchemaElement;
    @Input("data") private _data: any;
    @Input("dataSchema") private _dataSchema: any;
    private _differ: any;
    private _initialized=false;
    private _services:Array<FormsService>=[];
    constructor(differs: KeyValueDiffers,@Inject('FormServiceFactories') private _serviceFactories: Array<FormServiceFactory> ) {
        this._differ = differs.find({}).create(null);
    }
    ngOnInit() {
        let that=this;
        this._serviceFactories.forEach(serviceFactory=>{
            that._services.push(serviceFactory.createFormService(that._dataSchema,that._uiSchema,that._data));
        });
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
    }
}
