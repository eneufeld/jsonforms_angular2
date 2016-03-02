/// <reference path="../../typings/uischema.d.ts"/>

import { Component, Input, OnInit, DoCheck, KeyValueDiffers,IterableDiffers, Inject, AfterContentInit} from 'angular2/core';
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
    private _keyValueDiffer: any;
    private _iterableDiffer: {[key:string]:any}={};
    private _initialized=false;
    private _services:Array<FormsService>=[];
    constructor(private _keyValueDifferFactory: KeyValueDiffers, private _iterableDifferFactory: IterableDiffers,@Inject('FormServiceFactories') private _serviceFactories: Array<FormServiceFactory> ) {
    }
    ngOnInit() {
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

    ngDoCheck() {
        if(!this._initialized)
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
}
