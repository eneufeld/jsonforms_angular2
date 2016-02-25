/// <reference path="../typings/uischema.d.ts"/>

export * from './renderer_config_decorator';
export {FormsTester} from './renderer_config_impl';
export {RendererRegistry, FORM_PRIMARY_COMPONENT} from './renderer_registry';
export {FormOutlet} from './form_outlet';

import {ApplicationRef, provide, OpaqueToken,Inject} from 'angular2/core';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {BaseException} from 'angular2/src/facade/exceptions';
import {RendererRegistry,FORM_PRIMARY_COMPONENT,FORM_DEFAULT_RENDERER} from './renderer_registry';
import {RendererDefinition} from './renderer_config_impl';
import {FormOutlet} from './form_outlet';
import {formCommonRendererFactory} from '../common_renderer/common_renderer';
import {ServicesDirective} from '../common_renderer/services.directive';

import PathUtil = require('../common_renderer/PathUtil');

declare var tv4;
export const NOT_FITTING:number=-1;
export const FORM_DIRECTIVES: any[] = CONST_EXPR([FormOutlet]);


export const FORM_PROVIDERS: any[] = CONST_EXPR([
    RendererRegistry,
    CONST_EXPR(provide('tv4',{useValue:tv4})),
    CONST_EXPR(provide(FORM_PRIMARY_COMPONENT, {useFactory: formPrimaryComponentFactory,    deps:CONST_EXPR([ApplicationRef])})),
    CONST_EXPR(provide(FORM_DEFAULT_RENDERER, {useFactory: formCommonRendererFactory})),
    CONST_EXPR(provide('FormServices', {useFactory: formCommonServicesFactory}))
]);

function formPrimaryComponentFactory(app:ApplicationRef) {
    if (app.componentTypes.length == 0) {
        throw new BaseException("Bootstrap at least one component before injecting Router.");
    }
    return app.componentTypes[0];
}
function formCommonServicesFactory() {
  var services : Array<FormsService>=new Array<FormsService>();
  services.push(new MyLogService());
  services.push(new ValidationService());
  return services;
}

class MyLogService implements FormsService {
    onChange(changeNotification:ChangeNotification):void{
        console.log("changed called: "+JSON.stringify(changeNotification));
    }
    onAdd(changeNotification:ChangeNotification):void{
        console.log("add called: "+JSON.stringify(changeNotification));
    }
    onRemove(changeNotification:ChangeNotification):void{
        console.log("remove called: "+JSON.stringify(changeNotification));
    }
}

class ValidationService implements FormsService {
    onChange(changeNotification:ChangeNotification):void{
        this.validate(changeNotification);
    }
    onAdd(changeNotification:ChangeNotification):void{
        this.validate(changeNotification);
    }
    onRemove(changeNotification:ChangeNotification):void{
        this.validate(changeNotification);
    }

    private validate(changeNotification:ChangeNotification):void{
        var results = tv4.validateMultiple(changeNotification.newData, changeNotification.dataSchema);
        var result: {[key: string]: any}={};
        var foundErrors:boolean=false;
        var path=changeNotification.schemaPath;
        results['errors'].forEach((error) => {
            if(path.indexOf(error['dataPath'])==-1){
                return;
            }
            if (error['schemaPath'].indexOf("required") != -1) {
                var propName = error['dataPath'] + "/" + error['params']['key'];
                result[propName]="Missing property";
            } else {
                result[error['dataPath']]=error['message'];
            }
            foundErrors=true;
        });
        if(!foundErrors){
            changeNotification.controlSchema['validation']=null;
        }
        changeNotification.controlSchema['validation']= result;
    }
}

export interface FormsService {
  onChange(changeNotification:ChangeNotification):void;
  onAdd(changeNotification:ChangeNotification):void;
  onRemove(changeNotification:ChangeNotification):void;
}
export class ChangeNotification{
    constructor(private _dataSchema:any,private _currentControlSchema:IControlObject, private _data:any, private _previousValue:any, private _currentValue:any){}
    get dataSchema():any{return this._dataSchema}
    get controlSchema():IControlObject{return this._currentControlSchema}
    get schemaPath():string{return this._currentControlSchema.scope.$ref}
    get oldData():any {return this._data}
    get newData():any {
        let clone=JSON.parse(JSON.stringify(this._data));
        var fragments:Array<string> = PathUtil.filterNonKeywords(PathUtil.toPropertyFragments(this._currentControlSchema.scope.$ref));
        var fragment=fragments[fragments.length-1];
        var fragmentsToObject:Array<string> =fragments.slice(0,fragments.length-1);
        var modelValue=PathUtil.resolveInstanceFromFragments(this._data,fragmentsToObject);
        clone[fragment]=this._currentValue;
        return clone;
    }
    get previousValue():any {return this._previousValue}
    get currentValue():any {return this._currentValue}
}
