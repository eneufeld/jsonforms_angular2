import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester} from './../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';

@Component({
    selector: 'NumberControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_numberControlLabel forms_controlLabel">{{label}}</label>
            <input type="number" step="0.01" [(ngModel)]="_modelValue[fragment]" class="forms_numberControl forms_controlInput"/>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class NumberControlRenderer extends AbstractControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
    }
}
export var NumberControlRendererTester: FormsTester = ControlRendererTester('number',1);
