import {Component, Inject, OnInit} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import {ViewGenerator} from '../../common_services/ViewGenerator';
import PathUtil = require('../PathUtil');

@Component({
    selector: 'ArrayObjectControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_textControlLabel forms_controlLabel">{{label}}</label>
            <div style="width:100%;">
                <button (click)="addItem()">Add</button>
                <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation" style="display:inline-block;">{{error|json}}</div>
                <fieldset *ngFor="#item of _modelValue[fragment]; #i = index">
                    <legend>{{label}}_{{i}} <button (click)="removeItem(item)">Remove</button></legend>
                    <form-outlet [uiSchema]="getSubUiSchema(i)" [data]="item" [dataSchema]="_subSchema"></form-outlet>
                </fieldset>
            </div>
        </div>
    `
    ,
    styles: [``],
    directives:[FormOutlet]
})
export class ArrayObjectRenderer extends AbstractControlRenderer implements OnInit{
    private _subSchema:any;
    private _subUiSchema:ILayout;
    private _itemSchemaMap:{[key:number]:any}={};
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any) {
        super(_uiSchema,_data);
    }
    getSubUiSchema(index:number){
        if(this._itemSchemaMap[index]){
            return this._itemSchemaMap[index];
        }
        let clone= JSON.parse(JSON.stringify(this._subUiSchema));
        this._itemSchemaMap[index]=clone;
        return clone;
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']).items;
        this._subUiSchema=ViewGenerator.generate(this._subSchema);
    }
    addItem():void{
        this._modelValue[this.fragment].push({});
    }
    removeItem(item:any):void{
        let index=this._modelValue[this.fragment].indexOf(item);
        this._modelValue[this.fragment].splice(index, 1);
    }

}
export var ArrayObjectRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if(element.type!='Control')
        return NOT_FITTING;
    let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
    if(currentDataSchema.type!='array')
        return NOT_FITTING;
    if(Array.isArray(currentDataSchema.items))
        return NOT_FITTING;
    if(currentDataSchema.items.type!='object')
        return NOT_FITTING;
    return 2;
}
