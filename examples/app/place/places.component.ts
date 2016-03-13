import {Component,OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';
import {PlaceNamePipe} from './place-name.pipe';

@Component({
    selector: 'places-list',
    template:`
    <h2>All Places</h2>
    <button (click)="addPlace()">Add Place</button>
    <ul class="places">
      <li *ngFor= "#place of places"  (click)="gotoDetail(place)">
        <div class="info">
          <div class="name">
            {{place | placeName}}
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(place)">Edit</button>
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/place/places.component.css"],
    pipes: [PlaceNamePipe]
})
export class PlacesComponent implements OnInit {
  public places: any[];
  constructor(private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getPlaces();
  }
  addPlace(){
    if(this.places==undefined){
      this.places = new Array<any>();
    }
    var place:any={id:"place_"+Math.round(Math.random()*100)};
    this.places.push(place);
    this.gotoDetail(place);
  }
  getPlaces() {
    this._dataProviderService.getPlaces().then(places => this.places = places);
  }
  gotoDetail(place:any) {
    this._router.navigate(['PlaceDetail', { id: place.id }]);
  }
}
