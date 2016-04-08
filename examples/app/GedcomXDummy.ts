export var GEDCOMX_SCHEMA: any =
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
            "coupleFactTypes": {
                "enum": [
                    "http://gedcomx.org/Annulment",
                    "http://gedcomx.org/CommonLawMarriage",
                    "http://gedcomx.org/CivilUnion",
                    "http://gedcomx.org/DomesticPartnership",
                    "http://gedcomx.org/Divorce",
                    "http://gedcomx.org/DivorceFiling",
                    "http://gedcomx.org/Engagement",
                    "http://gedcomx.org/Marriage",
                    "http://gedcomx.org/MarriageBanns",
                    "http://gedcomx.org/MarriageContract",
                    "http://gedcomx.org/MarriageLicense",
                    "http://gedcomx.org/MarriageNotice",
                    "http://gedcomx.org/NumberOfChildren",
                    "http://gedcomx.org/Separation"
                ]
            },
            "parentChildFactTypes": {
                "enum": [
                    "http://gedcomx.org/AdoptiveParent",
                    "http://gedcomx.org/BiologicalParent",
                    "http://gedcomx.org/FosterParent",
                    "http://gedcomx.org/GuardianParent",
                    "http://gedcomx.org/StepParent",
                    "http://gedcomx.org/SociologicalParent",
                    "http://gedcomx.org/SurrogateParent"
                ]
            },
            "eventTypes":{
                "enum":[
                    "http://gedcomx.org/Adoption",
                    "http://gedcomx.org/AdultChristening",
                    "http://gedcomx.org/Annulment",
                    "http://gedcomx.org/Baptism",
                    "http://gedcomx.org/BarMitzvah",
                    "http://gedcomx.org/BatMitzvah",
                    "http://gedcomx.org/Birth",
                    "http://gedcomx.org/Blessing",
                    "http://gedcomx.org/Burial",
                    "http://gedcomx.org/Census",
                    "http://gedcomx.org/Christening",
                    "http://gedcomx.org/Circumcision",
                    "http://gedcomx.org/Confirmation",
                    "http://gedcomx.org/Cremation",
                    "http://gedcomx.org/Death",
                    "http://gedcomx.org/Divorce",
                    "http://gedcomx.org/DivorceFiling",
                    "http://gedcomx.org/Education",
                    "http://gedcomx.org/Engagement",
                    "http://gedcomx.org/Emigration",
                    "http://gedcomx.org/Excommunication",
                    "http://gedcomx.org/FirstCommunion",
                    "http://gedcomx.org/Funeral",
                    "http://gedcomx.org/Immigration",
                    "http://gedcomx.org/LandTransaction",
                    "http://gedcomx.org/Marriage",
                    "http://gedcomx.org/MilitaryAward",
                    "http://gedcomx.org/MilitaryDischarge",
                    "http://gedcomx.org/Mission",
                    "http://gedcomx.org/MoveFrom",
                    "http://gedcomx.org/MoveTo",
                    "http://gedcomx.org/Naturalization",
                    "http://gedcomx.org/Ordination",
                    "http://gedcomx.org/Retirement"
                ]
            },
            "eventRoleTypes":{
    			"enum":[
    				"http://gedcomx.org/Principal",
    				"http://gedcomx.org/Participant",
    				"http://gedcomx.org/Official",
    				"http://gedcomx.org/Witness"
    			]
    		},
            "uri": {
                "type": "string",
                "pattern":"^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"
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
                    "changeMessage": { "type": "string" },
                    "creator": { "$ref": "#/definitions/resourceReference" },
                    "created": { "type": "integer" }
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
            "onlineAccount": {
    			"type": "object",
    			"properties": {
    				"serviceHomepage": {"$ref": "#/definitions/resourceReference"},
    				"accountName":{"type":"string"}
    			},
    			"required": ["serviceHomepage","accountName"]
    		},
            "address": {
    			"type": "object",
    			"properties": {
    				"value": {"type": "string"},
    				"city": {"type": "string"},
    				"country": {"type": "string"},
    				"postalCode": {"type": "string"},
    				"stateOrProvince": {"type": "string"},
    				"street": {"type": "string"},
    				"street2": {"type": "string"},
    				"street3": {"type": "string"},
    				"street4": {"type": "string"},
    				"street5": {"type": "string"},
    				"street6": {"type": "string"}
    			},
    			"required": []
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
                    "confidence": {
                        "anyOf":[
                            {"$ref": "#/definitions/uri"},
                            {"enum":[
                                "http://gedcomx.org/High",
                                "http://gedcomx.org/Medium",
                                "http://gedcomx.org/Low"
                                ]
                            }
                        ]
                         }
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
            "factBase":{
                "allOf": [
                    { "$ref": "#/definitions/conclusion" },
                    {
                        "properties": {

                            "date": { "$ref": "#/definitions/date" },
                            "place": { "$ref": "#/definitions/placeReference" },
                            "value": { "type": "string" },
                            "qualifiers": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/qualifier" }
                            }
                        },
                        "required": []
                    }
                ]
            },
            "factPerson": {
                "allOf": [
                    { "$ref": "#/definitions/factBase" },
                    {
                        "properties": {
                            "type": {
                                "anyOf": [
                                    { "$ref": "#/definitions/uri" },
                                    { "$ref": "#/definitions/personFactTypes" }
                                ]
                            },
                        },
                        "required": ["type"]
                    }
                ]
            },
            "factRelationship": {
                "allOf": [
                    { "$ref": "#/definitions/factBase" },
                    {
                        "properties": {
                            "type": {
                                "anyOf": [
                                    { "$ref": "#/definitions/uri" },
                                    { "oneOf":
                                        [
                                        { "$ref": "#/definitions/coupleFactTypes" },
                                        { "$ref": "#/definitions/parentChildFactTypes" }
                                        ]
                                    }
                                ]
                            },
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
            "eventRole": {
    			"allOf": [
    				{ "$ref": "#/definitions/conclusion" },
    				{
    					"properties": {
    						"person": {"$ref": "#/definitions/resourceReference"},
                            "type": {
    							"anyOf":[
    								{"$ref": "#/definitions/uri"},
    								{"$ref": "#/definitions/eventRoleTypes"}
    							]
    						},
    						"details": {"type":"string"}
    					},
    					"required": ["person"]
    				}
    			]
    		},
            "coverage": {
    			"type": "object",
    			"properties": {
    				"spatial": {"$ref": "#/definitions/placeReference"},
    				"temporal": {"$ref": "#/definitions/date"}
    			},
    			"required": []
    		},
            "person": {
                "allOf": [
                    { "$ref": "#/definitions/subject" },
                    {
                        "properties": {
                            "private": { "type": "boolean" },
                            "gender": { "$ref": "#/definitions/gender" },
                            "names": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/name" }
                            },
                            "facts": {
                                "type": "array",
                                "items": { "$ref": "#/definitions/factPerson" }
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
                    "resourceType": {
                        "anyOf":[
                            {"$ref": "#/definitions/uri"},
                            {"enum":[
                                "http://gedcomx.org/Collection",
                                "http://gedcomx.org/PhysicalArtifact",
                                "http://gedcomx.org/DigitalArtifact",
                                "http://gedcomx.org/Record"
                            ]}
                        ]
                    },
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
            },
            "relationship": {
    			"allOf": [
                    { "$ref": "#/definitions/subject" },
                    {
    					"properties": {
    						"type": {
                                "anyOf":[
                                    {"$ref": "#/definitions/uri"},
                                    {"enum":[
                                        "http://gedcomx.org/Couple",
                                        "http://gedcomx.org/ParentChild"
                                    ]}
                                ]
                            },
    						"person1": {"$ref": "#/definitions/resourceReference"},
    						"person2": {"$ref": "#/definitions/resourceReference"},
    						"facts": {
    							"type": "array",
    							"items": {"$ref": "#/definitions/factRelationship"}
    						}
    					},
    					"required": ["person1","person2"]
    				}
    			]
    		},
            "agent": {
    			"type": "object",
    			"properties": {
    				"id": {"type": "string"},
    				"identifiers": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/identifier"}
    				},
    				"names": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/textValue"}
    				},
    				"homepage": {"$ref": "#/definitions/resourceReference"},
    				"openid": {"$ref": "#/definitions/resourceReference"},
    				"accounts": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/onlineAccount"}
    				},
    				"emails": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/resourceReference"}
    				},
    				"phones": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/resourceReference"}
    				},
    				"addresses": {
    					"type": "array",
    					"items": {"$ref": "#/definitions/address"}
    				},
    				"person": {"$ref": "#/definitions/resourceReference"}
    			},
    			"required": []
    		},
            "event": {
    			"allOf": [
            { "$ref": "#/definitions/subject" },
            {
    					"properties": {
    						"type": {
                                "anyOf":[
                                    {"$ref": "#/definitions/uri"},
                                    {"$ref": "#/definitions/eventTypes"}
                                ]
                            },
    						"date": {"$ref": "#/definitions/date"},
    						"place": {"$ref": "#/definitions/placeReference"},
    						"roles": {
    							"type": "array",
    							"items": {"$ref": "#/definitions/eventRole"}
    						}
    					},
    					"required": []
    				}
    			]
    		},
    		"document": {
    			"allOf": [
            { "$ref": "#/definitions/conclusion" },
            {
    					"properties": {
    						"type": {
                                "anyOf":[
                                    {"$ref": "#/definitions/uri"},
                                    {"enum":[
                                        "http://gedcomx.org/Abstract",
                                        "http://gedcomx.org/Transcription",
                                        "http://gedcomx.org/Translation",
                                        "http://gedcomx.org/Analysis"
                                    ]}
                                ]
                            },
    						"extracted": {"type": "boolean"},
    						"textType": {"type": "string"},
    						"text": {"type": "string"},
    						"attribution": {"$ref": "#/definitions/attribution"}
    					},
    					"required": ["text"]
    				}
    			]
    		},
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
            "relationships": {
    			"type": "array",
    			"items": {"$ref": "#/definitions/relationship"}
    		},
            "agents":{
                "type": "array",
    			"items": {"$ref": "#/definitions/agent"}
            },
            "events": {
    			"type": "array",
    			"items": {"$ref": "#/definitions/event"}
    		},
    		"documents": {
    			"type": "array",
    			"items": {"$ref": "#/definitions/document"}
    		},
        "description": {"type": "string"},
        "id": {"type": "string"},
        "lang": {"$ref": "#/definitions/localeTag"},
        "attribution": {"$ref": "#/definitions/attribution"}
        }

    }
