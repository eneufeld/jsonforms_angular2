import { FormsTester } from './../../forms/forms';
import { AbstractControlRenderer } from './AbstractControlRenderer';
export declare abstract class AbstractArrayControlRenderer extends AbstractControlRenderer {
    constructor(_uiSchema: IControlObject, _data: any);
    protected removeItem(item: any): void;
    protected addItem(): void;
    protected abstract getDefaultValue(): any;
    protected trackByIndex(index: any, item: any): any;
}
export declare var ArrayControlRendererTester: (type: string, specificity: number) => FormsTester;
