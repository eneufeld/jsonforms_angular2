/// <reference path="../../typings/uischema.d.ts"/>

import {Component} from 'angular2/core';
import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES,UISchemaProviderConfig} from '../../src/forms/forms';
import {MyRenderer1,MyRenderer1Tester} from './custom_renderer/MyRender1'
import {GEDCOMX_PERSON_SCHEMA,GEDCOMX_PERSON_UISCHEMA,GEDCOMX_GENDER_UISCHEMA,GEDCOMX_PERSON_DATA} from './GedcomXDummy';

declare var JsonRefs;
/* ugly hack as model must be completly resolved ...
var genderSchema;
JsonRefs.resolveRefs(GEDCOMX_PERSON_SCHEMA)
    .then(
        res =>{genderSchema=res.resolved.definitions.gender},
        err => {console.log(err)});
*/
@Component({
    selector: 'my-app',
    template:`
        <h1>Form Test</h1>
<!--
        <h2>Test UI Schema</h2>
        <div>{{uischema|json}}</div>
-->
        <h2>Test Data</h2>
        <div>{{data2|json}}</div>
        <h2>Rendered Form</h2>
        <div style="border:1px solid black">
            <form-outlet  [data]="data3" [dataSchema]="dataschema2"></form-outlet>
        </div>
    `,
    styles:[``],
    directives:[FORM_DIRECTIVES],
    providers: [FORM_PROVIDERS]
})
@RendererConfig([
  {renderer:MyRenderer1,tester:MyRenderer1Tester}
])
@UISchemaProviderConfig([
    {uischemaElement:<IUISchemaElement>GEDCOMX_PERSON_UISCHEMA,tester:dataSchema=>{if(JSON.stringify(dataSchema) === JSON.stringify(GEDCOMX_PERSON_SCHEMA) ) return 10; return -1;}}
    /** see first comment
    ,
    {uischemaElement:<IUISchemaElement>GEDCOMX_GENDER_UISCHEMA,tester:dataSchema=>{
        if(JSON.stringify(dataSchema) === JSON.stringify(genderSchema))
            return 10;
        return -1;
    }}
    */
])
export class AppComponent  {
  uischema2:any=GEDCOMX_PERSON_UISCHEMA;
  dataschema2:any=GEDCOMX_PERSON_SCHEMA;
  data3:any={};
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
