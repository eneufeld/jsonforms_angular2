/// <reference path="../../typings/uischema.d.ts"/>

import {Component,OnInit} from 'angular2/core';
import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES,UISchemaProviderConfig} from '../../src/forms/forms';
import {CollapsibleGroupLayoutRenderer,CollapsibleGroupLayoutRendererTester} from './custom_renderer/collapsibleFieldset.component';
import {TextDatalistControlRenderer,TextDatalistControlRendererTester} from './custom_renderer/TextDatalistControlRenderer';
import {GEDCOMX_PERSON_SCHEMA,GEDCOMX_PERSON_UISCHEMA,GEDCOMX_GENDER_UISCHEMA,GEDCOMX_PERSON_DATA,GEDCOMX_PERSON_DATA2,GEDCOMX_DATA} from './GedcomXDummy';
import {DatalistIdProvider} from './custom_renderer/DatalistIdProvider';

declare var JsonRefs;

@Component({
    selector: 'my-app',
    template:`
        <h1>Form Test</h1>
        <!--
        <h2>Test UI Schema</h2>
        <div>{{uischema|json}}</div>
        <h2>Test Data</h2>
        <div>{{data3|json}}</div>
        -->
        <ul style="list-style-type:none;">
        <li *ngFor="#person of persons" (click)="data3=person" class="personEntry"  [ngClass]="{selected: data3==person}">
            <span>{{person.names[0].nameForms[0].fullText}}</span>
        </li>
        </ul>
        <h2>Rendered Form</h2>
        <div *ngIf="data3!=null">
            <form-outlet  [data]="data3" [dataSchema]="dataschema2.definitions.person" [uiSchema]="uischema2" [root]="true" [refs]="refs"></form-outlet><!--   -->
        </div>
        <span *ngIf="data3==null">No person selected!</span>
    `,
    styles:[`.personEntry:hover{font-weight:bold;cursor:pointer} .selected{font-weight:bold;}`],
    directives:[FORM_DIRECTIVES],
    providers: [FORM_PROVIDERS,DatalistIdProvider]
})
@RendererConfig([
  {renderer:CollapsibleGroupLayoutRenderer,tester:CollapsibleGroupLayoutRendererTester},
  {renderer:TextDatalistControlRenderer,tester:TextDatalistControlRendererTester}
])
@UISchemaProviderConfig([

    {uischemaElement:<IUISchemaElement>GEDCOMX_PERSON_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
            return -1;
        let suffix="person";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }},
    {uischemaElement:<IUISchemaElement>GEDCOMX_GENDER_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
            return -1;
        let suffix="gender";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }}
])
export class AppComponent implements OnInit  {
    uischema2:any=GEDCOMX_PERSON_UISCHEMA;
    dataschema2:any=GEDCOMX_PERSON_SCHEMA;
    persons:any[]=GEDCOMX_DATA.persons;
    data3:any;
    data2:any=GEDCOMX_DATA;
    refs:any;


ngOnInit() {
    JsonRefs.resolveRefs(this.dataschema2)
        .then(res =>{
            // Do something with the response
            // res.refs: JSON Reference locations and details
            // res.resolved: The document with the appropriate JSON References resolved
            this.dataschema2=res.resolved;
            this.refs=res.refs;
        }, err => {console.log(err.stack);}
    );
}
}
