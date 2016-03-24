import {Component, OnInit,Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {PersonNamePipe} from './person-name.pipe';
import {PersonGenderPipe} from './person-gender.pipe';
import {PersonUtil} from './person-util';
import {FORM_PROVIDERS,FORM_DIRECTIVES} from '../../../src/forms/forms';

@Component({
    selector: 'person-detail',
    template:`
    <div *ngIf="_person">
      <header [ngClass]="{male:isMale(), female:isFemale(), unknown:isUnknown()}">
        <!-- <nav>Ancestors Descendants</nav> -->
        <h1>{{getPersonName()}}</h1>
      </header>
      <form-outlet [data]="_person" [dataSchema]="_schema.definitions.person" [root]="true" [refs]="_refs"></form-outlet>
    </div>
    <div *ngIf="!_person">Loading...</div>
    `,
    styles: [``],
    pipes: [PersonNamePipe,PersonGenderPipe],
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

    getPersonName():string {
      return PersonUtil.getPersonName(this._person);
    }
}
