import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {PersonUtil} from './person-util';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'person-detail',
    template:`
    <div *ngIf="_person">
      <header [ngClass]="getGenderClass()">
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{getPersonName()}}</h1>
      </header>
      <form-outlet [data]="_person" [dataSchema]="_schema.definitions.person" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_person">Loading...</div>
    `,
    styles: [``],
    pipes: [],
    directives:[FORM_DIRECTIVES]
})
export class PersonDetailComponent implements OnInit {
    private _person: any;
    private _schema:any;
    private _refs:any;

    constructor(@Inject('DataProviderService') private _dataProviderService: DataProviderService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._schema=this._dataProviderService.getSchema().then(schema=>{this._schema=schema});
        this._refs=this._dataProviderService.getRefs().then(refs=>{this._refs=refs});
        if (!this._person) {
            let id = this._routeParams.get('id');
            this._dataProviderService.getPerson(id).then(
              person => {this._person = person}
            );
        }
    }
    /*
    isMale(){
      if(this._person.gender==undefined)
        return false;
      return this._person.gender.type=="http://gedcomx.org/Male";
    }
    isFemale(){
      if(this._person.gender==undefined)
        return false;
      return this._person.gender.type=="http://gedcomx.org/Female";
    }
    isUnknown(){
      if(this._person.gender==undefined)
        return true;
      return this._person.gender.type=="http://gedcomx.org/Unknown";
    }
    */
    getGenderClass(){
      return PersonUtil.getGenderClass(this._person);
    }

    getPersonName():string {
      return PersonUtil.getPersonName(this._person);
    }
}
