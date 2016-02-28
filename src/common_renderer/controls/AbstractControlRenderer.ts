import PathUtil = require('../PathUtil');
import {FormsTester,NOT_FITTING} from './../../forms/forms';

export abstract class AbstractControlRenderer {

    protected _modelValue:any;
    protected fragment:any;

    constructor(protected _uiSchema:IControlObject,  protected _data:any){
        //hack for correct resolvement
        var fragments:Array<string> = PathUtil.filterNonKeywords(PathUtil.toPropertyFragments(_uiSchema.scope.$ref));
        this.fragment=fragments[fragments.length-1];
        var fragmentsToObject:Array<string> =fragments.slice(0,fragments.length-1);
        this._modelValue=PathUtil.resolveInstanceFromFragments(_data,fragmentsToObject);
    }

    protected get label(){return this.fragment;}

    protected getErrors(error:Object):any[]{
        if(error==undefined || error==null)
          return [];
        var result:any[]=[];
        Object.keys(error).forEach((currentKey)=> {
          return result.push(error[currentKey]);
        },[]);
        return result;
    }
}
export var ControlRendererTester=function(type:string,specificity:number):FormsTester{
    return function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
        if(element.type=='Control' && PathUtil.resolveSchema(dataSchema,element['scope']['$ref']).type==type)
            return specificity;
        return NOT_FITTING;
    }
}
