import {Component, Inject,OnInit} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import {ViewGenerator} from '../../common_services/ViewGenerator';
import PathUtil = require('../PathUtil');

@Component({
    selector: 'ObjectRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_objectControlLabel forms_controlLabel">{{label}}</label>
            <button (click)="createInstance()" *ngIf="!_modelValue[fragment]">Create {{label}}</button>
            <fieldset style="width:100%;" *ngIf="_modelValue[fragment]">
                <form-outlet [uiSchema]="_subUiSchema" [data]="_modelValue[fragment]" [dataSchema]="_subSchema"></form-outlet>
            </fieldset>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[FormOutlet]
})
export class ObjectRenderer extends AbstractControlRenderer implements OnInit{
    private _subSchema:any;
    private _subUiSchema:ILayout;
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any) {
        super(_uiSchema,_data);
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']);
        this._subUiSchema=ViewGenerator.generate(this._subSchema);
    }
    createInstance():void {
        this._modelValue[this.fragment]={};
    }

}
export var ObjectRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if(element.type!='Control')
        return NOT_FITTING;
    let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
    if(currentDataSchema.type!='object')
        return NOT_FITTING;
    return 2;
}
