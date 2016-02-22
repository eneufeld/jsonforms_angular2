/// <reference path="../typings/uischema.d.ts"/>

import { Directive,ElementRef,DynamicComponentLoader,Input,OnInit,provide,Injector} from 'angular2/core';
import {RendererRegistry} from './forms';

@Directive({selector: 'form-outlet'})
export class FormOutlet implements OnInit{
  @Input() uiSchema: IUISchemaElement;
  @Input() data: any;
  @Input() dataSchema: any;

  constructor(private _elementRef: ElementRef,private _rendererRegistry:RendererRegistry,private _loader: DynamicComponentLoader ) {

  }
  ngOnInit() {
    //this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this.uiSchema,this.dataSchema), this._elementRef,
    //Injector.resolve([provide('uiSchema', {useValue: this.uiSchema}),provide('dataSchema', {useValue: this.dataSchema})]));

    this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this.uiSchema,this.dataSchema,this.data), this._elementRef,
    Injector.resolve([provide('uiSchema', {useValue: this.uiSchema}),provide('data', {useValue: this.data}),provide('dataSchema', {useValue: this.dataSchema})]));
  }
}
