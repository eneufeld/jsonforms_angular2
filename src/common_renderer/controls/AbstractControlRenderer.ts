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
        if(!TypeCheckerHelper(currentDataSchema,type))
            return NOT_FITTING;
        return specificity;
    }
}

export var TypeCheckerHelper=function(dataSchema:any,type:string):boolean{
    if(dataSchema.type!=undefined && dataSchema.type==type)
        return true;
    //all of means, that we merge the two together, we have to check that all the defined types equal the needed type
    if(dataSchema.allOf!=undefined && dataSchema.allOf.every(element=>{return HasType(element)?TypeCheckerHelper(element,type):true}))
        return true;
    //any of means, that at least one of the elements must be valid, so we are happy if any of the element equal the needed type
    if(dataSchema.anyOf!=undefined && dataSchema.anyOf.some(element=>{return HasType(element)?TypeCheckerHelper(element,type):true}))
        return true;
    //one of means, that exactly one of the elements must be valid, so we behave as if this is a anyOf
    if(dataSchema.oneOf!=undefined && dataSchema.oneOf.some(element=>{return HasType(element)?TypeCheckerHelper(element,type):true}))
        return true;
    return false;
}
var HasType=function(dataSchema:any){
    if(dataSchema.type!=undefined)
        return true;
    if(dataSchema.allOf!=undefined)
        return dataSchema.allOf.some(element=>{return HasType(element)});
    if(dataSchema.anyOf!=undefined)
        return dataSchema.anyOf.some(element=>{return HasType(element)});
    if(dataSchema.oneOf!=undefined)
        return dataSchema.oneOf.some(element=>{return HasType(element)});
    return false;
}
