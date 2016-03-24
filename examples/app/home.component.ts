import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from './DataProviderService';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../src/forms/forms';

@Component({
    selector: 'agent-detail',
    template:`
    <div *ngIf="_root">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>Data Status</h1>
      </header>
      <form-outlet [data]="_root" [dataSchema]="_schema" [uiSchema]="_uischema" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_root">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    private _root: any;
    private _schema:any;
    private _refs:any;
    private _uischema=UI_SCHEMA;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._root) {
            this._dataProviderService.getRoot().then(root => {this._root = root});
        }
    }
}
var UI_SCHEMA:any={
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/description"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/id"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/lang"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/attribution/properties/contributor/properties/resource"
            },
            "navigateTo": "AgentDetail",
            "dataService":"DataProviderService",
            "create":"createAgent",
            "select":"getAgents",
            "get":"getAgent",
            "linkName":{
                "$ref": "/names/0/value"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/attribution/properties/modified"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/attribution/properties/changeMessage"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/attribution/properties/creator/properties/resource"
            },
            "navigateTo": "AgentDetail",
            "dataService":"DataProviderService",
            "create":"createAgent",
            "select":"getAgents",
            "get":"getAgent",
            "linkName":{
                "$ref": "/names/0/value"
            }
        },
        {
            "type": "Control",
            "scope": {
                "$ref": "/properties/attribution/properties/created"
            }
        }
    ]
};
