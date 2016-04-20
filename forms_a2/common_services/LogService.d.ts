import { FormServiceFactory, FormsService } from './../forms/forms';
export declare class MyLogServiceFactory implements FormServiceFactory {
    createFormService(dataSchema: any, uiSchema: IUISchemaElement, data: any): FormsService;
}
