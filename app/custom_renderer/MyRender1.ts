/// <reference path="../typings/uischema.d.ts"/>

import {Component, OnInit,Inject,HostBinding} from 'angular2/core';
import {FormsTester,NOT_FITTING} from '../forms/forms';
@Component({
    selector: 'myrend',
    template: `<label><input type="text" [(ngModel)]="_data[fragment]"/></label><br/>`,
    styles: [``],
    directives:[]
})
export class MyRenderer1 {
  private input_model:any;
  private fragment:any;
  constructor( @Inject('uiSchema') private _uiSchema:IControlObject, @Inject('data') private _data:any) {
    //hack for correct resolvement
    var fragments = _uiSchema.scope.$ref.split('/');
    this.fragment=fragments[fragments.length-1];
    //this.input_model=this._data[fragment];
  }
  @HostBinding('class.control') true;
}
export var MyRenderer1Tester: FormsTester;
MyRenderer1Tester =function (element:IUISchemaElement, dataObject:any ){
  if(element.type=='Control')
    return 0;
  return NOT_FITTING;
}
