import {Component, Inject, OnInit,Optional} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet,UISchemaParameter} from '../../forms/forms';
import {AbstractArrayControlRenderer,ArrayControlRendererTester} from './AbstractArrayControlRenderer';
import {PathUtil} from '../PathUtil';
import {RefUriHelper} from './RefUriHelper';

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
                    <form-outlet [data]="item" [dataSchema]="_subSchema" [uiSchemaParameter]="_uiSchemaParameter" [root]="true"></form-outlet>
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
    private _uiSchemaParameter:UISchemaParameter;
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any,@Inject('uiSchemaRefs') private uiSchemaRefs:any,@Optional() @Inject('uiSchemaParameter') private _parentUISchemaParameter:UISchemaParameter) {
        super(_uiSchema,_data);
        if(this._parentUISchemaParameter==undefined)
            this._parentUISchemaParameter={refUri:"",property:""};
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']).items;
        if(this.uiSchemaRefs!=null){
            this._uiSchemaParameter={refUri:RefUriHelper.getRefUri(this._parentUISchemaParameter,this._uiSchema['scope']['$ref'],this.uiSchemaRefs),property:this.fragment};
        }
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
