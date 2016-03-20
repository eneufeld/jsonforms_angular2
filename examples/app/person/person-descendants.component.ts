import { Component, Input, OnInit,Inject } from 'angular2/core';
import {Router,RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {PersonNamePipe} from './person-name.pipe';
import {PersonBirthDatePipe} from './person-birth-date.pipe';
import {PersonDeathDatePipe} from './person-death-date.pipe';
import {PersonGenderPipe} from './person-gender.pipe';

@Component({
    selector: 'tree-descendants',
    template:`
<div class="tree" *ngIf="_person">
	<ul>
		<li>
			<a [routerLink]="['DescendantTree', {id:_personId}]" [ngClass]="_person | personGender | slice:19 | lowercase">
        <div class="name">
          {{_person | personName}}
        </div>
        <div class="additional">
          <span class="birth">{{_person | personBirthDate}}</span> <span class="death">{{_person | personDeathDate}}</span>
        </div>
      </a>

      <ul *ngIf="_parentsOfPerson.length!=0">
        <li *ngFor="#relationship of _parentsOfPerson">
          <tree-descendants [personId]="relationship.person2.resource|slice:1"></tree-descendants>
        </li>
      </ul>
		</li>
	</ul>
</div>
`,
styleUrls:["app/person/tree.css"],
pipes: [PersonNamePipe,PersonBirthDatePipe,PersonDeathDatePipe,PersonGenderPipe],
directives:[TreeDescendantsComponent,ROUTER_DIRECTIVES]
})
export class TreeDescendantsComponent implements OnInit {
  @Input("personId") private _personId: string;
  private _parentsOfPerson:any[]=[];
  private _person:any;
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router,private _routeParams: RouteParams) { }
  ngOnInit() {
    if(this._personId==undefined)
      this._personId = this._routeParams.get('id');
    this._dataProviderService.getPerson(this._personId).then(
      person => {this._person = person}
    );
    this._dataProviderService.getRelationships().then(relationships=>{
      this._parentsOfPerson=relationships.filter(
        relationship=>{
          return relationship.type=="http://gedcomx.org/ParentChild" && relationship.person1.resource.substr(1)==this._personId;
        }
    )});
  }
}
