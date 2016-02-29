/// <reference path="../../typings/uischema.d.ts"/>

export * from './renderer_config_decorator';
export * from './service_config_impl';
export {FormsTester} from './renderer_config_impl';
export {RendererRegistry, FORM_PRIMARY_COMPONENT} from './renderer_registry';
export {FormOutlet} from './form_outlet';
export {FormInner} from './form_inner';

import {ApplicationRef, provide, OpaqueToken,Inject} from 'angular2/core';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {BaseException} from 'angular2/src/facade/exceptions';
import {RendererRegistry,FORM_PRIMARY_COMPONENT,FORM_DEFAULT_RENDERER} from './renderer_registry';
import {RendererDefinition} from './renderer_config_impl';
import {FormOutlet} from './form_outlet';
import {formCommonRendererFactory} from '../common_renderer/common_renderer';
import {formCommonServicesFactory} from '../common_services/common_services';

export const NOT_FITTING:number=-1;
export const FORM_DIRECTIVES: any[] = CONST_EXPR([FormOutlet]);


export const FORM_PROVIDERS: any[] = CONST_EXPR([
    RendererRegistry,
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
