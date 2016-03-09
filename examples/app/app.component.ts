/// <reference path="../../typings/uischema.d.ts"/>

import {Component} from 'angular2/core';
import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES,UISchemaProviderConfig} from '../../src/forms/forms';
import {CollapsibleGroupLayoutRenderer,CollapsibleGroupLayoutRendererTester} from './custom_renderer/collapsibleFieldset.component';
import {TextDatalistControlRenderer,TextDatalistControlRendererTester} from './custom_renderer/TextDatalistControlRenderer';
import {GEDCOMX_PERSON_SCHEMA,GEDCOMX_PERSON_UISCHEMA,GEDCOMX_GENDER_UISCHEMA,GEDCOMX_PERSON_DATA,GEDCOMX_PERSON_DATA2} from './GedcomXDummy';
import {DatalistIdProvider} from './custom_renderer/DatalistIdProvider';

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
            <form-outlet  [data]="data3" [dataSchema]="dataschema2" [uiSchema]="uischema2" [root]="true"></form-outlet>
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
    {uischemaElement:<IUISchemaElement>GEDCOMX_PERSON_UISCHEMA,tester:dataSchema=>{if(JSON.stringify(dataSchema) === JSON.stringify(GEDCOMX_PERSON_SCHEMA) ) return 10; return -1;}},
    {uischemaElement:<IUISchemaElement>GEDCOMX_GENDER_UISCHEMA,tester:(dataSchema,uriRef)=>{
        if(uriRef==undefined || uriRef==null)
        return -1;
        let suffix="gender";
        if(uriRef.indexOf(suffix, uriRef.length - suffix.length) !== -1)
            return 10;
        return -1;
    }}
])
export class AppComponent  {
  uischema2:any=GEDCOMX_PERSON_UISCHEMA;
  dataschema2:any=GEDCOMX_PERSON_SCHEMA;
  persons:any[]=[GEDCOMX_PERSON_DATA,GEDCOMX_PERSON_DATA2];
  data3:any;
  data2:any=GEDCOMX_PERSON_DATA;
    uischema:any = {
        "type": "VerticalLayout",
        "label":"myGroup",
        "elements": [
            {
              "type": "Control",
              "scope": {
                "$ref": "#/properties/firstName"
              }
            },
            {
              "type": "Control",
              "scope": {
                "$ref": "#/properties/lastName"
              }
            },
            {
                "type": "Control",
                "scope": {
                  "$ref": "#/properties/personalData"
                }
            },
            {
                "type": "Control",
                "scope": {
                  "$ref": "#/properties/nationality"
                }
            },
            {
                "type": "Control",
                "scope": {
                  "$ref": "#/properties/vegetarian"
                }
            },
            {
                "type": "Control",
                "scope": {
                "$ref": "#/properties/adresses"
                }
            },
            {
                "type": "Control",
                "scope": {
                "$ref": "#/properties/numberArray"
                }
            }
        ]
    };
data:any = {
    firstName:"John",
    lastName:"Doe",
    adresses:[
        {postalCode:"88888",street:"My Street",houseNumber:"123a"},
        {city:"Berlin",postalCode:"12345",street:"My Street",houseNumber:"89b"}
    ]
};
dataschema:any = {
    "definitions": {
        "personalData": {
            "type": "object",
            "properties": {
                "age": {
                  "type": "integer",
                  "minimum":3,
                },
                "height": {
                    "type": "number"
                }
            }
        }
    },

      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "minLength": 10
        },
        "lastName": {
          "type": "string",
          "minLength": 5
        },
        "personalData":{ "$ref": "#/definitions/personalData" },
        "nationality": {
            "type": "string",
            "enum": ["DE", "IT", "JP", "US", "RU", "Other"]
        },
        "vegetarian": {
            "type": "boolean"
        },
        "adresses":{
            "type":"array",
            "items": {
                "type":"object",
                "properties": {
                    "city": {"type": "string"},
                    "postalCode": {"type": "string","minLength": 5,"maxLength": 5},
                    "street": {"type": "string"},
                    "houseNumber": {"type": "string"}
                },
                "required": ["city"]
            },
            "minItems":3
        },
        "numberArray":{
            "type":"array",
            "items": {
                "type":"number",
                "minimum":0.1
            },
            "minItems":1
        }
    },
    "required": ["nationality"]
};
}
