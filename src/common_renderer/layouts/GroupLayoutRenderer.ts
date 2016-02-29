import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormInner} from './../../forms/forms';
import {AbstractLayoutRenderer} from './AbstractLayoutRenderer';

@Component({
    selector: 'GroupLayoutRenderer',
    template: `<fieldset class="forms_groupLayout"><legend class="forms_groupLabel">{{_uiSchema.label}}</legend><form-inner *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema" [data]="_data" [dataSchema]="_dataSchema"></form-inner></fieldset>`,
    styles: [`.forms_groupLabel {padding-left:1em;padding-right:1em;}`],
    directives:[FormInner]
})
export class GroupLayoutRenderer implements OnInit{
    constructor( @Inject('uiSchema') private _uiSchema:ILayout, @Inject('dataSchema') private _dataSchema:any, @Inject('data') private _data:any) {
    }

    ngOnInit() {
    }
}
export var GroupLayoutRendererTester: FormsTester;
GroupLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if('GroupLayout'==element.type){
        return 2;
    }
    return NOT_FITTING;
}
