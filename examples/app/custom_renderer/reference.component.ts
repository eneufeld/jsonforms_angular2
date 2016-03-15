import {Component, Inject, ChangeDetectionStrategy,Injector} from 'angular2/core';
import {Router} from 'angular2/router';
import {FormsTester,NOT_FITTING} from '../../../src/forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from '../../../src/common_renderer/controls/AbstractControlRenderer';
import {PathUtil} from '../../../src/common_renderer/PathUtil';

@Component({
    selector: 'ReferenceControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_referenceLabel forms_controlLabel">{{label}}</label>
            <span class="forms_controlInput">{{_modelValue[fragment]}}</span>
            <button class="forms_controlReferenceNavigate" (click)="navigateTo()">Open</button>
            <button class="forms_controlReferenceSelect" (click)="select()">Select</button>
            <button class="forms_controlReferenceCreate" (click)="create()">Create</button>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
        <!-- must be an overlay. Check old app for this-->
        <div *ngIf="_showSelect">
            <div *ngFor="#entry of _selectList" (click)="_selectedEntry=entry">{{entry.id}}</div>
            <button (click)="selectEntry(_selectedEntry)">OK</button>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReferenceControlRenderer extends AbstractControlRenderer{

    private _dataService:any;
    private _showSelect:boolean=false;
    private _selectList:any;

    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any, @Inject('dataSchema') _dataSchema:any,private _router: Router, private injector:Injector) {
        super(_uiSchema,_data);
        this._dataService=injector.getOptional(_uiSchema['dataService']);
    }
    private navigateTo(){
      let id:string=this._modelValue[this.fragment];
      this._router.navigate([this._uiSchema['navigateTo'], { id: id.substr(1) }]);
    }
    private select(){
        if(this._dataService==null)
            return;
        this._dataService[this._uiSchema['select']].call().then(list => {this._selectList = list;this._showSelect=true;});
    }
    private selectEntry(entry){
        this._modelValue[this.fragment]="#"+entry.id;
        this._showSelect=false;
    }
    private create(){
        if(this._dataService==null)
            return;
        let newEntryId=this._dataService[this._uiSchema['create']].call();
        console.log(newEntryId);
        this._modelValue[this.fragment]="#"+newEntryId;
    }

}
export var ReferenceControlRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if(element.type!='Control')
        return NOT_FITTING;
    if(!element.hasOwnProperty('navigateTo'))
      return NOT_FITTING;
    return 10;
}
