import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormInner} from './../../forms/forms';
import {AbstractLayoutRenderer} from './AbstractLayoutRenderer';
@Component({
    selector: 'HorizontalLayoutRenderer',
    template: `<div class="forms_horizontalLayout"><form-inner *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema" [data]="_data" [dataSchema]="_dataSchema"></form-inner></div>`,
    styles: [`.forms_horizontalLayout {display: flex;justify-content: flex-start;}`],
    directives:[FormInner]
})
export class HorizontalLayoutRenderer  implements OnInit{
    constructor(@Inject('uiSchema') private _uiSchema:ILayout, @Inject('dataSchema') private _dataSchema:any, @Inject('data') private _data:any) {
    }

    ngOnInit() {
    }
}
export var HorizontalLayoutRendererTester: FormsTester;
HorizontalLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
  if('HorizontalLayout'==element.type){
    return 2;
  }
  return NOT_FITTING;
}