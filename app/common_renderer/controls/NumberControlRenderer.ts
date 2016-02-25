/// <reference path="../../typings/uischema.d.ts"/>

import {Component, Inject} from 'angular2/core';
import {FormsTester} from '../../forms/forms';
import {ServicesDirective} from '../services.directive';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';

@Component({
    selector: 'NumberControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_numberControlLabel forms_controlLabel">{{label}}</label>
            <input type="number" [(ngModel)]="_modelValue[fragment]" class="forms_numberControl"/>
            <div *ngFor="#error of getValues(_uiSchema.validation)" style="color:red">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[ServicesDirective]
})
export class NumberControlRenderer extends AbstractControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
    }
}
export var NumberControlRendererTester: FormsTester = ControlRendererTester('number',1);
