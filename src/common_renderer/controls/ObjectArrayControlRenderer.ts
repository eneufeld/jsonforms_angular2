import {Component, Inject, OnInit} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../forms/forms';
import {AbstractArrayControlRenderer,ArrayControlRendererTester} from './AbstractArrayControlRenderer';
import {PathUtil} from '../PathUtil';

@Component({
    selector: 'ObjectArrayControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_objectArrayControlLabel forms_controlLabel">{{label}}</label>
            <fieldset>
                <legend><button (click)="addItem()">Add</button></legend>
                <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation" style="display:inline-block;">{{error|json}}</div>
                <fieldset *ngFor="#item of _modelValue[fragment]; #i = index" class="forms_objectArrayControls forms_ArrayControls">
                    <legend>{{itemLabel}}_{{i}} <button (click)="removeItem(item)">Remove</button></legend>
                    <form-outlet [data]="item" [dataSchema]="_subSchema" [root]="true"></form-outlet>
                </fieldset>
            </fieldset>
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
    private get itemLabel(){
        let itemLabel=PathUtil.beautify(this.fragment);
        if(itemLabel.charAt(itemLabel.length-1)=='s')
            return itemLabel.substring(0,itemLabel.length-1);
        return itemLabel;
    }
}
export var ObjectArrayControlRendererTester: FormsTester = ArrayControlRendererTester('object',1);
