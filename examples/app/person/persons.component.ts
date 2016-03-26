import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {ListComponent,AdditionalInfo,AdditionalButton} from '../list/list-abstract.component';
import {PersonUtil} from './person-util';

@Component({
    selector: 'person-list',
    templateUrl:"app/list/list-template.html",
    styleUrls:["app/list/list.css","app/person/persons.component.css"],
    pipes: []
})
export class PersonsComponent extends ListComponent implements OnInit {
  constructor(@Inject('DataProviderService') _dataProviderService: DataProviderService,  _router: Router) {
    super(_dataProviderService,_router);
  }
  ngOnInit() {
    this.getValues();
  }
  protected getCreateMethodName():string{return "createPerson";};
  protected getValuesMethodName():string{return "getPersons";};
  protected getDetailName():string{return "PersonDetail";};
  protected getName(value:any):string{return PersonUtil.getPersonName(value);};
  protected getHeader():string{return "All Persons";};
  protected getAddValue():string{return "Add Person";};
  protected getAdditionalClassesOnInfo(value:any):string{return PersonUtil.getGenderClass(value)};
  protected getAdditionalInfos(value:any):Array<AdditionalInfo>{return [{class:"birth",value:PersonUtil.getBirthDate(value)},{class:"death",value:PersonUtil.getDeathDate(value)}]};
  protected getAdditionalButtons(value:any):Array<AdditionalButton>{
    return [
      {click:()=>this.gotoAncestorTree(value),value:"Anc"},
      {click:()=>this.gotoDescendantTree(value),value:"Des"},
    ]
  };
  private gotoAncestorTree(person:any) {
    this._router.navigate(['AncestorTree', { id: person.id }]);
  }
  private gotoDescendantTree(person:any) {
    this._router.navigate(['DescendantTree', { id: person.id }]);
  }
}
