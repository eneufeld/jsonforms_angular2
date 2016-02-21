/// <reference path="../typings/uischema.d.ts"/>

import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry} from '../forms/forms';
@Component({
    selector: 'GroupLayoutRenderer',
    template: `<fieldset class="forms_groupLayout"><legend class="forms_groupLabel">{{_uiSchema.label}}</legend><span #children></span></fieldset>`,
    styles: [`.forms_groupLabel {padding-left:1em;padding-right:1em;}`],
    directives:[]
})
export class GroupLayoutRenderer implements OnInit{
    constructor(private _elementRef: ElementRef,private _rendererRegistry:RendererRegistry,private _loader: DynamicComponentLoader,@Inject('uiSchema') private _uiSchema:ILayout,@Inject('data') private _data:any) {}
    ngOnInit() {
      for (var schemaElement of this._uiSchema.elements) {
        this._loader.loadIntoLocation(this._rendererRegistry.getBestComponent(schemaElement,this._data), this._elementRef,'children',
        Injector.resolve([provide('uiSchema', {useValue: schemaElement}),provide('dataSchema', {useValue: this._data})]));
      }
    }
}
export var GroupLayoutRendererTester: FormsTester;
GroupLayoutRendererTester =function (element:IUISchemaElement, dataObject:any ){
  if('GroupLayout'==element.type){
    return 2;
  }
  return NOT_FITTING;
}
