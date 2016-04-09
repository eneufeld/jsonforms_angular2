import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {FormsTester,NOT_FITTING} from '../../../src/forms/forms';
import {PathUtil} from '../../../src/common_renderer/PathUtil';
import {AbstractControlRenderer,ControlRendererTester,TypeCheckerHelper} from '../../../src/common_renderer/controls/AbstractControlRenderer';

@Component({
    selector: 'GedcomXDateControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_numberControlLabel forms_controlLabel">{{label}}</label>
            <span>{{_modelValue[fragment]}}</span>
            // control for aprox //
            //
            <input type="datetime-local" [(ngModel)]="_dateWrapper.date" class="forms_numberControl forms_controlInput"/>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class GedcomXDateControlRenderer extends AbstractControlRenderer{
    private _dateWrapper:MyCustomDate;
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any) {
        super(_uiSchema,_data);
        this._dateWrapper.date= new Date(this._modelValue[this.fragment]);
    }
}
export var GedcomXDateControlRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if(element.type!='Control')
        return NOT_FITTING;
    if(element['scope']['$ref'].indexOf('formal')==-1)
        return NOT_FITTING;
    let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
    if(!TypeCheckerHelper(currentDataSchema,"string"))
        return NOT_FITTING;
    return 5;
}
interface MyCustomDate{
    date:Date;
}
