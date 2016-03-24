import {Injectable} from 'angular2/core';
import {GEDCOMX_SCHEMA} from './GedcomXDummy';
import {GEDCOMX_DATA} from './demoData/GedcomX.data';
import {GEDCOMX_DATA2} from './demoData/GedcomX.data2';
import {GEDCOMX_DATA3} from './demoData/GedcomX.data3';
import {GEDCOMX_DATA4} from './demoData/GedcomX.data4';
declare var JsonRefs;

@Injectable()
export class DataProviderService {
    private _callbacks:SchemaResolvedCallback[]=[];
  private _dataSchema:any=GEDCOMX_SCHEMA;
  private _resolved:boolean=false;
  //private _dataSchemaPromise:Promise=new Promise(function(resolve, reject) {})
  private _refs:any;
  constructor() {
    JsonRefs.resolveRefs(this._dataSchema)
        .then(res =>{
            // Do something with the response
            // res.refs: JSON Reference locations and details
            // res.resolved: The document with the appropriate JSON References resolved
            this._dataSchema=res.resolved;
            this._refs=res.refs;
            this._resolved=true;
            this._callbacks.forEach(callback=>{callback.call});
        }, err => {console.log(err.stack);}
    );
  }
  getSchema(){
      return new Promise(
          (resolve, reject)=> {
              if(this._resolved)
                resolve(this._dataSchema);
              else
                  this._callbacks.push(()=>{resolve(this._dataSchema)});
          });
  }
  getRefs(){
      return new Promise(
          (resolve, reject)=> {
              if(this._resolved)
                resolve(this._refs);
              else
                  this._callbacks.push(()=>{resolve(this._refs)});
          });
  }
  private get data():any{return GEDCOMX_DATA4;}
  getRoot(){
    return Promise.resolve(this.data);
  }
  getPersons() {
    return Promise.resolve(this.data.persons);
  }
  getPerson(id:string){
    return Promise.resolve(this.data.persons).then(persons => persons.filter(p => p.id === id)[0]);
  }
  createPerson(){
      let newPlace={id:"person_"+Math.round(Math.random()*100)};
      this.data.persons.push(newPlace);
      return newPlace.id;
  }
  getPlaces(){
    return Promise.resolve(this.data.places);
  }
  getPlace(id:string){
    return Promise.resolve(this.data.places).then(places => places.filter(p => p.id === id)[0]);
  }
  createPlace(){
      let newPlace={id:"place_"+Math.round(Math.random()*100)};
      this.data.places.push(newPlace);
      return newPlace.id;
  }
  getSources(){
    return Promise.resolve(this.data.sourceDescriptions);
  }
  getSource(id:string){
    return Promise.resolve(this.data.sourceDescriptions).then(sourceDescriptions => sourceDescriptions.filter(s => s.id === id)[0]);
  }
  createSource(){
    let newSource={id:"source_"+Math.round(Math.random()*100)};
    this.data.sourceDescriptions.push(newSource);
    return newSource.id;
  }
  getRelationships(){
    return Promise.resolve(this.data.relationships);
  }
  getRelationship(id:string){
    return Promise.resolve(this.data.relationships).then(relationships => relationships.filter(r => r.id === id)[0]);
  }
  createRelationship(){
    let newSource={id:"relationship_"+Math.round(Math.random()*100)};
    this.data.relationships.push(newSource);
    return newSource.id;
  }
  getAgents(){
    return Promise.resolve(this.data.agents);
  }
  getAgent(id:string){
    return Promise.resolve(this.data.agents).then(agents => agents.filter(a => a.id === id)[0]);
  }
  createAgent(){
    let newSource={id:"agent_"+Math.round(Math.random()*100)};
    this.data.agents.push(newSource);
    return newSource.id;
  }
  getEvents(){
    return Promise.resolve(this.data.events);
  }
  getEvent(id:string){
    return Promise.resolve(this.data.events).then(events => events.filter(e => e.id === id)[0]);
  }
  createEvent(){
    let newSource={id:"event_"+Math.round(Math.random()*100)};
    this.data.events.push(newSource);
    return newSource.id;
  }
  getDocuments(){
    return Promise.resolve(this.data.documents);
  }
  getDocument(id:string){
    return Promise.resolve(this.data.documents).then(documents => documents.filter(d => d.id === id)[0]);
  }
  createDocument(){
    let newSource={id:"document_"+Math.round(Math.random()*100)};
    this.data.documents.push(newSource);
    return newSource.id;
  }
}

interface SchemaResolvedCallback {():void;}
