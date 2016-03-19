import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'agent-detail',
    template:`
    <div *ngIf="_agent">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{_agent.names?_agent.names[0].value:_agent.id}}</h1>
      </header>
      <form-outlet [data]="_agent" [dataSchema]="_schema.definitions.agent" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_agent">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class AgentDetailComponent implements OnInit {
    private _agent: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._agent) {
            let id = this._routeParams.get('id');
            this._dataProviderService.getAgent(id).then(
              agent => {this._agent = agent}
            );
        }
    }
}
