/// <reference path="../../typings/uischema.d.ts"/>

import {Component,provide} from 'angular2/core';
import {RouteConfig,ROUTER_DIRECTIVES,ROUTER_PROVIDERS } from 'angular2/router';

import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES,UISchemaProviderConfig,UISchemaParameter} from '../../src/forms/forms';
import {CollapsibleGroupLayoutRenderer,CollapsibleGroupLayoutRendererTester} from './custom_renderer/collapsibleFieldset.component';
import {TextDatalistControlRenderer,TextDatalistControlRendererTester} from './custom_renderer/TextDatalistControlRenderer';
import {ReferenceControlRenderer,ReferenceControlRendererTester} from './custom_renderer/reference.component';
import {GedcomXDateControlRenderer,GedcomXDateControlRendererTester} from './custom_renderer/GedcomXDate.component';
import {GEDCOMX_PERSON_UISCHEMA,GEDCOMX_GENDER_UISCHEMA,GEDCOMX_PERSONREF_UISCHEMA,GEDCOMX_PLACEREF_UISCHEMA,GEDCOMX_RESOURCEREFPLACE_UISCHEMA,GEDCOMX_SOURCEREF_UISCHEMA,GEDCOMX_ANALYSIS_UISCHEMA,GEDCOMX_AGENT_UISCHEMA} from './GedcomX.uischema';
import {DatalistIdProvider} from './custom_renderer/DatalistIdProvider';
import {DataProviderService} from './DataProviderService';
import {PersonsComponent} from './person/persons.component';
import {PersonDetailComponent} from './person/person-detail.component';
import {PlacesComponent} from './place/places.component';
import {PlaceDetailComponent} from './place/place-detail.component';
import {SourcesComponent} from './source/sources.component';
import {SourceDetailComponent} from './source/source-detail.component';
import {RelationshipsComponent} from './relationship/relationships.component';
import {RelationshipDetailComponent} from './relationship/relationship-detail.component';
import {AgentsComponent} from './agent/agents.component';
import {AgentDetailComponent} from './agent/agent-detail.component';
import {EventsComponent} from './event/events.component';
import {EventDetailComponent} from './event/event-detail.component';
import {DocumentsComponent} from './document/documents.component';
import {DocumentDetailComponent} from './document/document-detail.component';
import {HomeComponent} from './home.component';
import {TreeAncestorsComponent} from './person/ancestors.component';
import {TreeDescendantsComponent} from './person/person-descendants.component';

