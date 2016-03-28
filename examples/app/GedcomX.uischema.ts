export var GEDCOMX_PERSON_UISCHEMA: any =
  {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/allOf/1/properties/private"
        }
      },
      {
        "type": "Control",
        "scope": {
          "$ref": "/allOf/1/properties/gender"
        }
      },
      {
        "type": "Control",
        "scope": {
          "$ref": "/allOf/1/properties/names"
        }
      },
      {
        "type": "Control",
        "scope": {
          "$ref": "/allOf/1/properties/facts"
        }
      }
    ]
  }

export var GEDCOMX_GENDER_UISCHEMA: any =
  {
    "type": "GroupLayout",
    "label": "Gender",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/allOf/1/properties/type"
        }
      },
      {
        "type": "GroupLayout",
        "label": "Conclusion",
        "elements": [
          {
            "type": "Control",
            "scope": {
              "$ref": "/allOf/0/properties/id"
            }
          },
          {
            "type": "Control",
            "scope": {
              "$ref": "/allOf/0/properties/lang"
            }
          },
          {
            "type": "Control",
            "scope": {
              "$ref": "/allOf/0/properties/sources"
            }
          },
          {
            "type": "Control",
            "scope": {
              "$ref": "/allOf/0/properties/analysis"
            }
          },
          {
            "type": "Control",
            "scope": {
              "$ref": "/allOf/0/properties/notes"
            }
          },
          {
            "type": "Control",
            "scope": {
              "$ref": "/allOf/0/properties/confidence"
            }
          }
        ]
      }
    ]
  }
export var GEDCOMX_COUPLEFACT_UISCHEMA: any =
  {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/original"
        },
        "rule": {
          "scope": {
            "$ref": "/allOf/1/properties/type"
          },
          "value": {}
        }
      }
    ]
  }
export var GEDCOMX_PLACEREF_UISCHEMA: any =
  {
    "type": "VerticalLayout",
    "label": "Description",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/original"
        }
      },
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/description"
        },
        "navigateTo": "PlaceDetail",
        "dataService": "DataProviderService",
        "create": "createPlace",
        "select": "getPlaces",
        "get": "getPlace",
        "linkName": {
          "$ref": "/names/0/value"
        }
      }
    ]
  }
export var GEDCOMX_SOURCEREF_UISCHEMA: any =
  {
    "type": "VerticalLayout",
    "label": "Description",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/description"
        },
        "navigateTo": "SourceDetail",
        "dataService": "DataProviderService",
        "create": "createSource",
        "select": "getSources",
        "get": "getSource",
        "linkName": {
          "$ref": "/citations/0/value"
        }
      },
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/attribution"
        }
      }
    ]
  }
export var GEDCOMX_ANALYSIS_UISCHEMA: any =
  {
    "type": "VerticalLayout",
    "label": "Analysis",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/resource"
        },
        "navigateTo": "DocumentDetail",
        "dataService": "DataProviderService",
        "create": "createDocument",
        "select": "getDocuments",
        "get": "getDocument",
      }
    ]
  }
export var GEDCOMX_AGENT_UISCHEMA: any =
  {
    "type": "VerticalLayout",
    "label": "Analysis",
    "elements": [
      {
        "type": "Control",
        "scope": {
          "$ref": "/properties/resource"
        },
        "navigateTo": "AgentDetail",
        "dataService": "DataProviderService",
        "create": "createAgent",
        "select": "getAgents",
        "get": "getAgent",
        "linkName": {
          "$ref": "/names/0/value"
        }
      }
    ]
  }
  export var GEDCOMX_PERSONREF_UISCHEMA: any =
    {
      "type": "VerticalLayout",
      "label": "Analysis",
      "elements": [
        {
          "type": "Control",
          "scope": {
            "$ref": "/properties/resource"
          },
          "navigateTo": "PersonDetail",
          "dataService": "DataProviderService",
          "create": "createPerson",
          "select": "getPersons",
          "get": "getPerson",
          "linkName": {
            "$ref": "/names/0/nameForms/0/fullText"
          }
        }
      ]
    }
