import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'document-detail',
    template:`
    <div *ngIf="_document">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{_document.id}}</h1>
      </header>
      <form-outlet [data]="_document" [dataSchema]="_schema.definitions.document" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_document">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class DocumentDetailComponent implements OnInit {
    private _document: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._document) {
            let id = this._routeParams.get('id');
            this._dataProviderService.getDocument(id).then(
              document => {this._document = document}
            );
        }
    }
}
