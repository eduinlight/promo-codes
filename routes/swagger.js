module.exports = {
  swagger: "2.0",
  info: {
    title: "SafeBoda Promo Codes API",
    description: "SafeBoda want to give out promo codes worth x amount during events so people can get free rides to and from the event. The flaw with that is people can use the promo codes without going for the event.",
    version: "1.0",
    contact: {
      email: "eduinlight@gmail.com"
    }
  },
  produces: ["application/json"],
  host: "http://localhost:9000",
  basePath: "",
  schemes: ["https","http"],
  tags: [
    {
      name: "codes",
      description: "Everything about codes",
    },
    {
      name: "config",
      description: "Everything about configuration",
    },
    {
      name: "users",
      description: "Everything about users",
    },
    {
      name: "events",
      description: "Everything about events",
    },
  ],
  paths: {
    "/codes": {
      get: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "getCodes",
        description: "get all codes",
        parameters: [
          {
            "name": "active",
            "in": "query",
            "description": "filter with active parameter",
            "required": false,
            "type": "boolean",
          }
        ],
        "responses": {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                status: {type: "integer"},
                data: {
                  type: "array",
                  items: {
                    "$ref": "#/definitions/Code"
                  }
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
        },
      }
    },
    "/codes/generate": {
      post: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "postGenerate",
        description: "generate a promo code for an event",
        parameters: [
          {
            in: "body",
            name: "event_id",
            type: "string",
            required: true,
          }
        ],
        responses: {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                status: {type: "integer"},
                data: {
                  "$ref": "#/definitions/Code"
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
          "404": {
            "description": "not found",
            schema: {
              "$ref": "#/definitions/ResponseNotFound"
            }
          }
        },
      }
    },
    "/codes/:code_id": {
      put: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "putRadius",
        description: "update a code radius",
        parameters: [
          {
            name: "code_id",
            in: "path",
            required: true,
            type: "number",
          },
          {
            name: "radius",
            in: "body",
            type: "number",
            required: true,
          }
        ],
        responses: {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                status: {type: "integer"},
                data: {
                  "$ref": "#/definitions/Code"
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
          "404": {
            "description": "not found",
            schema: {
              "$ref": "#/definitions/ResponseNotFound"
            }
          }
        },
      }
    },
    "/codes/deactivate/:code_id": {
      put: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "putDeactivate",
        description: "deactivate a code",
        parameters: [
          {
            name: "code_id",
            in: "path",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                status: {type: "integer"},
                data: {
                  "$ref": "#/definitions/Code"
                }
              }
            }
          },
          "404": {
            "description": "not found",
            schema: {
              "$ref": "#/definitions/ResponseNotFound"
            }
          }
        },
      }
    },
    "/codes/pickup": {
      post: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "postPickup",
        description: "handle when user pickup a code to start using it.",
        parameters: [
          {
            in: "body",
            type: "object",
            required: true,
            properties: {
              code_id: {
                type: "string",
                required: true,
              },
              user_id: {
                type: "string",
                required: true,
              },
            }
          }
        ],
        responses: {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                success: {
                  type: "boolean"
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
          "404": {
            "description": "not found",
            schema: {
              "$ref": "#/definitions/ResponseNotFound"
            }
          }
        },
      }
    },
    "/codes/ride": {
      post: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "postRide",
        description: "handle an user ride from origin to destination using a code.",
        parameters: [
          {
            in: "body",
            type: "object",
            required: true,
            properties: {
              code_id: {
                type: "string",
                required: true,
              },
              user_id: {
                type: "string",
                required: true,
              },
              origin_latitude: {
                type: "number",
                required: true,
              },
              origin_longitude: {
                type: "number",
                required: true,
              },
              destination_latitude: {
                type: "number",
                required: true,
              },
              destination_longitude: {
                type: "number",
                required: true,
              }
            }
          }
        ],
        responses: {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                status: {type: "integer"},
                data: {
                  type: "object",
                  properties: {
                    valid: {type: "boolean"},
                    polyline: {
                      type: "array",
                      items: {
                        "$ref": "#/definitions/Location"
                      }
                    }
                  },
                  message:{
                    type: "string",
                    required: false,
                  }
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
          "404": {
            "description": "not found",
            schema: {
              "$ref": "#/definitions/ResponseNotFound"
            }
          }
        },
      }
    },
    "/codes/validate/ride": {
      post: {
        tags: ["codes"],
        "x-swagger-router-controller": "Codes",
        operationId: "postValidateRide",
        description: "validate if an user can do a ride with a code.",
        parameters: [
          {
            in: "body",
            type: "object",
            required: true,
            properties: {
              code_id: {
                type: "string",
                required: true,
              },
              user_id: {
                type: "string",
                required: true,
              },
              origin_latitude: {
                type: "number",
                required: true,
              },
              origin_longitude: {
                type: "number",
                required: true,
              },
              destination_latitude: {
                type: "number",
                required: true,
              },
              destination_longitude: {
                type: "number",
                required: true,
              }
            }
          }
        ],
        responses: {
          "200": {
            "description": "success",
            "schema": {
              type: "object",
              properties: {
                status: {type: "integer"},
                data: {
                  type: "object",
                  properties: {
                    valid: {type: "boolean"},
                    polyline: {
                      type: "array",
                      items: {
                        "$ref": "#/definitions/Location"
                      }
                    }
                  },
                  message:{
                    type: "string",
                    required: false,
                  }
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
          "404": {
            "description": "not found",
            schema: {
              "$ref": "#/definitions/ResponseNotFound"
            }
          }
        },
      }
    },
    "/users": {
      get: {
        tags: ["users"],
        "x-swagger-router-controller": "Users",
        operationId: "getUsers",
        description: "get all users.",
        parameters: [
          
        ],
        responses: {
          "200": {
            description: "success",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                },
                data: {
                  type: "array",
                  items:{
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          },
          "404": {
            "description": "success",
            message: "the event do not exist",
          }
        },
      }
    },
    "/events": {
      get: {
        tags: ["events"],
        "x-swagger-router-controller": "Events",
        operationId: "getEvents",
        description: "get all events.",
        parameters: [
          
        ],
        responses: {
          "200": {
            description: "success",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                },
                data: {
                  type: "array",
                  items:{
                    "$ref": "#/definitions/Event"
                  }
                }
              }
            }
          },
        },
      }
    },
    "/config": {
      get: {
        tags: ["config"],
        "x-swagger-router-controller": "Config",
        operationId: "getConfig",
        description: "get default configuration data.",
        parameters: [
        ],
        responses: {
          "200": {
            description: "success",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                },
                data: {
                  type: "array",
                  items:{
                    "$ref": "#/definitions/Config"
                  }
                }
              }
            }
          },
        },
      },
      put: {
        tags: ["config"],
        "x-swagger-router-controller": "Config",
        operationId: "putConfig",
        description: "edit default configuration data.",
        parameters: [
          {
            in: "body",
            type: "object",
            properties: {
              promo_code_radius: {
                type: "number",
                required: false,
              },
              promo_code_duration: {
                type: "integer",
                required: false,
                min: 1,
              },
              promo_code_max_rides: {
                type: "integer",
                required: false,
                min: 1,
              },
            }
          }
        ],
        responses: {
          "200": {
            description: "success",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                },
                data: {
                  "$ref": "#/definitions/Config"
                }
              }
            }
          },
          "400": {
            description: "data errors",
            schema: {
              "$ref": "#/definitions/ResponseDataErrors"
            }
          },
        },
      }
    }
  },
  definitions: {
    Code: {
      type: "object",
      properties: {
        id: {type: "string"},
        max_rides: {type: "integer"},
        radius: {type: "number"},
        duration: {type: "integer"},
        active: {type: "boolean"},
        expire_date: {type: "string", format: "date-time"},
        created_at: {type: "string", format: "date-time"},
        updated_at: {type: "string", format: "date-time"},
        event_id: {type: "string"},
        event: {
          required: false,
          "$ref": "#/definitions/Event"
        }
      }
    },
    Config:{
      type: "object",
      properties: {
        promo_code_radius: {
          type: "number",
          required: false,
        },
        promo_code_max_rides: {
          type: "integer",
          required: false,
        },
        promo_code_duration: {
          type: "integer",
          required: false,
        },
      }
    },
    Event: {
      type: "object",
      properties: {
        id: {type: "string"},
      }
    },
    User: {
      type: "object",
      properties: {
        id: {type: "string"},
      }
    },
    Location: {
      type: "object",
      properties: {
        latitude: {type: "number"},
        longitude: {type: "number"},
      }
    },
    ResponseDataErrors: {
      type: "object",
      properties: {
        status: {type: "integer"},
        message: {type: "string"},
        errors: {type: "object"}
      }
    },
    ResponseNotFound: {
      type: "object",
      properties: {
        status: {type: "integer"},
        message: {type: "string"},
      }
    }
  }
}



