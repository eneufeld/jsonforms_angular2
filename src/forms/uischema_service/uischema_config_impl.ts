import {CONST, Type} from 'angular2/src/facade/lang';

/**
 * The `RouteConfig` decorator defines routes for a given component.
 *
 * It takes an array of {@link RouteDefinition}s.
 */
@CONST()
export class UISchemaProviderConfig {
  constructor(public configs: UISchemaProvider[]) {}
}

export interface UISchemaProvider {
  uischemaElement?:IUISchemaElement;
  tester?:UISchemaProviderTester;
}
export interface UISchemaProviderTester {
    (dataSchema:any, uiSchemaParameter:UISchemaParameter):number;
}

export interface UISchemaParameter{
    refUri:string;
    property:string;
    //parentData?:any;
}
