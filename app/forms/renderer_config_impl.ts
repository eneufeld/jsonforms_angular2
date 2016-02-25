import {CONST, Type} from 'angular2/src/facade/lang';

/**
 * The `RouteConfig` decorator defines routes for a given component.
 *
 * It takes an array of {@link RouteDefinition}s.
 */
@CONST()
export class RendererConfig {
  constructor(public configs: RendererDefinition[]) {}
}

export interface RendererDefinition {
  renderer?:Type;
  tester?:FormsTester;
}
export interface FormsTester {
    (element:IUISchemaElement, dataSchema:any, dataObject:any ):number;
}
