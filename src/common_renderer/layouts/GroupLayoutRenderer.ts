import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from './../../forms/forms';

@Component({
    selector: 'GroupLayoutRenderer',
    template: `<fieldset class="forms_groupLayout forms_layout"><legend class="forms_groupLabel">{{_uiSchema.label}}</legend><form-outlet *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema"></form-outlet></fieldset>`,
    styles: [`.forms_groupLabel {padding-left:1em;padding-right:1em;}`],
    directives:[FormOutlet]
})
export class GroupLayoutRenderer implements OnInit{
    constructor( @Inject('uiSchema') private _uiSchema:ILayout) {
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
