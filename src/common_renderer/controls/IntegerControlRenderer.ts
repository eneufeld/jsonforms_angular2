import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester} from './../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';

@Component({
    selector: 'IntegerControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_integerControlLabel forms_controlLabel">{{label}}</label>
            <input type="number" step="1" [(ngModel)]="_modelValue[fragment]" class="forms_integerControl forms_controlInput"/>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class IntegerControlRenderer extends AbstractControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
    }
}
export var IntegerControlRendererTester: FormsTester = ControlRendererTester('integer',1);
