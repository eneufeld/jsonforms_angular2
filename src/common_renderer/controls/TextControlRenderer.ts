import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester} from './../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';

@Component({
    selector: 'TextControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_textControlLabel forms_controlLabel">{{label}}</label>
            <input type="text" [(ngModel)]="_modelValue[fragment]" class="forms_textControl forms_controlInput"/>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TextControlRenderer extends AbstractControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
    }
}
export var TextControlRendererTester: FormsTester = ControlRendererTester('string',1);
