import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {ListComponent} from '../list/list-abstract.component';

@Component({
    selector: 'source-list',
    templateUrl:"app/list/list-template.html",
    styleUrls:["app/list/list.css"],
    pipes: []
})
export class SourcesComponent extends ListComponent implements OnInit {
  constructor(@Inject('DataProviderService') _dataProviderService: DataProviderService,  _router: Router) {
    super(_dataProviderService,_router);
  }
  ngOnInit() {
    this.getValues();
  }
  protected getCreateMethodName():string{return "createSource";};
  protected getValuesMethodName():string{return "getSources";};
  protected getDetailName():string{return "SourceDetail";};
  protected getName(value:any):string{return value.citations?value.citations[0].value:value.id;};
  protected getHeader():string{return "All Sources";};
  protected getAddValue():string{return "Add Source";};
}
