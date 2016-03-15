import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';

@Component({
    selector: 'places-list',
    template:`
    <h2>All Sources</h2>
    <button (click)="addSource()">Add Source</button>
    <ul class="places">
      <li *ngFor= "#source of sources"  (click)="gotoDetail(source)">
        <div class="info">
          <div class="name">
            {{source.citations[0].value}}
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(source)">Edit</button>
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/place/places.component.css"],
    pipes: []
})
export class SourcesComponent implements OnInit {
  public sources: any[];
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getSources();
  }
  addSource(){
    if(this.sources==undefined){
      this.sources = new Array<any>();
    }
    var source:any={id:"source_"+Math.round(Math.random()*100)};
    this.sources.push(source);
    this.gotoDetail(source);
  }
  getSources() {
    this._dataProviderService.getSources().then(sources => this.sources = sources);
  }
  gotoDetail(place:any) {
    this._router.navigate(['SourceDetail', { id: place.id }]);
  }
}
