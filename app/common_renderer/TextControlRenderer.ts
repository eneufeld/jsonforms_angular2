/// <reference path="../typings/uischema.d.ts"/>

import {Component, OnInit,Inject,HostBinding} from 'angular2/core';
import {FormsTester,NOT_FITTING} from '../forms/forms';
@Component({
    selector: 'TextControlRenderer',
    template: `<label class="forms_textControlLabel forms_controlLabel">{{fragment}}</label><input type="text" [(ngModel)]="_modelValue[fragment]" class="forms_textControl"/>`,
    styles: [``],
    directives:[]
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
}
export var TextControlRendererTester: FormsTester;
TextControlRendererTester =function (element:IUISchemaElement, dataObject:any ){
  if(element.type=='Control')
    return 1;
  return NOT_FITTING;
}
