import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'relationship-detail',
    template:`
    <div *ngIf="_relationship">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{_relationship.id}}</h1>
      </header>
      <form-outlet [data]="_relationship" [dataSchema]="_schema.definitions.relationship" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_relationship">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class RelationshipDetailComponent implements OnInit {
    private _relationship: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._relationship) {
            let id = this._routeParams.get('id');
            this._dataProviderService.getRelationship(id).then(
              relationship => {this._relationship = relationship}
            );
        }
    }
}
