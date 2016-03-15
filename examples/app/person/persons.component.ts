import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {PersonNamePipe} from './person-name.pipe';
import {PersonBirthDatePipe} from './person-birth-date.pipe';
import {PersonDeathDatePipe} from './person-death-date.pipe';
import {PersonGenderPipe} from './person-gender.pipe';

@Component({
    selector: 'person-list',
    template:`
    <h2>All Persons</h2>
    <button (click)="addPerson()">Add Person</button>
    <ul class="persons">
      <li *ngFor= "#person of persons"  (click)="gotoDetail(person)">
        <div class="info" [ngClass]="person | personGender | slice:19 | lowercase">
          <div class="name">
            {{person | personName}}
          </div>
          <div class="additional">
            <span class="birth">{{person | personBirthDate}}</span> <span class="death">{{person | personDeathDate}}</span>
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(person)">Edit</button>
          <button>Anc</button><!--Ancestors-->
          <button>Des</button><!--Descendant-->
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/person/persons.component.css"],
    pipes: [PersonNamePipe,PersonBirthDatePipe,PersonDeathDatePipe,PersonGenderPipe]
})
export class PersonsComponent implements OnInit {
  public persons: any[];
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getPersons();
  }
  addPerson(){
    if(this.persons==undefined){
      this.persons = new Array<any>();
    }
    var person:any={id:"person_"+Math.round(Math.random()*100)};
    this.persons.push(person);
    this.gotoDetail(person);
  }
  getPersons() {
    this._dataProviderService.getPersons().then(persons => this.persons = persons);
  }
  gotoDetail(person:any) {
    this._router.navigate(['PersonDetail', { id: person.id }]);
  }
}
