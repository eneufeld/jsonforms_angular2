import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'event-detail',
    template:`
    <div *ngIf="_event">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{_event.id}}</h1>
      </header>
      <form-outlet [data]="_event" [dataSchema]="_schema.definitions.event" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_event">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class EventDetailComponent implements OnInit {
    private _event: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._event) {
            let id = this._routeParams.get('id');
            this._dataProviderService.getEvent(id).then(
              event => {this._event = event}
            );
        }
    }
}
