import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry} from './../../forms/forms';
import {AbstractLayoutRenderer} from './AbstractLayoutRenderer';

@Component({
    selector: 'VerticalLayoutRenderer',
    template: `<div class="forms_verticalLayout"><span #children></span></div>`,
    styles: [``],
    directives:[]
})
export class VerticalLayoutRenderer extends AbstractLayoutRenderer implements OnInit{
    constructor(_elementRef:ElementRef, _rendererRegistry:RendererRegistry, _loader:DynamicComponentLoader, @Inject('uiSchema') _uiSchema:ILayout, @Inject('dataSchema') _dataSchema:any, @Inject('data') _data:any) {
        super(_elementRef,_rendererRegistry,_loader,_uiSchema,_dataSchema,_data);
    }

    ngOnInit() {
      this.renderChildren('children');
    }
}
export var VerticalLayoutRendererTester: FormsTester;
VerticalLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if('VerticalLayout'==element.type){
        return 2;
    }
    return NOT_FITTING;
}
