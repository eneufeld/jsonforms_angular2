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
  private createNewObject(idPrefix:string):any{
      return {id:idPrefix+"_"+Math.round(Math.random()*100)};
  }
  private setArrayValue(arrayName:string, value:any){
      if(this.data[arrayName]==undefined){
          this.data[arrayName]=[];
      }
      this.data[arrayName].push(value);
  }
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
      let newPerson=this.createNewObject("person");
      this.setArrayValue("persons",newPerson);
      return newPerson.id;
  }
  getPlaces(){
    return Promise.resolve(this.data.places);
  }
  getPlace(id:string){
    return Promise.resolve(this.data.places).then(places => places.filter(p => p.id === id)[0]);
  }
  createPlace(){
      let newPlace=this.createNewObject("place");
      this.setArrayValue("places",newPlace);
      return newPlace.id;
  }
  getSources(){
    return Promise.resolve(this.data.sourceDescriptions);
  }
  getSource(id:string){
    return Promise.resolve(this.data.sourceDescriptions).then(sourceDescriptions => sourceDescriptions.filter(s => s.id === id)[0]);
  }
  createSource(){
    let newSource=this.createNewObject("source");
    this.setArrayValue("sourceDescriptions",newSource);
    return newSource.id;
  }
  getRelationships(){
    return Promise.resolve(this.data.relationships);
  }
  getRelationship(id:string){
    return Promise.resolve(this.data.relationships).then(relationships => relationships.filter(r => r.id === id)[0]);
  }
  createRelationship(){
    let newRelationship=this.createNewObject("relationship");
    this.setArrayValue("relationships",newRelationship);
    return newRelationship.id;
  }
  getAgents(){
    return Promise.resolve(this.data.agents);
  }
  getAgent(id:string){
    return Promise.resolve(this.data.agents).then(agents => agents.filter(a => a.id === id)[0]);
  }
  createAgent(){
    let newAgent=this.createNewObject("agent");
    this.setArrayValue("agents",newAgent);
    return newAgent.id;
  }
  getEvents(){
    return Promise.resolve(this.data.events);
  }
  getEvent(id:string){
    return Promise.resolve(this.data.events).then(events => events.filter(e => e.id === id)[0]);
  }
  createEvent(){
    let newEvent=this.createNewObject("event");
    this.setArrayValue("events",newEvent);
    return newEvent.id;
  }
  getDocuments(){
    return Promise.resolve(this.data.documents);
  }
  getDocument(id:string){
    return Promise.resolve(this.data.documents).then(documents => documents.filter(d => d.id === id)[0]);
  }
  createDocument(){
    let newDocument=this.createNewObject("document");
    this.setArrayValue("documents",newDocument);
    return newDocument.id;
  }
}

interface SchemaResolvedCallback {():void;}
