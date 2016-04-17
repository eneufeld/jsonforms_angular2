import { OnInit } from 'angular2/core';
import { FormsTester, UISchemaParameter } from '../../forms/forms';
import { AbstractControlRenderer } from './AbstractControlRenderer';
export declare class ObjectControlRenderer extends AbstractControlRenderer implements OnInit {
    private _dataSchema;
    private _uiSchemaRefs;
    private _parentUISchemaParameter;
    private _subSchema;
    private _uiSchemaParameter;
    constructor(_uiSchema: IControlObject, _data: any, _dataSchema: any, _uiSchemaRefs: any, _parentUISchemaParameter: UISchemaParameter);
    ngOnInit(): void;
    createInstance(): void;
}
export declare var ObjectControlRendererTester: FormsTester;
