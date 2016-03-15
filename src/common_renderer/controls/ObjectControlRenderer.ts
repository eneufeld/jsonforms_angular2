import {Component, Inject,OnInit,Optional} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormOutlet} from '../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import {PathUtil} from '../PathUtil';
import {RefUriHelper} from './RefUriHelper';

@Component({
    selector: 'ObjectControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_objectControlLabel forms_controlLabel">{{label}}</label>
            <button (click)="createInstance()" *ngIf="!_modelValue[fragment]">Create {{label}}</button>
            <fieldset *ngIf="_modelValue[fragment]">
                <form-outlet [data]="_modelValue[fragment]" [dataSchema]="_subSchema" [refUri]="_refUri" [root]="true"></form-outlet>
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
    private _refUri:any;
    constructor(@Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any,@Inject('uiSchemaRefs') private _uiSchemaRefs:any,@Optional() @Inject('refUri') private _parentRefUri:any) {
        super(_uiSchema,_data);
        if(this._parentRefUri==undefined)
            this._parentRefUri="";
    }
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']);
        if(this._uiSchemaRefs!=null){
            this._refUri=RefUriHelper.getRefUri(this._parentRefUri,this._uiSchema['scope']['$ref'],this._uiSchemaRefs);
        }
    }
    createInstance():void {
        this._modelValue[this.fragment]={};
    }

}
export var ObjectControlRendererTester: FormsTester = ControlRendererTester('object',1);
