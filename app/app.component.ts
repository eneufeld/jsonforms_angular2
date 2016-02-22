/// <reference path="typings/uischema.d.ts"/>

import {Component} from 'angular2/core';
import {RendererConfig,FORM_PROVIDERS,FORM_DIRECTIVES} from './forms/forms';
import {MyRenderer1,MyRenderer1Tester} from './custom_renderer/MyRender1'

@Component({
    selector: 'my-app',
    template:`
    <h1>Form Test</h1>
    <div>
      <h2>Test UI Schema</h2>
      <div>{{uischema|json}}</div>
      <h2>Test Data</h2>
      <div>{{data|json}}</div>
    </div>
    <form-outlet [uiSchema]="uischema" [data]="data" [dataSchema]="dataschema"></form-outlet>
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
      "type": "string"
    }
  }
};
}
