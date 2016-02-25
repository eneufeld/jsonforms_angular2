/// <reference path="../typings/uischema.d.ts"/>
import {Injectable, Inject, OpaqueToken} from 'angular2/core';
import {
  isPresent,
  isType,
  Type,
  CONST_EXPR
} from 'angular2/src/facade/lang';
import {reflector} from 'angular2/src/core/reflection/reflection';
import {RendererConfig,RendererDefinition,FormsTester} from './renderer_config_impl';

export const FORM_PRIMARY_COMPONENT: OpaqueToken =
    CONST_EXPR(new OpaqueToken('FormPrimaryComponent'));
export const FORM_DEFAULT_RENDERER: OpaqueToken =
        CONST_EXPR(new OpaqueToken('FormDefaultRenderer'));

@Injectable()
export class RendererRegistry {
  private renderer : Array<RendererDefinition>;
  constructor(@Inject(FORM_PRIMARY_COMPONENT) private _rootComponent: Type, @Inject(FORM_DEFAULT_RENDERER) _defaultRenderer: Array<RendererDefinition>) {
    this.renderer=_defaultRenderer;
    this.configFromComponent();
  }
  /**
   * Reads the annotations of a component and configures the registry based on them
   */
  configFromComponent(): void {
    if (!isType(this._rootComponent)) {
      return;
    }
    var annotations = reflector.annotations(this._rootComponent);
    if (isPresent(annotations)) {
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];

        if (annotation instanceof RendererConfig) {
          let rendererCfgs: RendererDefinition[] = annotation.configs;

          rendererCfgs.forEach(config => this.renderer.push(config));
        }
      }
    }
  }

  register(rendererType:Type,tester:FormsTester):void {
    this.renderer.push({renderer:rendererType,tester:tester});
  }
  getBestComponent(element:IUISchemaElement,dataSchema:any,dataObject:any):Type {
    var bestRenderer:Type;
    var highestSpecificity:number=-1;
    for (var rendererDef of this.renderer) {
      var currentSpecificity:number=rendererDef.tester(element,dataSchema,dataObject);
      if (currentSpecificity>highestSpecificity){
        highestSpecificity=currentSpecificity;
        bestRenderer=rendererDef.renderer;
      }
    }
    return bestRenderer;
  }
}
