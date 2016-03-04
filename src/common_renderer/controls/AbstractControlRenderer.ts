import {PathUtil} from '../PathUtil';
import {FormsTester,NOT_FITTING} from './../../forms/forms';
import {isJsObject} from 'angular2/src/facade/lang';

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

    protected get label(){return PathUtil.beautify(this.fragment);}

    protected getErrors(error:Object,index:number):any[]{
        if(error==undefined || error==null)
          return [];
        var result:any[]=[];
        Object.keys(error).forEach(currentKey=> {
            let value=error[currentKey];
            if(Array.isArray(value) && index==undefined){
                result=this.addFlattenedErrors(value,result);
            }
            else if(isJsObject(value)&&index!=undefined&&value.index==index)
                result=this.addFlattenedErrors(value.error,result);
        },[]);
        return result;
    }

    private addFlattenedErrors(errorValues:any,result:any[]):any[]{
        if(Array.isArray(errorValues))
            return errorValues.reduce((a, b) =>{return a.concat(b)}, result);
        return result.concat(errorValues);
    }
}
export var ControlRendererTester=function(type:string,specificity:number):FormsTester{
    return function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
        if(element.type!='Control')
            return NOT_FITTING;
        let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
        if((currentDataSchema.type==undefined || currentDataSchema.type!=type) &&
          (currentDataSchema.allOf==undefined || currentDataSchema.allOf.every(element=>{return element.type!=type})))
            return NOT_FITTING;
        return specificity;
    }
}
