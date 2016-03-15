export var GEDCOMX_PERSON_SCHEMA: any =
    {
        "$schema": "http://json-schema.org/schema#",

        "definitions": {
            "genderTypes": {
                "enum": [
                    "http://gedcomx.org/Male",
                    "http://gedcomx.org/Female",
                    "http://gedcomx.org/Unknown"
                ]
            },
            "nameTypes": {
                "enum": [
                    "http://gedcomx.org/BirthName",
                    "http://gedcomx.org/MarriedName",
                    "http://gedcomx.org/AlsoKnownAs",
                    "http://gedcomx.org/Nickname",
                    "http://gedcomx.org/AdoptiveName",
                    "http://gedcomx.org/FormalName",
                    "http://gedcomx.org/ReligiousName"
                ]
            },
            "namePartTypes": {
                "enum": [
                    "http://gedcomx.org/Prefix",
                    "http://gedcomx.org/Suffix",
                    "http://gedcomx.org/Given",
                    "http://gedcomx.org/Surname"
                ]
            },
            "personFactTypes": {
                "enum": [
                    "http://gedcomx.org/Adoption",
                    "http://gedcomx.org/AdultChristening",
                    "http://gedcomx.org/Amnesty",
                    "http://gedcomx.org/Apprenticeship",
                    "http://gedcomx.org/Arrest",
                    "http://gedcomx.org/Baptism",
                    "http://gedcomx.org/BarMitzvah",
                    "http://gedcomx.org/BatMitzvah",
                    "http://gedcomx.org/Birth",
                    "http://gedcomx.org/Blessing",
                    "http://gedcomx.org/Burial",
                    "http://gedcomx.org/Caste",
                    "http://gedcomx.org/Census",
                    "http://gedcomx.org/Christening",
                    "http://gedcomx.org/Circumcision",
                    "http://gedcomx.org/Clan",
                    "http://gedcomx.org/Confirmation",
                    "http://gedcomx.org/Cremation",
                    "http://gedcomx.org/Death",
                    "http://gedcomx.org/Education",
                    "http://gedcomx.org/Emigration",
                    "http://gedcomx.org/Ethnicity",
                    "http://gedcomx.org/Excommunication",
                    "http://gedcomx.org/FirstCommunion",
                    "http://gedcomx.org/Funeral",
                    "http://gedcomx.org/GenderChange",
                    "http://gedcomx.org/Heimat",
                    "http://gedcomx.org/Immigration",
                    "http://gedcomx.org/Imprisonment",
                    "http://gedcomx.org/LandTransaction",
                    "http://gedcomx.org/Language",
                    "http://gedcomx.org/Living",
                    "http://gedcomx.org/MaritalStatus",
                    "http://gedcomx.org/Medical",
                    "http://gedcomx.org/MilitaryAward",
                    "http://gedcomx.org/MilitaryDischarge",
                    "http://gedcomx.org/MilitaryDraftRegistration",
                    "http://gedcomx.org/MilitaryInduction",
                    "http://gedcomx.org/MilitaryService",
                    "http://gedcomx.org/Mission",
                    "http://gedcomx.org/MoveTo",
                    "http://gedcomx.org/MoveFrom",
                    "http://gedcomx.org/MultipleBirth",
                    "http://gedcomx.org/NationalId",
                    "http://gedcomx.org/Nationality",
                    "http://gedcomx.org/Naturalization",
                    "http://gedcomx.org/NumberOfChildren",
                    "http://gedcomx.org/NumberOfMarriages",
                    "http://gedcomx.org/Occupation",
                    "http://gedcomx.org/Ordination",
                    "http://gedcomx.org/Pardon",
                    "http://gedcomx.org/PhysicalDescription",
                    "http://gedcomx.org/Probate",
                    "http://gedcomx.org/Property",
                    "http://gedcomx.org/Religion",
                    "http://gedcomx.org/Residence",
                    "http://gedcomx.org/Retirement",
                    "http://gedcomx.org/Stillbirth",
                    "http://gedcomx.org/Will",
                    "http://gedcomx.org/Visit",
                    "http://gedcomx.org/Yahrzeit"
                ]
            },
            "uri": {
                "type": "string"
            },
            "localeTag": {
                "type": "string"
            },
            "resourceReference": {
                "type": "object",
                "properties": {
                    "resource": { "$ref": "#/definitions/uri" }
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
                    "contributor": { "$ref": "#/definitions/resourceReference" },
                    "modified": { "type": "integer" },
                    "changeMessage": { "type": "string" }
                },
                "required": []
            },
            "note": {
                "type": "object",
                "properties": {
                    "lang": { "$ref": "#/definitions/localeTag" },
                    "subject": { "type": "string" },
                    "text": { "type": "string" },
                    "attribution": { "$ref": "#/definitions/attribution" }
                },
                "required": ["text"]
            },
            "textValue": {
                "type": "object",
                "properties": {
                    "lang": { "$ref": "#/definitions/localeTag" },
                    "value": { "type": "string" }
                },
                "required": ["value"]
            },
            "sourceCitation": {
    			"type": "object",
    			"properties": {
    				"lang":{"$ref": "#/definitions/localeTag"},
    				"textType":{"type":"string"},
    				"value":{"type":"string"}
    			},
    			"required": ["value"]
    		},
            "sourceReference": {
                "type": "object",
                "properties": {
                    "description": { "$ref": "#/definitions/uri" },
                    "attribution": { "$ref": "#/definitions/attribution" }
                },
                "required": ["description"]
            },
            "evidenceReference": {
                "type": "object",
                "properties": {
                    "resource": { "$ref": "#/definitions/uri" },
                    "attribution": { "$ref": "#/definitions/attribution" }
                },
                "required": ["resource"]
            },
            "conclusion": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "lang": { "$ref": "#/definitions/localeTag" },
                    "sources": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/sourceReference" }
                    },
                    "analysis": { "$ref": "#/definitions/resourceReference" },
                    "notes": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/note" }
                    },
                    "confidence": { "$ref": "#/definitions/uri" }
                },
                "required": []
            },
            "subject": {
                "allOf": [
                    { "$ref": "#/definitions/conclusion" },
                    {
                        "properties": {
                            "extracted": { "type": "boolean" },
                            "evidence": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/evidenceReference" }
                            },
                            "media": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/sourceReference" }
                            },
                            "identifiers": { "$ref": "#/definitions/identifier" },
                            "attribution": { "$ref": "#/definitions/attribution" }
                        },
                        "required": []
                    }
                ]
            },
            "gender": {
                "allOf": [
                    { "$ref": "#/definitions/conclusion" },
                    {
                        "properties": {
                            "type": {
                                "anyOf": [
                                    { "$ref": "#/definitions/uri" },
                                    { "$ref": "#/definitions/genderTypes" }
                                ]
                            }
                        },
                        "required": ["type"]
                    }
                ]
            },
            "date": {
                "type": "object",
                "properties": {
                    "original": { "type": "string" },
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
                    "name": { "$ref": "#/definitions/uri" },
                    "value": { "type": "string" }
                },
                "required": ["name"]
            },
            "name": {
                "allOf": [
                    { "$ref": "#/definitions/conclusion" },
                    {
                        "properties": {
                            "type": {
                                "anyOf": [
                                    { "$ref": "#/definitions/uri" },
                                    { "$ref": "#/definitions/nameTypes" }
                                ]
                            },
                            "date": { "$ref": "#/definitions/date" },
                            "nameForms": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "lang": { "$ref": "#/definitions/localeTag" },
                                        "fullText": { "type": "string" },
                                        "parts": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "type": {
                                                        "anyOf": [
                                                            { "$ref": "#/definitions/uri" },
                                                            { "$ref": "#/definitions/namePartTypes" }
                                                        ]
                                                    },
                                                    "value": { "type": "string" },
                                                    "qualifiers": {
                                                        "type": "array",
                                                        "items": { "$ref": "#/definitions/qualifier" }
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
                    {
                        "properties": {
                            "type": {
                                "anyOf": [
                                    { "$ref": "#/definitions/uri" },
                                    { "$ref": "#/definitions/personFactTypes" }
                                ]
                            },
                            "date": { "$ref": "#/definitions/date" },
                            "place": { "$ref": "#/definitions/placeReference" },
                            "value": { "type": "string" },
                            "qualifiers": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/qualifier" }
                            }
                        },
                        "required": ["type"]
                    }
                ]
            },
            "placeReference": {
                "type": "object",
                "properties": {
                    "original": { "type": "string" },
                    "description": { "$ref": "#/definitions/uri" }
                },
                "required": []
            },
            "person": {
                "allOf": [
                    { "$ref": "#/definitions/subject" },
                    {
                        "type": "object",
                        "properties": {
                            "private": { "type": "boolean" },
                            "gender": { "$ref": "#/definitions/gender" },
                            "names": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/name" }
                            },
                            "facts": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/fact" }
                            }
                        },
                        "required": []
                    }
                ]
            },
            "placeDescription": {
                "allOf": [
                    { "$ref": "#/definitions/subject" },
                    {
                        "properties": {
                            "names": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/textValue" }
                            },
                            "type": { "$ref": "#/definitions/uri" },
                            "place": { "$ref": "#/definitions/resourceReference" },
                            "jurisdiction": { "$ref": "#/definitions/resourceReference" },
                            "latitude": { "type": "number" },
                            "longitude": { "type": "number" },
                            "temporalDescription": { "$ref": "#/definitions/date" },
                            "spatialDescription": { "$ref": "#/definitions/resourceReference" }
                        },
                        "required": ["names"]
                    }
                ]
            },

            "sourceDescription": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "resourceType": { "$ref": "#/definitions/uri" },
                    "citations": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/sourceCitation" }
                    },
                    "mediaType": { "type": "string" },
                    "about": { "$ref": "#/definitions/uri" },
                    "mediator": { "$ref": "#/definitions/resourceReference" },
                    "sources": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/sourceReference" }
                    },
                    "analysis": { "$ref": "#/definitions/resourceReference" },
                    "componentOf": { "$ref": "#/definitions/sourceReference" },
                    "titles": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/textValue" }
                    },
                    "notes": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/note" }
                    },
                    "attribution": { "$ref": "#/definitions/attribution" },
                    "rights": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/resourceReference" }
                    },
                    "coverage": { "$ref": "#/definitions/coverage" },
                    "descriptions": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/textValue" }
                    },
                    "identifiers": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/identifier" }
                    },
                    "created": { "type": "integer" },
                    "modified": { "type": "integer" },
                    "repository": { "$ref": "#/definitions/resourceReference" }
                },
                "required": ["citations"]
            }
        },

        "type": "object",
        "properties": {
            "persons": {
                "type": "array",
                "items": { "$ref": "#/definitions/person" }
            },
            "places": {
                "type": "array",
                "items": { "$ref": "#/definitions/placeDescription" }
            },
            "sourceDescriptions": {
                "type": "array",
                "items": { "$ref": "#/definitions/sourceDescription" }
            },
        }

    }

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
                "dataService":"DataProviderService",
                "create":"createPlace",
                "select":"getPlaces"
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
                "dataService":"DataProviderService",
                "create":"createSource",
                "select":"getSources"
            },
            {
                "type": "Control",
                "scope": {
                    "$ref": "/properties/attribution"
                }
            }
        ]
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
            "id": "gender_id_1",
            "lang": "de"
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
export var GEDCOMX_PERSON_DATA2: any =
    {
        "names": [{
            "nameForms": [{
                "fullText": "Martha Dandridge Custis",
                "parts": [{
                    "value": "Martha Dandridge",
                    "type": "http://gedcomx.org/Given"
                }, {
                        "value": "Custis",
                        "type": "http://gedcomx.org/Surname"
                    }]
            }],
            "id": "987"
        }],
        "gender": {
            "type": "http://gedcomx.org/Female"
        },
        "facts": [{
            "type": "http://gedcomx.org/Birth",
            "date": {
                "original": "June 2, 1731",
                "formal": "+1731-06-02"
            },
            "place": {
                "original": "chestnut grove, new kent, virginia, united states",
                "description": "#KKK"
            },
            "id": "321"
        }, {
                "type": "http://gedcomx.org/Death",
                "date": {
                    "original": "May 22, 1802",
                    "formal": "+1802-05-22"
                },
                "place": {
                    "original": "mount vernon, fairfax county, virginia, united states",
                    "description": "#999"
                },
                "id": "654"
            }],
        "sources": [{
            "description": "#FFF-FFFF"
        }],
        "id": "CCC-CCCC"
    };
