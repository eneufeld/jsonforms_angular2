/// <reference path="../../typings/uischema.d.ts"/>

import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry} from '../../forms/forms';
import {AbstractLayoutRenderer} from './AbstractLayoutRenderer';
@Component({
    selector: 'HorizontalLayoutRenderer',
    template: `<div class="forms_horizontalLayout"><span #children></span></div>`,
    styles: [`.forms_horizontalLayout {display: flex;justify-content: flex-start;}`],
    directives:[]
})
export class HorizontalLayoutRenderer extends AbstractLayoutRenderer implements OnInit{
    constructor(_elementRef:ElementRef, _rendererRegistry:RendererRegistry, _loader:DynamicComponentLoader, @Inject('uiSchema') _uiSchema:ILayout, @Inject('dataSchema') _dataSchema:any, @Inject('data') _data:any) {
        super(_elementRef,_rendererRegistry,_loader,_uiSchema,_dataSchema,_data);
    }

    ngOnInit() {
        this.renderChildren('children');
    }
}
export var HorizontalLayoutRendererTester: FormsTester;
HorizontalLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
  if('HorizontalLayout'==element.type){
    return 2;
  }
  return NOT_FITTING;
}
