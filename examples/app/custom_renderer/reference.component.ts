import {Component, Inject, ChangeDetectionStrategy,Injector,OnInit,ChangeDetectorRef} from 'angular2/core';
import {Router} from 'angular2/router';
import {FormsTester,NOT_FITTING} from '../../../src/forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from '../../../src/common_renderer/controls/AbstractControlRenderer';
import {PathUtil} from '../../../src/common_renderer/PathUtil';

@Component({
    selector: 'ReferenceControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_referenceLabel forms_controlLabel">{{label}}</label>
            <span class="forms_controlInput">{{getLinkName(_value)}}</span>
            <button class="forms_controlReferenceNavigate" (click)="navigateTo()" [disabled]="_modelValue[fragment]==undefined">Open</button>
            <button class="forms_controlReferenceSelect" (click)="select()">Select</button>
            <button class="forms_controlReferenceCreate" (click)="create()">Create</button>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
        <!-- must be an overlay. Check old app for this-->
        <div class="overlay" *ngIf="_showSelect">
            <div class="selectDialog">
                <ul class="data">
                    <li *ngFor="#entry of _selectList" (click)="_selectedEntry=entry" [ngClass]="{selected:_selectedEntry==entry }">{{getLinkName(entry)}}</li>
                </ul>
                <div class="buttons">
                    <button (click)="selectEntry(_selectedEntry)">OK</button>
                    <button (click)="_showSelect=false">Cancel</button>
                </div>
            </div>
        </div>
    `
    ,
    styles: [`
        .overlay{ position:fixed; top:0; left:0; background:rgba(0,0,0,0.6); z-index:5; width:100%; height:100%; }
        .selectDialog { position:relative; z-index:10; background:#eee;height:75%;width:75%;margin:6.25% }
        .data {height:100%; list-style-type: none;margin: 0;}
        .data li {cursor: pointer;border-radius: 5px;}
        .data li:hover {font-weight:bold}
        .data li.selected {font-weight:bold}
        .buttons{z-index:10; background:#eee}
            `],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReferenceControlRenderer extends AbstractControlRenderer implements OnInit{

    private _dataService:any;
    private _showSelect:boolean=false;
    private _selectList:any;
    private _value:any;

    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any, @Inject('dataSchema') _dataSchema:any,private _router: Router, private injector:Injector, private _changeDetectorRef: ChangeDetectorRef) {
        super(_uiSchema,_data);
        this._dataService=injector.getOptional(_uiSchema['dataService']);
    }
    ngOnInit(){
        let value=this._modelValue[this.fragment];
        if(value!=undefined && this._uiSchema['get']!=undefined){
            let id:string=value.substr(1);
            this._dataService[this._uiSchema['get']].call(this._dataService,id).then(a=>{this._value=a;this._changeDetectorRef.markForCheck()});
        }
    }
    private getLinkName(object:any){
        if(object==undefined)
            return "";
        if(this._uiSchema['linkName']==undefined)
            return object.id;
        let result=PathUtil.resolveInstanceFromFragments(object,PathUtil.toPropertyFragments(this._uiSchema['linkName'].$ref),false);
        if(result==undefined)
            return object.id;
        return result;
    }
    private navigateTo(){
      let id:string=this._modelValue[this.fragment];
      this._router.navigate([this._uiSchema['navigateTo'], { id: id.substr(1) }]);
    }
    private select(){
        if(this._dataService==null)
            return;
        this._dataService[this._uiSchema['select']].call(this._dataService).then(list => {this._selectList = list;this._showSelect=true;});
    }
    private selectEntry(entry){
        this._modelValue[this.fragment]="#"+entry.id;
        this._value=entry;
        this._showSelect=false;
    }
    private create(){
        if(this._dataService==null)
            return;
        let newEntryId=this._dataService[this._uiSchema['create']].call(this._dataService);
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
