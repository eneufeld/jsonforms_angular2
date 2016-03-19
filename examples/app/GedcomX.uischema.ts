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
                    "rule":{
                        "scope": {
                            "$ref": "/allOf/1/properties/type"
                        },
                        "value":{}
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
