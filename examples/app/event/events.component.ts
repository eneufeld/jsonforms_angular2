import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';

@Component({
    selector: 'event-list',
    template:`
    <h2>All Events</h2>
    <button (click)="addEvent()">Add Event</button>
    <ul class="places">
      <li *ngFor= "#event of events"  (click)="gotoDetail(event)">
        <div class="info">
          <div class="name">
            {{event.id}}
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(event)">Edit</button>
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/place/places.component.css"],
    pipes: []
})
export class EventsComponent implements OnInit {
  public events: any[];
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getEvents();
  }
  addEvent(){
    if(this.events==undefined){
      this.events = new Array<any>();
    }
    var source:any={id:"event_"+Math.round(Math.random()*100)};
    this.events.push(source);
    this.gotoDetail(source);
  }
  getEvents() {
    this._dataProviderService.getEvents().then(events => this.events = events);
  }
  gotoDetail(event:any) {
    this._router.navigate(['EventDetail', { id: event.id }]);
  }
}
