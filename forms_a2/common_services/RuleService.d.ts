import { FormServiceFactory, FormsService } from './../forms/forms';
export declare class RuleServiceFactory implements FormServiceFactory {
    createFormService(dataSchema: any, uiSchema: IUISchemaElement, data: any): FormsService;
}
