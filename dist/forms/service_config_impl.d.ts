export interface FormServiceFactory {
    createFormService(dataSchema: any, uiSchema: IUISchemaElement, data: any): FormsService;
}
export declare abstract class FormsService {
    protected _dataSchema: any;
    protected _uiSchema: IUISchemaElement;
    protected _data: any;
    constructor(_dataSchema: any, _uiSchema: IUISchemaElement, _data: any);
    abstract onChange(changeNotification: ChangeNotification): void;
    abstract onAdd(changeNotification: ChangeNotification): void;
    abstract onRemove(changeNotification: ChangeNotification): void;
}
export declare class ChangeNotification {
    private _key;
    private _previousValue;
    private _currentValue;
    constructor(_key: string, _previousValue: any, _currentValue: any);
    schemaPath: string;
    newData(oldData: any): any;
    previousValue: any;
    currentValue: any;
}
