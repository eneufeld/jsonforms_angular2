export var GEDCOMX_PERSON_SCHEMA: any =
{
	"$schema": "http://json-schema.org/schema#",

	"definitions": {
		"uri": {
			"type": "string"
		},
		"localeTag": {
			"type": "string",

		},
		"resourceReference": {
			"type": "object",
			"properties": {
				"resource": {"$ref": "#/definitions/uri"}
			},
			"required": []
		},
		"identifier": {
			"type": "object",
			"properties": {
      },
			"required": []
		},
    "attribution": {
			"type": "object",
			"properties": {
				"contributor": {"$ref": "#/definitions/resourceReference"},
				"modified":{"type":"integer"},
				"changeMessage":{"type":"string"}
			},
			"required": []
		},
		"note": {
			"type": "object",
			"properties": {
				"lang":{"$ref": "#/definitions/localeTag"},
				"subject":{"type":"string"},
				"text":{"type":"string"},
				"attribution": {"$ref": "#/definitions/attribution"}
			},
			"required": ["text"]
		},
		"sourceReference": {
			"type": "object",
			"properties": {
				"description": {"$ref": "#/definitions/uri"},
				"attribution": {"$ref": "#/definitions/attribution"}
			},
			"required": ["description"]
		},
		"evidenceReference": {
			"type": "object",
			"properties": {
				"resource": {"$ref": "#/definitions/uri"},
				"attribution": {"$ref": "#/definitions/attribution"}
			},
			"required": ["resource"]
		},
    "conclusion": {
			"type": "object",
			"properties": {
        "id":{"type": "string"},
        "lang":{"$ref": "#/definitions/localeTag"},
        "sources": {
					"type": "array",
					"items": {"$ref": "#/definitions/sourceReference"}
				},
        "analysis": {"$ref": "#/definitions/resourceReference"},
        "notes": {
          "type": "array",
					"items": {"$ref": "#/definitions/note"}
        },
        "confidence": {"$ref": "#/definitions/uri"}
      },
			"required": []
		},
    "subject": {
      "allOf": [
        { "$ref": "#/definitions/conclusion" },
        {
          "properties":{
            "extracted":{"type":"boolean"},
            "evidence":{
              "type": "array",
    					"items": {"$ref": "#/definitions/evidenceReference"}
            },
            "media": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/sourceReference"}
    				},
            "identifiers": {"$ref": "#/definitions/identifier"},
            "attribution": {"$ref": "#/definitions/attribution"}
          },
          "required": []
        }
      ]
		},
		"gender": {
      "allOf": [
        { "$ref": "#/definitions/conclusion" },
        { "properties":{
            "type": {"$ref": "#/definitions/uri"}
          },
          "required": ["type"]
        }
      ]
		},
		"date": {
			"type": "object",
			"properties": {
				"original": {"type": "string"},
				"formal": {
					"type": "string",
					"pattern": "^(A?[\\+-]\\d{4}(-\\d{2})?(-\\d{2})?T?(\\d{2})?(:\\d{2})?(:\\d{2})?([\\+-]\\d{2}(:\\d{2})?|Z)?)|(P(\\d{0,4}Y)?(\\d{0,4}M)?(\\d{0,4}D)?(T(\\d{0,4}H)?(\\d{0,4}M)?(\\d{0,4}S)?)?)$"
				}
			},
			"required": []
		},
		"qualifier": {
			"type": "object",
			"properties": {
        "name":{"$ref": "#/definitions/uri"},
        "value":{"type":"string"}
      },
			"required": ["name"]
		},
    "name": {
      "allOf": [
        { "$ref": "#/definitions/conclusion" },
        {
          "properties":{
            "type": {"$ref": "#/definitions/uri"},
            "date": {"$ref": "#/definitions/date"},
            "nameForms": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "lang": {"$ref": "#/definitions/localeTag"},
                  "fullText": {"type":"string"},
                  "parts": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {"$ref": "#/definitions/uri"},
                        "value": {"type":"string"},
                        "qualifiers": {
                          "type": "array",
                          "items": {"$ref": "#/definitions/qualifier"}
                        }
                      },
                      "required": ["value"]
                    }
                  }
                }
              }
            }
          },
          "required": ["nameForms"]
        }
      ]
		},
    "fact": {
      "allOf": [
        { "$ref": "#/definitions/conclusion" },
        { "properties":{
            "type": {"$ref": "#/definitions/uri"},
            "date": {"$ref": "#/definitions/date"},
            "place": {"$ref": "#/definitions/placeReference"},
            "value": {"type":"string"},
            "qualifiers": {
              "type": "array",
              "items": {"$ref": "#/definitions/qualifier"}
            }
          },
          "required": ["type"]
        }
      ]
		},
		"placeReference": {
			"type": "object",
			"properties": {
				"original": {"type":"string"},
				"description": {"$ref": "#/definitions/uri"}
			},
			"required": []
		}
	},

	"allOf": [
		{ "$ref": "#/definitions/subject" },
		{
			"properties":{
				"private": {"type": "boolean"},
				"gender": {"$ref": "#/definitions/gender"},
				"names": {
					"type": "array",
					"items": {"$ref": "#/definitions/name"}
				},
				"facts": {
					"type": "array",
					"items": {"$ref": "#/definitions/fact"}
				}
			},
			"required": []
		}
	]
}

export var GEDCOMX_PERSON_UISCHEMA: any =
{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": {
        "$ref": "#/allOf/1/properties/private"
      }
    },
    {
      "type": "GroupLayout",
      "label": "Gender",
      "elements": [
        {
          "type": "Control",
          "scope": {
            "$ref": "#/allOf/1/properties/gender"
          }
        }
      ]
    },
    {
      "type": "Control",
      "scope": {
        "$ref": "#/allOf/1/properties/names"
      }
    },
    {
      "type": "Control",
      "scope": {
        "$ref": "#/allOf/1/properties/facts"
      }
    }
  ]
}

export var GEDCOMX_GENDER_UISCHEMA: any =
{
	"type": "Control",
    "scope": {
  	"$ref": "/allOf/1/properties/type"
    }
}

export var GEDCOMX_PERSON_DATA: any =
{
	"names": [
		{
			"nameForms": [
				{
					"fullText": "George Washington",
					"parts": [
						{
							"value": "George",
							"type": "http://gedcomx.org/Given"
						},
						{
							"value": "Washington",
							"type": "http://gedcomx.org/Surname"
						}
					]
				}
			],
			"id": "789"
		}
	],
	"gender": {
		"type": "http://gedcomx.org/Male",
		"id":"gender_id_1",
		"lang":"de"
	},
	"facts": [
		{
			"type": "http://gedcomx.org/Birth",
			"date": {
				"original": "February 22, 1732",
				"formal": "+1732-02-22"
			},
			"place": {
				"original": "pope's creek, westmoreland, virginia, united states",
				"description": "#888"
			},
			"id": "123"
		},
		{
			"type": "http://gedcomx.org/Death",
			"date": {
				"original": "December 14, 1799",
				"formal": "+1799-12-14T22:00:00"
			},
			"place": {
				"original": "mount vernon, fairfax county, virginia, united states",
				"description": "#999"
			},
			"id": "456"
		}
	],
	"sources": [
		{
			"description": "#EEE-EEEE"
		}
	],
	"id": "BBB-BBBB"
}
