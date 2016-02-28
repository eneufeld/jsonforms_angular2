/// <reference path="../../typings/uischema.d.ts"/>

import {Component} from 'angular2/core';
import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES} from '../../src/forms/forms';
import {MyRenderer1,MyRenderer1Tester} from './custom_renderer/MyRender1'

@Component({
    selector: 'my-app',
    template:`
        <h1>Form Test</h1>
        <h2>Test UI Schema</h2>
        <div>{{uischema|json}}</div>
        <h2>Test Data</h2>
        <div>{{data|json}}</div>
        <h2>Rendered Form</h2>
        <div style="border:1px solid black">
            <form-outlet [uiSchema]="uischema" [data]="data" [dataSchema]="dataschema"></form-outlet>
        </div>
    `,
    styles:[``],
    directives:[FORM_DIRECTIVES],
    providers: [FORM_PROVIDERS]
})
@RendererConfig([
  {renderer:MyRenderer1,tester:MyRenderer1Tester}
])
export class AppComponent  {
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
      "$ref": "#/properties/personalData/properties/age"
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
      "$ref": "#/properties/personalData/properties/height"
    }
  },
  {
    "type": "Control",
    "scope": {
      "$ref": "#/properties/vegetarian"
    }
  }
  ]
};
  data:any = {name:"John Doe",firstName:"John",lastName:"Doe"};
  dataschema:any = {
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
        "personalData": {
            "type": "object",
            "properties": {
                "age": {
                  "type": "integer"
                },
                "height": {
                    "type": "number"
                }
            }
        },
        "nationality": {
            "type": "string",
            "enum": ["DE", "IT", "JP", "US", "RU", "Other"]
        },
        "vegetarian": {
            "type": "boolean"
        },
    },
    "required": ["nationality"]
};
}
