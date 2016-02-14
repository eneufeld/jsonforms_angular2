/// <reference path="../typings/uischema.d.ts"/>

import { Directive,ElementRef,DynamicComponentLoader,Input,OnInit,provide,Injector} from 'angular2/core';
import {RendererRegistry,ValidationService} from './forms';

@Directive({selector: 'form-outlet'})
export class FormOutlet implements OnInit{
  @Input() uiSchema: IUISchemaElement;
  @Input() data: any;
  constructor(private _elementRef: ElementRef,private _rendererRegistry:RendererRegistry,private _loader: DynamicComponentLoader, private _validationService:ValidationService ) {

  }
  ngOnInit() {
    this._validationService.init(this.uiSchema,this.data);
    //this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this.uiSchema,this.dataSchema), this._elementRef,
    //Injector.resolve([provide('uiSchema', {useValue: this.uiSchema}),provide('dataSchema', {useValue: this.dataSchema})]));

    this._loader.loadNextToLocation(this._rendererRegistry.getBestComponent(this.uiSchema,this.data), this._elementRef,
    Injector.resolve([provide('uiSchema', {useValue: this.uiSchema}),provide('data', {useValue: this.data})]));
  }
}
