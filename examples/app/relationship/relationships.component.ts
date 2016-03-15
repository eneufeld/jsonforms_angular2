import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';

@Component({
    selector: 'relationship-list',
    template:`
    <h2>All Relationships</h2>
    <button (click)="addRelationship()">Add Source</button>
    <ul class="places">
      <li *ngFor= "#relationship of relationships"  (click)="gotoDetail(relationship)">
        <div class="info">
          <div class="name">
            {{relationship.id}}
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(relationship)">Edit</button>
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/place/places.component.css"],
    pipes: []
})
export class RelationshipsComponent implements OnInit {
  public relationships: any[];
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getRelationships();
  }
  addRelationship(){
    if(this.relationships==undefined){
      this.relationships = new Array<any>();
    }
    var source:any={id:"relationship_"+Math.round(Math.random()*100)};
    this.relationships.push(source);
    this.gotoDetail(source);
  }
  getRelationships() {
    this._dataProviderService.getRelationships().then(relationships => this.relationships = relationships);
  }
  gotoDetail(place:any) {
    this._router.navigate(['RelationshipDetail', { id: place.id }]);
  }
}
