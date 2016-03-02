import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester} from './../../forms/forms';
import {AbstractArrayControlRenderer,ArrayControlRendererTester} from './AbstractArrayControlRenderer';

@Component({
    selector: 'NumberArrayControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_numberArrayControlLabel forms_controlLabel">{{label}}</label>
            <div>
                <button (click)="addItem()">Add</button>
                <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation" style="display:inline-block;">{{error|json}}</div>
                <div *ngFor="#item of _modelValue[fragment];#i = index;trackBy trackByIndex" class="forms_numberArrayControls forms_ArrayControls">
                    <input type="number" step="0.01"  [(ngModel)]="_modelValue[fragment][i]" class="forms_controlInput"/>
                    <button (click)="removeItem(item)">Remove</button>
                    <div *ngFor="#error of getErrors(_uiSchema.validation,i)" class="forms_controlValidation" style="display:inline-block;">{{error|json}}</div>
                </div>
            </div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class NumberArrayControlRenderer extends AbstractArrayControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
    }
    getDefaultValue():any{
        return 0.0;
    }
}
export var NumberArrayControlRendererTester: FormsTester = ArrayControlRendererTester('number',1);
