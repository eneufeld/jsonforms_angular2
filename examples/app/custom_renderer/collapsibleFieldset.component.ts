import {Component, OnInit,Input,EventEmitter,TemplateRef,ViewContainerRef} from 'angular2/core';

@Component({
    selector: 'collapsibleFieldset',
    template: `
    <fieldset>
      <legend (click)="hidden=!hidden" [ngClass]="{hidden: hidden}">{{legendLabel}}</legend>
      <div  [ngClass]="{hidden: hidden}">
        <ng-content></ng-content>
      </div>
    </fieldset>
    `,
    styles:[`
      div.hidden{
        display:none;
      }
      legend:after{
        content:"\\2003 \\25BC"
      }
      legend.hidden:after{
        content:"\\2003 \\25B6"
      }
    `],
    inputs:['legendLabel','hidden']
})
export class CollapsibleFieldsetComponent implements OnInit {
    legendLabel:string;
    hidden:boolean=false;
    constructor() { }
    ngOnInit() {
    }
}
