import {Component, Inject,OnInit} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import {PathUtil} from '../PathUtil';

@Component({
    selector: 'ObjectControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_objectControlLabel forms_controlLabel">{{label}}</label>
            <button (click)="createInstance()" *ngIf="!_modelValue[fragment]">Create {{label}}</button>
            <fieldset *ngIf="_modelValue[fragment]">
                <form-outlet [data]="_modelValue[fragment]" [dataSchema]="_subSchema"></form-outlet>
            </fieldset>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[FormOutlet]
})
export class ObjectControlRenderer extends AbstractControlRenderer implements OnInit{
    private _subSchema:any;
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any) {
        super(_uiSchema,_data);
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']);
    }
    createInstance():void {
        this._modelValue[this.fragment]={};
    }

}
export var ObjectControlRendererTester: FormsTester = ControlRendererTester('object',1);
