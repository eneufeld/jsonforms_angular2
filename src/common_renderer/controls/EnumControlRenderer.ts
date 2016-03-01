import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester,NOT_FITTING} from './../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import PathUtil = require('../PathUtil');

@Component({
    selector: 'EnumControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_enumControlLabel forms_controlLabel">{{label}}</label>
            <select class="forms_enumControl forms_controlInput" [(ngModel)]="_modelValue[fragment]">
                <option *ngFor="#option of options" [value]="option">{{option}}</option>
            </select>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class EnumControlRenderer extends AbstractControlRenderer{
    private _subSchema:any;
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any, @Inject('dataSchema') _dataSchema:any) {
        super(_uiSchema,_data);
        this._subSchema=PathUtil.resolveSchema(_dataSchema,_uiSchema['scope']['$ref']);
    }

    private get options(){
        return this._subSchema.enum;
    }
}
export var EnumControlRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if(element.type=='Control' && PathUtil.resolveSchema(dataSchema,element['scope']['$ref']).hasOwnProperty('enum'))
        return 2;
    return NOT_FITTING;
}
