import {FormServiceFactory,FormsService,ChangeNotification} from './../forms/forms';
import {PathUtil} from '../common_renderer/PathUtil';


export class RuleServiceFactory implements FormServiceFactory{
    createFormService(dataSchema:any,uiSchema:IUISchemaElement, data:any):FormsService{
        return new RuleService(dataSchema, uiSchema, data);
    }
}
interface RuleUISchemaMapEntry {
    rule:any;
    uiSchema:IUISchemaElement;
}
class RuleService extends FormsService {
    private ruleUISchemaMap:Array<RuleUISchemaMapEntry>=[];
    constructor(dataSchema:any,uiSchema:IUISchemaElement, data:any){
        super(dataSchema, uiSchema, data);
        //find all rules
        this.findRules(uiSchema);
        this.checkRules(null);
    }
    onChange(changeNotification:ChangeNotification):void{
        this.checkRules(changeNotification);
    }
    onAdd(changeNotification:ChangeNotification):void{
        this.checkRules(changeNotification);
    }
    onRemove(changeNotification:ChangeNotification):void{
        this.checkRules(changeNotification);
    }
    private checkRules(changeNotification:ChangeNotification):void{
        changeNotification==null?this._data:changeNotification.newData(this._data), this._dataSchema;
        this.ruleUISchemaMap.forEach(entry => {
            let conditionPath=entry.rule.scope.$ref;
            let value=PathUtil.resolveInstanceFromPath(changeNotification,conditionPath);
            entry.uiSchema['visible']=true;
            entry.uiSchema['enabled']=true;
            if(entry.rule.type=='show'){
                entry.uiSchema['visible']=entry.rule.value==value;
            }
            else if(entry.rule.type=='hide'){
                entry.uiSchema['visible']=entry.rule.value!=value;
            }

            if(entry.rule.type=='enable'){
                entry.uiSchema['enabled']=entry.rule.value==value;
            }
            else if(entry.rule.type=='disable'){
                entry.uiSchema['enabled']=entry.rule.value!=value;
            }
        });
    }

    private findRules(fullSchema:IUISchemaElement){
        if(fullSchema.hasOwnProperty('elements')){
            if(fullSchema.hasOwnProperty('rule')){
                this.ruleUISchemaMap.push({rule:fullSchema['rule'],uiSchema:fullSchema});
            }
            //search all children of Layout
            let children=fullSchema['elements'];
            for(let i=0;i<children.length;i++){
                this.findRules(children[i]);
            }
        }
        else if(fullSchema.hasOwnProperty('scope')){
            if(fullSchema.hasOwnProperty('rule')){
                this.ruleUISchemaMap.push({rule:fullSchema['rule'],uiSchema:fullSchema});
            }
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
            let keys=Object.keys(errors);
            let relevantKeys=keys.filter(value=>{
                return value.indexOf(path)!=-1 &&
                value.substr(path.length+1).indexOf("/")==-1
            });
            if(relevantKeys.length==0){
                return;
            }
            let allErrors:Array<any>=[];
            relevantKeys.forEach(key =>{
                let indexOfSlash=key.indexOf("/");
                if(indexOfSlash==-1)
                    allErrors.push(errors[key]);
                else{
                    let position=key.substr(indexOfSlash+1);
                    allErrors.push({"index":position,"error":errors[key]});
                }
            });
            fullSchema['validation']= allErrors;
        }
    }
}
