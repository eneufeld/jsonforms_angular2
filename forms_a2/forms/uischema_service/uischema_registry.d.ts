import { Type } from 'angular2/src/facade/lang';
import { UISchemaProviderTester, UISchemaParameter } from './uischema_config_impl';
export declare class UISchemaProviderService {
    private _rootComponent;
    private uiSchemaProviders;
    constructor(_rootComponent: Type);
    /**
     * Reads the annotations of a component and configures the registry based on them
     */
    configFromComponent(): void;
    register(uischemaElement: IUISchemaElement, tester: UISchemaProviderTester): void;
    getBestComponent(dataSchema: any, uiSchemaParameter: UISchemaParameter): IUISchemaElement;
}
