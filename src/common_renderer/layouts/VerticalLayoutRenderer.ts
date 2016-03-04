import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormInner} from './../../forms/forms';

@Component({
    selector: 'VerticalLayoutRenderer',
    template: `<div class="forms_verticalLayout forms_layout"><form-inner *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema" [data]="_data" [dataSchema]="_dataSchema"></form-inner></div>`,
    styles: [``],
    directives:[FormInner]
})
export class VerticalLayoutRenderer implements OnInit{
    constructor( @Inject('uiSchema') private _uiSchema:ILayout, @Inject('dataSchema') private _dataSchema:any, @Inject('data') private _data:any) {
    }

    ngOnInit() {
    }
}
export var VerticalLayoutRendererTester: FormsTester;
VerticalLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if('VerticalLayout'==element.type){
        return 2;
    }
    return NOT_FITTING;
}
