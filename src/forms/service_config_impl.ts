import PathUtil = require('../common_renderer/PathUtil');

export interface FormsService {
  onChange(changeNotification:ChangeNotification):void;
  onAdd(changeNotification:ChangeNotification):void;
  onRemove(changeNotification:ChangeNotification):void;
  init(_dataSchema:any,_uiSchema:IUISchemaElement, _data:any):void;
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
