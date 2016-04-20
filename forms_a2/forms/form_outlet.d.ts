/// <reference path="../../typings/uischema.d.ts" />
import { ElementRef, DynamicComponentLoader, OnInit, KeyValueDiffers, IterableDiffers, AfterContentInit, DoCheck, OnChanges } from 'angular2/core';
import { RendererRegistry, FormServiceFactory, UISchemaProviderService } from './forms';
export declare class FormOutlet implements OnInit, DoCheck, AfterContentInit, OnChanges {
    private _elementRef;
    private _rendererRegistry;
    private _loader;
    private _keyValueDifferFactory;
    private _iterableDifferFactory;
    private _uiSchemaProvider;
    private _serviceFactories;
    private _oldUiSchema;
    private _oldDataSchema;
    private _oldData;
    private _oldUiSchemaRefs;
    private _uiSchema;
    private _data;
    private _dataSchema;
    private _uiSchemaParameter;
    private _root;
    private _refs;
    private _keyValueDiffer;
    private _iterableDiffer;
    private _initialized;
    private _services;
    private _renderedChild;
    constructor(_elementRef: ElementRef, _rendererRegistry: RendererRegistry, _loader: DynamicComponentLoader, _keyValueDifferFactory: KeyValueDiffers, _iterableDifferFactory: IterableDiffers, _uiSchemaProvider: UISchemaProviderService, _serviceFactories: Array<FormServiceFactory>, _oldUiSchema: ILayout, _oldDataSchema: any, _oldData: any, _oldUiSchemaRefs: any);
    ngOnInit(): void;
    private initRoot();
    private render();
    ngDoCheck(): void;
    ngAfterContentInit(): any;
    ngOnChanges(): void;
}
