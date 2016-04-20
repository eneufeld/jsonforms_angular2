import { FormServiceFactory, FormsService } from './../forms/forms';
export declare class ValidationServiceFactory implements FormServiceFactory {
    createFormService(dataSchema: any, uiSchema: IUISchemaElement, data: any): FormsService;
}
