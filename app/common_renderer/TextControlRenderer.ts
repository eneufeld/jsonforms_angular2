/// <reference path="../typings/uischema.d.ts"/>

import {Component, OnInit,Inject,HostBinding} from 'angular2/core';
import {FormsTester,NOT_FITTING} from '../forms/forms';
import PathUtil = require('./PathUtil');
import {CustomValidatorDirective} from './validate.directive';

@Component({
    selector: 'TextControlRenderer',
    template: `
    <label class="forms_textControlLabel forms_controlLabel">{{fragment}}</label>
    <input type="text" [(ngModel)]="_modelValue[fragment]" class="forms_textControl" #control="ngForm"/>
    <div *ngFor="#error of getValues(control.errors)">{{error}}</div>`,
    styles: [``],
    directives:[CustomValidatorDirective]
})
export class TextControlRenderer {
  private _modelValue:any;
  private fragment:any;
  constructor( @Inject('uiSchema') private _uiSchema:IControlObject, @Inject('data') private _data:any) {
    //hack for correct resolvement
    var fragments:Array<string> = _uiSchema.scope.$ref.split('/');
    fragments=fragments.filter(toCheck => {return "#"!=toCheck && "properties"!==toCheck});
    this.fragment=fragments[fragments.length-1];
    var fragmentsToObject:Array<string> =fragments.slice(0,fragments.length-1);
    this._modelValue=fragmentsToObject.reduce((curValue, fragment)=>{return curValue[fragment];},_data);
  }
  getValues(error:Object){
    if(error==undefined || error==null)
      return [];
    var result:any[]=[];
    Object.keys(error).forEach((currentKey)=> {
      return result.push(error[currentKey]);
    },[]);
    return result;
  }
}
export var TextControlRendererTester: FormsTester;
TextControlRendererTester =function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
  if(element.type=='Control' && PathUtil.resolveSchema(dataSchema,element['scope']['$ref'])['type']=='string')
    return 1;
  return NOT_FITTING;
}
