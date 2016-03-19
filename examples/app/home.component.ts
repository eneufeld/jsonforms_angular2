import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from './DataProviderService';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../src/forms/forms';

@Component({
    selector: 'agent-detail',
    template:`
    <div *ngIf="_attribution">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>Data Status</h1>
      </header>
      <form-outlet [data]="_attribution" [dataSchema]="_schema.definitions.attribution" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_attribution">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    private _attribution: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._attribution) {
            this._dataProviderService.getRootAttribution().then(
              attribution => {this._attribution = attribution}
            );
        }
    }
}
