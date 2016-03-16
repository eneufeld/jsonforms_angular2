import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester,NOT_FITTING} from '../../../src/forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from '../../../src/common_renderer/controls/AbstractControlRenderer';
import {PathUtil} from '../../../src/common_renderer/PathUtil';
import {DatalistIdProvider} from './DatalistIdProvider';

@Component({
    selector: 'TextDatalistControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_enumControlLabel forms_controlLabel">{{label}}</label>
            <input type="text" [(ngModel)]="_modelValue[fragment]" class="forms_textDatalistControl forms_controlInput" [attr.list]="_datalistId"/>
                <datalist [attr.id]="_datalistId">
                    <option *ngFor="#option of options" [value]="option"></option>
                </datalist>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TextDatalistControlRenderer extends AbstractControlRenderer{
    private _subSchema:any;
    private _datalistId:string;
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any, @Inject('dataSchema') _dataSchema:any,datalistIdProvider:DatalistIdProvider) {
        super(_uiSchema,_data);
        this._subSchema=PathUtil.resolveSchema(_dataSchema,_uiSchema['scope']['$ref']);
        this._datalistId=datalistIdProvider.provideDatalistId;
    }

    private get options(){
        return this._subSchema.anyOf.reduce((prev,element)=>{return prev.concat(this.getOptions(element));},[]);
    }
    
    private getOptions(schema:any):any[]{
        if(schema.hasOwnProperty('enum'))
            return schema.enum;
        if(schema.hasOwnProperty('oneOf'))
            return schema.oneOf.reduce((prev,element)=>{return prev.concat(this.getOptions(element))},[]);
        if(schema.hasOwnProperty('allOf'))
            return schema.allOf.reduce((prev,element)=>{return prev.concat(this.getOptions(element))},[]);
        return [];
    }
}
export var TextDatalistControlRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){

    if(element.type!='Control')
        return NOT_FITTING;
    let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
    if(
        currentDataSchema.anyOf!=undefined &&
        currentDataSchema.anyOf.reduce((prev,element)=>{return prev&&IsEnumOrString(element)},true)
    )
        return 10;
    return NOT_FITTING;
}
var IsEnumOrString=function(element:any):boolean{
    if(element.hasOwnProperty('enum') || element.type=='string')
        return true;
    if(element.hasOwnProperty('oneOf'))
        return element.oneOf.reduce((prev,element)=>{return prev&&IsEnumOrString(element)},true);
    if(element.hasOwnProperty('allOf'))
        return element.allOf.reduce((prev,element)=>{return prev&&IsEnumOrString(element)},true)
    return false;
}
