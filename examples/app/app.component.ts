/// <reference path="../../typings/uischema.d.ts"/>

import {Component,OnInit} from 'angular2/core';
import {RouteConfig,ROUTER_DIRECTIVES,ROUTER_PROVIDERS } from 'angular2/router';

import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES,UISchemaProviderConfig} from '../../src/forms/forms';
import {CollapsibleGroupLayoutRenderer,CollapsibleGroupLayoutRendererTester} from './custom_renderer/collapsibleFieldset.component';
import {TextDatalistControlRenderer,TextDatalistControlRendererTester} from './custom_renderer/TextDatalistControlRenderer';
import {ReferenceControlRenderer,ReferenceControlRendererTester} from './custom_renderer/reference.component';
import {GEDCOMX_PERSON_SCHEMA,GEDCOMX_PERSON_UISCHEMA,GEDCOMX_GENDER_UISCHEMA,GEDCOMX_PLACEREF_UISCHEMA,GEDCOMX_SOURCEREF_UISCHEMA,GEDCOMX_PERSON_DATA,GEDCOMX_PERSON_DATA2,GEDCOMX_DATA} from './GedcomXDummy';
import {DatalistIdProvider} from './custom_renderer/DatalistIdProvider';
import {DataProviderService} from './DataProviderService';
import {PersonsComponent} from './person/persons.component';
import {PersonDetailComponent} from './person/person-detail.component';
import {PlacesComponent} from './place/places.component';
import {PlaceDetailComponent} from './place/place-detail.component';
import {SourcesComponent} from './source/sources.component';
import {SourceDetailComponent} from './source/source-detail.component';

@Component({
    selector: 'my-app',
    template:`
    <div>
      <a [routerLink]="['Persons']">List of Persons</a>
      <a [routerLink]="['Places']">List of Places</a>
      <a [routerLink]="['Sources']">List of Sources</a>
      <button (click)="goBack()">Back</button>
    </div>
    <router-outlet></router-outlet>
    `,
    styles:[`
      a,button {
        padding: 5px 10px;
        text-decoration: none;
        margin-top: 10px;
        display: inline-block;
        background-color: #eee;
        border-radius: 4px;
        color: #0387c7;
        border:none;
        font-family: 'Merriweather', serif;
        font-size:16px;
      }
      a:visited, a:link {
        color: #607D8B;
      }
      a:hover,button:hover {
        color: #039be5;
        background-color: #CFD8DC;
      }
      a.router-link-active {
        color: #039be5;
      }
    `],
    directives:[ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS,FORM_PROVIDERS,DatalistIdProvider,DataProviderService]
})
@RendererConfig([
  {renderer:CollapsibleGroupLayoutRenderer,tester:CollapsibleGroupLayoutRendererTester},
  {renderer:TextDatalistControlRenderer,tester:TextDatalistControlRendererTester},
  {renderer:ReferenceControlRenderer,tester:ReferenceControlRendererTester}
])
@UISchemaProviderConfig([
    /*
    {uischemaElement:<IUISchemaElement>GEDCOMX_PERSON_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
            return -1;
        let suffix="person";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
    */
    {uischemaElement:<IUISchemaElement>GEDCOMX_GENDER_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
            return -1;
        let suffix="gender";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_PLACEREF_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
            return -1;
        let suffix="placeReference";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_SOURCEREF_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
            return -1;
        let suffix="/sourceReference";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
])
@RouteConfig([
  { path: '/personlist', component: PersonsComponent, name: 'Persons',useAsDefault: true },
  {path: '/person/:id', name: 'PersonDetail', component: PersonDetailComponent},
  { path: '/placeslist', component: PlacesComponent, name: 'Places'},
  {path: '/place/:id', name: 'PlaceDetail', component: PlaceDetailComponent},
  { path: '/sourceslist', component: SourcesComponent, name: 'Sources'},
  {path: '/source/:id', name: 'SourceDetail', component: SourceDetailComponent}
])
export class AppComponent implements OnInit  {
    uischema2:any=GEDCOMX_PERSON_UISCHEMA;
    dataschema2:any=GEDCOMX_PERSON_SCHEMA;
    persons:any[]=GEDCOMX_DATA.persons;
    data3:any;
    data2:any=GEDCOMX_DATA;
    refs:any;


ngOnInit() {

}
goBack() {
      window.history.back();
  }
}
