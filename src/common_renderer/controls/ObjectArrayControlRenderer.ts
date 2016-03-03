import {Component, Inject, OnInit} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../forms/forms';
import {AbstractArrayControlRenderer,ArrayControlRendererTester} from './AbstractArrayControlRenderer';
import PathUtil = require('../PathUtil');

@Component({
    selector: 'ObjectArrayControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_objectArrayControlLabel forms_controlLabel">{{label}}</label>
            <div>
                <button (click)="addItem()">Add</button>
                <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation" style="display:inline-block;">{{error|json}}</div>
                <fieldset *ngFor="#item of _modelValue[fragment]; #i = index" class="forms_objectArrayControls forms_ArrayControls">
                    <legend>{{label}}_{{i}} <button (click)="removeItem(item)">Remove</button></legend>
                    <form-outlet [data]="item" [dataSchema]="_subSchema"></form-outlet>
                </fieldset>
            </div>
        </div>
    `
    ,
    styles: [``],
    directives:[FormOutlet]
})
export class ObjectArrayControlRenderer extends AbstractArrayControlRenderer implements OnInit{
    private _subSchema:any;
    private _itemSchemaMap:{[key:number]:any}={};
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any) {
        super(_uiSchema,_data);
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']).items;
    }
    getDefaultValue():any{
        return {};
    }
}
export var ObjectArrayControlRendererTester: FormsTester = ArrayControlRendererTester('object',1);
