import { OnInit } from 'angular2/core';
import { FormsTester, UISchemaParameter } from '../../forms/forms';
import { AbstractArrayControlRenderer } from './AbstractArrayControlRenderer';
export declare class ObjectArrayControlRenderer extends AbstractArrayControlRenderer implements OnInit {
    private _dataSchema;
    private uiSchemaRefs;
    private _parentUISchemaParameter;
    private _subSchema;
    private _uiSchemaParameter;
    constructor(_uiSchema: IControlObject, _data: any, _dataSchema: any, uiSchemaRefs: any, _parentUISchemaParameter: UISchemaParameter);
    ngOnInit(): void;
    getDefaultValue(): any;
    private itemLabel;
}
export declare var ObjectArrayControlRendererTester: FormsTester;
