import {Component, OnInit,ElementRef,DynamicComponentLoader,Inject,Injector,provide} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from './../../forms/forms';

@Component({
    selector: 'VerticalLayoutRenderer',
    template: `<div class="forms_verticalLayout forms_layout"><form-outlet *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema"></form-outlet></div>`,
    styles: [``],
    directives:[FormOutlet]
})
export class VerticalLayoutRenderer implements OnInit{
    constructor( @Inject('uiSchema') private _uiSchema:ILayout) {
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
