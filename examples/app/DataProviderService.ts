import {Injectable} from 'angular2/core';
import {GEDCOMX_DATA,GEDCOMX_PERSON_SCHEMA} from './GedcomXDummy';
declare var JsonRefs;

@Injectable()
export class DataProviderService {
  private _dataSchema:any=GEDCOMX_PERSON_SCHEMA;
  private _refs:any;
  constructor() {
    JsonRefs.resolveRefs(this._dataSchema)
        .then(res =>{
            // Do something with the response
            // res.refs: JSON Reference locations and details
            // res.resolved: The document with the appropriate JSON References resolved
            this._dataSchema=res.resolved;
            this._refs=res.refs;
        }, err => {console.log(err.stack);}
    );
  }
  getPersons() {
    return Promise.resolve(GEDCOMX_DATA.persons);
  }
  getPerson(id:string){
    return Promise.resolve(GEDCOMX_DATA.persons).then(persons => persons.filter(p => p.id === id)[0]);
  }
  getSchema(){
    return this._dataSchema;
  }
  getRefs(){
    return this._refs;
  }
  getPlaces(){
    return Promise.resolve(GEDCOMX_DATA.places);
  }
  getPlace(id:string){
    return Promise.resolve(GEDCOMX_DATA.places).then(places => places.filter(p => p.id === id)[0]);
  }
  getSources(){
    return Promise.resolve(GEDCOMX_DATA.sourceDescriptions);
  }
  getSource(id:string){
    return Promise.resolve(GEDCOMX_DATA.sourceDescriptions).then(sourceDescriptions => sourceDescriptions.filter(s => s.id === id)[0]);
  }
}
