import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {PlaceUtil} from './place-util';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'place-detail',
    template:`
    <div *ngIf="_place">
      <header>
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{getPlaceName()}}</h1>
      </header>
      <form-outlet [data]="_place" [dataSchema]="_schema.definitions.placeDescription" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_place">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class PlaceDetailComponent implements OnInit {
    private _place: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
          this._schema=this._dataProviderService.getSchema();
          this._refs=this._dataProviderService.getRefs();
    }

    ngOnInit() {
        if (!this._place) {
            let id = this._routeParams.get('id');
            this._dataProviderService.getPlace(id).then(
              place => {this._place = place}
            );
        }
    }

    getPlaceName():string {
      return PlaceUtil.getPlaceName(this._place);
    }
}
