import {Component, OnInit,Inject} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../../src/forms/forms';

@Component({
    selector: 'CollapsibleGroupLayoutRenderer',
    template: `
    <fieldset class="forms_groupLayout forms_layout">
        <legend (click)="hidden=!hidden" [ngClass]="{hidden: hidden}" class="forms_groupLabel">{{_uiSchema.label}}</legend>
        <div [ngClass]="{hidden: hidden}">
        <form-outlet *ngFor="#subUiSchema of _uiSchema.elements" [uiSchema]="subUiSchema" [data]="_data" [dataSchema]="_dataSchema"></form-outlet>
        </div>
    </fieldset>
    `,
    styles: [`
        .forms_groupLabel {padding-left:1em;padding-right:1em;}
        div.hidden {
          display:none;
        }
        legend:after{
          content:"\\2003 \\25BC"
        }
        legend.hidden:after{
          content:"\\2003 \\25B6"
        }
    `],
    directives:[FormOutlet]
})
export class CollapsibleGroupLayoutRenderer implements OnInit{
    hidden:boolean=false;
    constructor( @Inject('uiSchema') private _uiSchema:ILayout, @Inject('dataSchema') private _dataSchema:any, @Inject('data') private _data:any) {
    }

    ngOnInit() {
    }
}
export var CollapsibleGroupLayoutRendererTester: FormsTester;
CollapsibleGroupLayoutRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if('GroupLayout'==element.type){
        return 3;
    }
    return NOT_FITTING;
}