export var GEDCOMX_DATA: any = {
    "persons": [GEDCOMX_PERSON_DATA, GEDCOMX_PERSON_DATA2],
    "places": [{
        "names": [{
            "value": "Pope's Creek, Westmoreland, Virginia, United States"
        }],
        "latitude": 38.192353,
        "longitude": -76.904069,
        "id": "888"
    }, {
            "names": [{
                "value": "Mount Vernon, Fairfax County, Virginia, United States"
            }],
            "latitude": 38.721144,
            "longitude": -77.109461,
            "id": "999"
        }, {
            "names": [{
                "value": "Chestnut Grove, New Kent, Virginia, United States"
            }],
            "latitude": 37.518304,
            "longitude": -76.984148,
            "id": "KKK"
        }],
    "sourceDescriptions": [{
        "citations": [{
            "value": "\"George Washington.\" Wikipedia, The Free Encyclopedia. Wikimedia Foundation, Inc. 24 October 2012."
        }],
        "about": "http://en.wikipedia.org/wiki/George_washington",
        "id": "EEE-EEEE"
    }, {
            "citations": [{
                "value": "\"Martha Washington.\" Wikipedia, The Free Encyclopedia. Wikimedia Foundation, Inc. 24 October 2012."
            }],
            "about": "http://en.wikipedia.org/wiki/Martha_washington",
            "id": "FFF-FFFF"
        }]
};
