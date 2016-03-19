import {Component,OnInit,Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';

@Component({
    selector: 'document-list',
    template:`
    <h2>All Documents</h2>
    <button (click)="addDocument()">Add Document</button>
    <ul class="places">
      <li *ngFor= "#document of documents"  (click)="gotoDetail(document)">
        <div class="info">
          <div class="name">
            {{document.id}}
          </div>
        </div>
        <div class="actions">
          <button (click)="gotoDetail(document)">Edit</button>
        </div>
      </li>
    </ul>
    `,
    styleUrls:["app/place/places.component.css"],
    pipes: []
})
export class DocumentsComponent implements OnInit {
  public documents: any[];
  constructor(@Inject('DataProviderService')private _dataProviderService: DataProviderService, private _router: Router) { }
  ngOnInit() {
    this.getEvents();
  }
  addEvent(){
    if(this.documents==undefined){
      this.documents = new Array<any>();
    }
    var source:any={id:"document_"+Math.round(Math.random()*100)};
    this.documents.push(source);
    this.gotoDetail(source);
  }
  getEvents() {
    this._dataProviderService.getDocuments().then(documents => this.documents = documents);
  }
  gotoDetail(event:any) {
    this._router.navigate(['DocumentDetail', { id: event.id }]);
  }
}
