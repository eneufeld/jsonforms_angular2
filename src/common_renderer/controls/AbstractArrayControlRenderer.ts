import {PathUtil} from '../PathUtil';
import {FormsTester,NOT_FITTING} from './../../forms/forms';
import {AbstractControlRenderer} from './AbstractControlRenderer';

export abstract class AbstractArrayControlRenderer extends AbstractControlRenderer {

    constructor(_uiSchema:IControlObject,  _data:any){
        super(_uiSchema,_data);
    }
    protected removeItem(item:any):void{
        let index=this._modelValue[this.fragment].indexOf(item);
        this._modelValue[this.fragment].splice(index, 1);
    }
    protected addItem():void{
        if(this._modelValue[this.fragment]==undefined)
            this._modelValue[this.fragment]=[];
        this._modelValue[this.fragment].push(this.getDefaultValue());
    }
    protected abstract getDefaultValue():any;

    protected trackByIndex(index,item){
        return index;
    }
}

export var ArrayControlRendererTester=function(type:string,specificity:number):FormsTester{
    return function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
        if(element.type!='Control')
            return NOT_FITTING;
        let currentDataSchema=PathUtil.resolveSchema(dataSchema,element['scope']['$ref']);
        if(currentDataSchema.type!='array')
            return NOT_FITTING;
        if(Array.isArray(currentDataSchema.items))
            return NOT_FITTING;
        if((currentDataSchema.items.type==undefined || currentDataSchema.items.type!=type) &&
          (currentDataSchema.items.allOf==undefined || currentDataSchema.items.allOf.every(element=>{return element.type!=type})))
            return NOT_FITTING;
        return specificity;
    }
}
