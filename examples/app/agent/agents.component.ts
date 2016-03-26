import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {ListComponent} from '../list/list-abstract.component';

@Component({
    selector: 'agent-list',
    templateUrl:"app/list/list-template.html",
    styleUrls:["app/list/list.css"],
    pipes: []
})
export class AgentsComponent extends ListComponent implements OnInit {
  constructor(@Inject('DataProviderService') _dataProviderService: DataProviderService,  _router: Router) {
    super(_dataProviderService,_router);
  }
  ngOnInit() {
    this.getValues();
  }
  protected getCreateMethodName():string{return "createAgent";};
  protected getValuesMethodName():string{return "getAgents";};
  protected getDetailName():string{return "AgentDetail";};
  protected getName(value:any):string{return value.names?value.names[0].value:value.id};
  protected getHeader():string{return "All Agents";};
  protected getAddValue():string{return "Add Agent";};
}
