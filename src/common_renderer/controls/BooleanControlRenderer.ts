import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester} from './../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';

@Component({
    selector: 'BooleanControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_booleanControlLabel forms_controlLabel">{{label}}</label>
            <input type="checkbox" [(ngModel)]="_modelValue[fragment]" class="forms_booleanControl"/>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" style="color:red">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class BooleanControlRenderer extends AbstractControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
    }
}
export var BooleanControlRendererTester: FormsTester = ControlRendererTester('boolean',1);
