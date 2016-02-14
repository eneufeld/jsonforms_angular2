/// <reference path="../typings/uischema.d.ts"/>

export * from './renderer_config_decorator';
export {RendererRegistry, FORM_PRIMARY_COMPONENT,ValidationService} from './renderer_registry';
export {FormOutlet} from './form_outlet';

import {ApplicationRef, provide, OpaqueToken, Provider} from 'angular2/core';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {BaseException} from 'angular2/src/facade/exceptions';
import {RendererRegistry,FORM_PRIMARY_COMPONENT,FORM_DEFAULT_RENDERER,ValidationService} from './renderer_registry';
import {RendererDefinition} from './renderer_config_impl';
import {FormOutlet} from './form_outlet';
import {formCommonRendererFactory} from '../common_renderer/common_renderer';


export const NOT_FITTING:number=-1;
export const FORM_DIRECTIVES: any[] = CONST_EXPR([FormOutlet]);
export const FORM_PROVIDERS: any[] = CONST_EXPR([
  RendererRegistry,
   ValidationService,
  CONST_EXPR(new Provider(
      FORM_PRIMARY_COMPONENT,
      {useFactory: formPrimaryComponentFactory, deps: CONST_EXPR([ApplicationRef])})),
  CONST_EXPR(new Provider(FORM_DEFAULT_RENDERER,{useFactory: formCommonRendererFactory}))

]);


function formPrimaryComponentFactory(app:ApplicationRef) {
  if (app.componentTypes.length == 0) {
    throw new BaseException("Bootstrap at least one component before injecting Router.");
  }
  return app.componentTypes[0];
}



export interface FormsTester {
  (element:IUISchemaElement, dataObject:any ):number;
}
