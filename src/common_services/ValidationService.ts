import {FormsService,ChangeNotification} from './../forms/forms';
import PathUtil = require('../common_renderer/PathUtil');

declare var tv4;

export class ValidationService implements FormsService {
    private _data:any;
    private _dataSchema:any;
    private _uiSchema:IUISchemaElement;
    onChange(changeNotification:ChangeNotification):void{
        this.validate(changeNotification);
    }
    onAdd(changeNotification:ChangeNotification):void{
        this.validate(changeNotification);
    }
    onRemove(changeNotification:ChangeNotification):void{
        this.validate(changeNotification);
    }
    init(dataSchema:any,uiSchema:IUISchemaElement, data:any):void{
        this._dataSchema=dataSchema;
        this._uiSchema=uiSchema;
        this._data=data;
        this.validate(null);
    }
    private validate(changeNotification:ChangeNotification):void{
        let results = tv4.validateMultiple(
            changeNotification==null?this._data:changeNotification.newData(this._data), this._dataSchema);
        let result: {[key: string]: any}={};
        let foundErrors:boolean=false;
        results['errors'].forEach((error) => {
            let propName:string;
            if (error['schemaPath'].indexOf("required") != -1) {
                propName = error['dataPath'] + "/" + error['params']['key'];
            } else {
                propName=error['dataPath'];
            }
            propName=propName.substr(1);
            if(!result.hasOwnProperty(propName)){
                result[propName]=[];
            }
            result[propName].push(error['message']);

            foundErrors=true;
        });
        this.cleanControlObjects(this._uiSchema);
        this.mapErrorOnControlObject(this._uiSchema,result);
    }
    private cleanControlObjects(uiSchema:IUISchemaElement):void{
        if(uiSchema.hasOwnProperty('elements')){
            //search all children of Layout
            let children=uiSchema['elements'];
            for(let i=0;i<children.length;i++){
                this.cleanControlObjects(children[i]);
            }
        }
        else if(uiSchema.hasOwnProperty('scope')){
            uiSchema['validation']= null;
        }
    }

    private mapErrorOnControlObject(fullSchema:IUISchemaElement, errors:{[key: string]: any}):void{
        if(fullSchema.hasOwnProperty('elements')){
            //search all children of Layout
            let children=fullSchema['elements'];
            for(let i=0;i<children.length;i++){
                this.mapErrorOnControlObject(children[i],errors);
            }
        }
        else if(fullSchema.hasOwnProperty('scope')){
            let path=PathUtil.normalize(fullSchema['scope']['$ref']);
            if(errors.hasOwnProperty(path)){
                fullSchema['validation']= errors[path];
            }
        }
    }
}
