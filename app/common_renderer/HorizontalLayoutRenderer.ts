/// <reference path="../typings/uischema.d.ts"/>

import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry} from '../forms/forms';
@Component({
    selector: 'HorizontalLayoutRenderer',
    template: `<div class="forms_horizontalLayout"><span #children></span></div>`,
    styles: [`.forms_horizontalLayout {display: flex;justify-content: flex-start;}`],
    directives:[]
})
export class HorizontalLayoutRenderer implements OnInit{
    constructor(private _elementRef: ElementRef,private _rendererRegistry:RendererRegistry,private _loader: DynamicComponentLoader,@Inject('uiSchema') private _uiSchema:ILayout,@Inject('data') private _data:any) {}
    ngOnInit() {
      for (var schemaElement of this._uiSchema.elements) {
        this._loader.loadIntoLocation(this._rendererRegistry.getBestComponent(schemaElement,this._data), this._elementRef,'children',
        Injector.resolve([provide('uiSchema', {useValue: schemaElement}),provide('dataSchema', {useValue: this._data})]));
      }
    }
}
export var HorizontalLayoutRendererTester: FormsTester;
HorizontalLayoutRendererTester =function (element:IUISchemaElement, dataObject:any ){
  if('HorizontalLayout'==element.type){
    return 2;
  }
  return NOT_FITTING;
}
