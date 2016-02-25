/// <reference path="../../typings/uischema.d.ts"/>

import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry} from '../../forms/forms';
import {AbstractLayoutRenderer} from './AbstractLayoutRenderer';

@Component({
    selector: 'GroupLayoutRenderer',
    template: `<fieldset class="forms_groupLayout"><legend class="forms_groupLabel">{{_uiSchema.label}}</legend><span #children></span></fieldset>`,
    styles: [`.forms_groupLabel {padding-left:1em;padding-right:1em;}`],
    directives:[]
})
export class GroupLayoutRenderer extends AbstractLayoutRenderer implements OnInit{
    constructor(_elementRef:ElementRef, _rendererRegistry:RendererRegistry, _loader:DynamicComponentLoader, @Inject('uiSchema') _uiSchema:ILayout, @Inject('dataSchema') _dataSchema:any, @Inject('data') _data:any) {
        super(_elementRef,_rendererRegistry,_loader,_uiSchema,_dataSchema,_data);
    }

    ngOnInit() {
      this.renderChildren('children');
    }
}
export var GroupLayoutRendererTester: FormsTester;
GroupLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if('GroupLayout'==element.type){
        return 2;
    }
    return NOT_FITTING;
}
