import { FormsTester } from './../../forms/forms';
export declare abstract class AbstractControlRenderer {
    protected _uiSchema: IControlObject;
    protected _data: any;
    protected _modelValue: any;
    protected fragment: any;
    constructor(_uiSchema: IControlObject, _data: any);
    protected label: string;
    protected getErrors(error: Object, index: number): any[];
    private addFlattenedErrors(errorValues, result);
}
export declare var ControlRendererTester: (type: string, specificity: number) => FormsTester;
export declare var TypeCheckerHelper: (dataSchema: any, type: string) => boolean;
