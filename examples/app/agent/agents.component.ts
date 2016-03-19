import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';

@Component({
    selector: 'agent-list',
    template:`
    <h2>All Agents</h2>
    <button (click)="addAgent()">Add Agent</button>
    <ul class="places">
      <li *ngFor= "#agent of agents"  (click)="gotoDetail(agent)">
        <div class="info">
          <div class="name">
            {{agent.names?agent.names[0].value:agent.id}}
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(agent)">Edit</button>
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/place/places.component.css"],
    pipes: []
})
export class AgentsComponent implements OnInit {
  public agents: any[];
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getAgents();
  }
  addAgent(){
    if(this.agents==undefined){
      this.agents = new Array<any>();
    }
    var source:any={id:"source_"+Math.round(Math.random()*100)};
    this.agents.push(source);
    this.gotoDetail(source);
  }
  getAgents() {
    this._dataProviderService.getAgents().then(agents => this.agents = agents);
  }
  gotoDetail(place:any) {
    this._router.navigate(['AgentDetail', { id: place.id }]);
  }
}
