import PathUtil = require('../common_renderer/PathUtil');

export interface FormServiceFactory{
    createFormService(dataSchema:any,uiSchema:IUISchemaElement, data:any):FormsService;
}
export abstract class FormsService {
    constructor(protected _dataSchema:any,protected _uiSchema:IUISchemaElement, protected _data:any){};
    abstract onChange(changeNotification:ChangeNotification):void;
    abstract onAdd(changeNotification:ChangeNotification):void;
    abstract onRemove(changeNotification:ChangeNotification):void;

}
export class ChangeNotification{
    constructor(private _key:string, private _previousValue:any, private _currentValue:any){}
    get schemaPath():string{return this._key}
    newData(oldData:any):any {
        let clone=JSON.parse(JSON.stringify(oldData));
        var fragments:Array<string> = PathUtil.filterNonKeywords(PathUtil.toPropertyFragments(this._key));
        var fragment=fragments[fragments.length-1];
        var fragmentsToObject:Array<string> =fragments.slice(0,fragments.length-1);
        var modelValue=PathUtil.resolveInstanceFromFragments(oldData,fragmentsToObject);
        clone[fragment]=this._currentValue;
        return clone;
    }
    get previousValue():any {return this._previousValue}
    get currentValue():any {return this._currentValue}
}
