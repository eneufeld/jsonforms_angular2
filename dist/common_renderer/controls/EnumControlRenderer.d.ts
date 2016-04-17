import { FormsTester } from './../../forms/forms';
import { AbstractControlRenderer } from './AbstractControlRenderer';
export declare class EnumControlRenderer extends AbstractControlRenderer {
    private _subSchema;
    constructor(_uiSchema: IControlObject, _data: any, _dataSchema: any);
    private options;
}
export declare var EnumControlRendererTester: FormsTester;
