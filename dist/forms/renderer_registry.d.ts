import { OpaqueToken } from 'angular2/core';
import { Type } from 'angular2/src/facade/lang';
import { RendererDefinition, FormsTester } from './renderer_config_impl';
export declare const FORM_DEFAULT_RENDERER: OpaqueToken;
export declare class RendererRegistry {
    private _rootComponent;
    private renderer;
    constructor(_rootComponent: Type, _defaultRenderer: Array<RendererDefinition>);
    /**
     * Reads the annotations of a component and configures the registry based on them
     */
    configFromComponent(): void;
    register(rendererType: Type, tester: FormsTester): void;
    getBestComponent(element: IUISchemaElement, dataSchema: any, dataObject: any): Type;
}
