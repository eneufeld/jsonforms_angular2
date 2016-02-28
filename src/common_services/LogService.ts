import {FormsService,ChangeNotification} from './../forms/forms';
export class MyLogService implements FormsService {
    onChange(changeNotification:ChangeNotification):void{
        console.log("changed called: "+JSON.stringify(changeNotification));
    }
    onAdd(changeNotification:ChangeNotification):void{
        console.log("add called: "+JSON.stringify(changeNotification));
    }
    onRemove(changeNotification:ChangeNotification):void{
        console.log("remove called: "+JSON.stringify(changeNotification));
    }
    init(dataSchema:any,uiSchema:IUISchemaElement, data:any):void{
        console.log("init called: ");
    }
}
