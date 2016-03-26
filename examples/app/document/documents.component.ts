import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {ListComponent} from '../list/list-abstract.component';

@Component({
    selector: 'document-list',
    templateUrl:"app/list/list-template.html",
    styleUrls:["app/list/list.css"],
    pipes: []
})
export class DocumentsComponent extends ListComponent implements OnInit {

  constructor(@Inject('DataProviderService') _dataProviderService: DataProviderService,  _router: Router) {
      super(_dataProviderService,_router);
  }
  ngOnInit() {
    this.getValues();
  }
  protected getCreateMethodName():string{return "createDocument";};
  protected getValuesMethodName():string{return "getDocuments";};
  protected getDetailName():string{return "DocumentDetail";};
  protected getName(value:any):string{return value.id;};
  protected getHeader():string{return "All Documents";};
  protected getAddValue():string{return "Add Document";};
}
