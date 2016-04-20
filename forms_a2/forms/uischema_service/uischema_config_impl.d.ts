/**
 * The `RouteConfig` decorator defines routes for a given component.
 *
 * It takes an array of {@link RouteDefinition}s.
 */
export declare class UISchemaProviderConfig {
    configs: UISchemaProvider[];
    constructor(configs: UISchemaProvider[]);
}
export interface UISchemaProvider {
    uischemaElement?: IUISchemaElement;
    tester?: UISchemaProviderTester;
}
export interface UISchemaProviderTester {
    (dataSchema: any, uiSchemaParameter: UISchemaParameter): number;
}
export interface UISchemaParameter {
    refUri: string;
    property: string;
}