@Component({
    selector: 'my-app',
    template:`
    <div>
      <a [routerLink]="['Home']">Home</a>
      <a [routerLink]="['Persons']">List of Persons</a>
      <a [routerLink]="['Places']">List of Places</a>
      <a [routerLink]="['Sources']">List of Sources</a>
      <a [routerLink]="['Relationships']">List of Relationships</a>
      <a [routerLink]="['Agents']">List of Agents</a>
      <a [routerLink]="['Events']">List of Events</a>
      <a [routerLink]="['Documents']">List of Documents</a>
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
    providers: [ROUTER_PROVIDERS,FORM_PROVIDERS,DatalistIdProvider,provide("DataProviderService", {useClass: DataProviderService})]
})
@RendererConfig([
  {renderer:CollapsibleGroupLayoutRenderer,tester:CollapsibleGroupLayoutRendererTester},
  {renderer:TextDatalistControlRenderer,tester:TextDatalistControlRendererTester},
  {renderer:ReferenceControlRenderer,tester:ReferenceControlRendererTester},
  {renderer:GedcomXDateControlRenderer,tester:GedcomXDateControlRendererTester}
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
    {uischemaElement:<IUISchemaElement>GEDCOMX_GENDER_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let suffix="gender";
        if(uiSchemaParameter.refUri.indexOf(suffix, uiSchemaParameter.refUri.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_PLACEREF_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let suffix="placeReference";
        if(uiSchemaParameter.refUri.indexOf(suffix, uiSchemaParameter.refUri.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_RESOURCEREFPLACE_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let ref="/resourceReference";
        let property="jurisdiction"
        if(uiSchemaParameter.refUri.indexOf(ref, uiSchemaParameter.refUri.length - ref.length) !== -1 &&
            uiSchemaParameter.property.indexOf(property, uiSchemaParameter.property.length - property.length) !== -1
        )
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_SOURCEREF_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let suffix="/sourceReference";
        let property1="sources";
        let property2="media";
        let property3="componentOf";

        if(uiSchemaParameter.refUri.indexOf(suffix, uiSchemaParameter.refUri.length - suffix.length) !== -1&&
            (
                uiSchemaParameter.property.indexOf(property1, uiSchemaParameter.property.length - property1.length) !== -1
                ||
                uiSchemaParameter.property.indexOf(property2, uiSchemaParameter.property.length - property2.length) !== -1
                ||
                uiSchemaParameter.property.indexOf(property3, uiSchemaParameter.property.length - property3.length) !== -1
            )
    )
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_ANALYSIS_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let ref="/resourceReference";
        let property="analysis"
        if(uiSchemaParameter.refUri.indexOf(ref, uiSchemaParameter.refUri.length - ref.length) !== -1 &&
            uiSchemaParameter.property.indexOf(property, uiSchemaParameter.property.length - property.length) !== -1
        )
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_AGENT_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let ref="/resourceReference";
        let property1="contributor";
        let property2="creator";
        let property3="repository";
        let property4="mediator";
        if(uiSchemaParameter.refUri.indexOf(ref, uiSchemaParameter.refUri.length - ref.length) !== -1 &&
            (
                uiSchemaParameter.property.indexOf(property1, uiSchemaParameter.property.length - property1.length) !== -1
                ||
                uiSchemaParameter.property.indexOf(property2, uiSchemaParameter.property.length - property2.length) !== -1
                ||
                uiSchemaParameter.property.indexOf(property3, uiSchemaParameter.property.length - property3.length) !== -1
                ||
                uiSchemaParameter.property.indexOf(property4, uiSchemaParameter.property.length - property4.length) !== -1
            )
        )
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_PERSONREF_UISCHEMA,tester:(dataSchema,uiSchemaParameter)=>{
        if(uiSchemaParameter==undefined || uiSchemaParameter==null)
            return -1;
        let ref="/resourceReference";
        let property1="person"
        let property2="person1"
        let property3="person2"
        if(uiSchemaParameter.refUri.indexOf(ref, uiSchemaParameter.refUri.length - ref.length) !== -1 &&
        uiSchemaParameter.property.indexOf(property1, uiSchemaParameter.property.length - property1.length) !== -1
        ||
        uiSchemaParameter.property.indexOf(property2, uiSchemaParameter.property.length - property2.length) !== -1
        ||
        uiSchemaParameter.property.indexOf(property3, uiSchemaParameter.property.length - property3.length) !== -1
        )
            return 10;
        return -1;
    }},
])
@RouteConfig([
    { path: '/home', component: HomeComponent, name: 'Home',useAsDefault: true },
  { path: '/personlist', component: PersonsComponent, name: 'Persons'},
  {path: '/person/:id', name: 'PersonDetail', component: PersonDetailComponent},
  { path: '/placeslist', component: PlacesComponent, name: 'Places'},
  {path: '/place/:id', name: 'PlaceDetail', component: PlaceDetailComponent},
  { path: '/sourceslist', component: SourcesComponent, name: 'Sources'},
  {path: '/source/:id', name: 'SourceDetail', component: SourceDetailComponent},
  { path: '/relationshiplist', component: RelationshipsComponent, name: 'Relationships'},
  {path: '/relationship/:id', name: 'RelationshipDetail', component: RelationshipDetailComponent},
  { path: '/agentslist', component: AgentsComponent, name: 'Agents'},
  {path: '/agent/:id', name: 'AgentDetail', component: AgentDetailComponent},
  { path: '/eventslist', component: EventsComponent, name: 'Events'},
  {path: '/event/:id', name: 'EventDetail', component: EventDetailComponent},
  { path: '/documentslist', component: DocumentsComponent, name: 'Documents'},
  {path: '/document/:id', name: 'DocumentDetail', component: DocumentDetailComponent},

  {path: '/ancestortree/:id', name: 'AncestorTree', component: TreeAncestorsComponent},
  {path: '/descendanttree/:id', name: 'DescendantTree', component: TreeDescendantsComponent},

])
export class AppComponent{
goBack() {
      window.history.back();
  }
}
