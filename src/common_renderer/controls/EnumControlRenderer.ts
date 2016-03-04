import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester,NOT_FITTING} from './../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import {PathUtil} from '../PathUtil';

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
        if(this._subSchema.hasOwnProperty('enum'))
            return this._subSchema.enum;
        if(this._subSchema.allOf!=undefined){
            return this._subSchema.allOf.reduce((prev,element)=>{return prev.concat(element.enum)},[]);
        }
        if(this._subSchema.anyOf!=undefined){
            return this._subSchema.anyOf.reduce(
                (prev,element)=>{
                if(element.hasOwnProperty('enum'))
                    return prev.concat(element.enum);
                return prev;
            },[]);
        }
        return [];
    }
}
export var EnumControlRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){

    if(element.type!='Control')
        return NOT_FITTING;
    let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
    if(
        (!currentDataSchema.hasOwnProperty('enum')) &&
        (currentDataSchema.allOf==undefined || currentDataSchema.allOf.every(element=>{return !element.hasOwnProperty('enum')})) &&
        (currentDataSchema.anyOf==undefined || !currentDataSchema.anyOf.some(element=>{return element.hasOwnProperty('enum')}))
    )
        return NOT_FITTING;
    return 2;
}
