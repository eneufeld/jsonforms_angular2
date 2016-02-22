import {Directive, Inject,provide} from 'angular2/core';
import {NgModel,Validator,NG_VALIDATORS,Control} from 'angular2/common'

@Directive({
   selector: '[ngModel]',
   providers: [provide(NG_VALIDATORS, {useExisting: CustomValidatorDirective, multi: true})]
 })
 export class CustomValidatorDirective implements Validator {

   jsonPath:any;
   constructor(@Inject('uiSchema') private _uiSchema:IControlObject, @Inject('data') private _data:any,@Inject('dataSchema') private _dataSchema:any,@Inject('tv4') private _tv4:any) {}
   validate(c: Control): {[key: string]: any} {
     if(this._tv4==null) {
       return null;
     }

     var results = this._tv4.validateMultiple(this._data, this._dataSchema);
     var result: {[key: string]: any}={};
     var foundErrors:boolean=false;
     var path=this._uiSchema.scope.$ref;
     results['errors'].forEach((error) => {
        if(path.indexOf(error['dataPath'])==-1){
         return;
        }
        if (error['schemaPath'].indexOf("required") != -1) {
            var propName = error['dataPath'] + "/" + error['params']['key'];
            result[propName]="Missing property";
        } else {
            result[error['dataPath']]=error['message'];
        }
        foundErrors=true;
    });
    if(!foundErrors){
      return null;
    }
    return result;
  }
}
