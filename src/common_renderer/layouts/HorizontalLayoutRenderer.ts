import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormInner} from './../../forms/forms';

@Component({
    selector: 'HorizontalLayoutRenderer',
    template: `<div class="forms_horizontalLayout forms_layout"><form-inner *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema"></form-inner></div>`,
    styles: [`.forms_horizontalLayout {display: flex;justify-content: flex-start;}`],
    directives:[FormInner]
})
export class HorizontalLayoutRenderer  implements OnInit{
    constructor(@Inject('uiSchema') private _uiSchema:ILayout) {
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
