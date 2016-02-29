import {Component, Inject, ChangeDetectionStrategy,ElementRef,DynamicComponentLoader,Injector,provide,OnInit,ChangeDetectorRef,ApplicationRef} from 'angular2/core';
import {FormsTester,NOT_FITTING,RendererRegistry,FormInner} from '../../forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from './AbstractControlRenderer';
import PathUtil = require('../PathUtil');

@Component({
    selector: 'ArrayObjectControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_textControlLabel forms_controlLabel">{{label}}</label>
            <div style="display: inline-block;">
                <fieldset *ngFor="#item of _modelValue[fragment]; #i = index">
                    <legend #{{label}}_{{i}}>{{label}}_{{i}}</legend>
                    <form-inner [uiSchema]="subUiSchema" [data]="item" [dataSchema]="_subSchema"></form-inner>
                </fieldset>
            </div>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" style="color:red">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[FormInner]
})
export class ArrayObjectRenderer extends AbstractControlRenderer implements OnInit{
    private _subSchema:any;
    private _subUiSchema:ILayout;
    constructor(private _elementRef:ElementRef, private _rendererRegistry:RendererRegistry, private _loader:DynamicComponentLoader, @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any,@Inject('dataSchema') private _dataSchema:any) {
        super(_uiSchema,_data);

    }
    get subUiSchema(){return JSON.parse(JSON.stringify(this._subUiSchema))}
    ngOnInit() {
        this._subSchema=PathUtil.resolveSchema(this._dataSchema,this._uiSchema['scope']['$ref']).items;
        //get or create a sub schema -> ui schema providers
        let subUiSchema:ILayout={type:'VerticalLayout',elements:[]};
        Object.keys(this._subSchema.properties).forEach(key => {
            let control:IControlObject={type:"Control",label:key,scope:{$ref:"#/properties/"+key}};
            subUiSchema.elements.push(control);
        });
        this._subUiSchema=subUiSchema;
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
