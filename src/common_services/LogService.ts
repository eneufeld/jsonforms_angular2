import {FormServiceFactory,FormsService,ChangeNotification} from './../forms/forms';
class MyLogService extends FormsService {
    onChange(changeNotification:ChangeNotification):void{
        console.log("changed called: "+JSON.stringify(changeNotification));
    }
    onAdd(changeNotification:ChangeNotification):void{
        console.log("add called: "+JSON.stringify(changeNotification));
    }
    onRemove(changeNotification:ChangeNotification):void{
        console.log("remove called: "+JSON.stringify(changeNotification));
    }
    constructor(dataSchema:any,uiSchema:IUISchemaElement, data:any){
        super(dataSchema, uiSchema, data);
        console.log("init called: ");
    }
}
export class MyLogServiceFactory implements FormServiceFactory{
    createFormService(dataSchema:any,uiSchema:IUISchemaElement, data:any):FormsService{
        return new MyLogService(dataSchema, uiSchema, data);
    }
}
