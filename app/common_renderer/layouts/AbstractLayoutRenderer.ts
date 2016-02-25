import {ElementRef,DynamicComponentLoader,Injector,Inject,provide} from 'angular2/core';
import {RendererRegistry} from '../../forms/forms';

export abstract class AbstractLayoutRenderer {
    constructor(protected _elementRef: ElementRef, protected _rendererRegistry:RendererRegistry, protected _loader: DynamicComponentLoader, protected _uiSchema:ILayout, protected _dataSchema:any, protected _data:any) {}

    protected renderChildren(anchor:string):void{
        for (var schemaElement of this._uiSchema.elements) {
            this._loader.loadIntoLocation(this._rendererRegistry.getBestComponent(schemaElement, this._dataSchema, this._data), this._elementRef, anchor, Injector.resolve([provide('uiSchema', {useValue: schemaElement})]));
        }
    }
}
