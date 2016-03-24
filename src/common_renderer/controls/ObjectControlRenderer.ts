import {Component, Inject,OnInit,Optional} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet,UISchemaParameter} from '../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import {PathUtil} from '../PathUtil';
import {RefUriHelper} from './RefUriHelper';

@Component({
    selector: 'ObjectControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_objectControlLabel forms_controlLabel">{{label}}</label>
            <button (click)="createInstance()" *ngIf="!_modelValue[fragment]" class="forms_controlInput">Create {{label}}</button>
            <fieldset *ngIf="_modelValue[fragment]">
                <form-outlet [data]="_modelValue[fragment]" [dataSchema]="_subSchema" [uiSchemaParameter]="_uiSchemaParameter" [root]="true"></form-outlet>
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
    private _uiSchemaParameter:UISchemaParameter;
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any,@Inject('uiSchemaRefs') private _uiSchemaRefs:any,@Optional() @Inject('uiSchemaParameter') private _parentUISchemaParameter:UISchemaParameter) {
        super(_uiSchema,_data);
        if(this._parentUISchemaParameter==undefined)
            this._parentUISchemaParameter={refUri:"",property:""};
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']);
        if(this._uiSchemaRefs!=null){
            this._uiSchemaParameter={refUri:RefUriHelper.getRefUri(this._parentUISchemaParameter,this._uiSchema['scope']['$ref'],this._uiSchemaRefs),property:this.fragment};
        }
    }
    createInstance():void {
        this._modelValue[this.fragment]={};
    }

}
export var ObjectControlRendererTester: FormsTester = ControlRendererTester('object',1);
