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
            "in": "path",
            "description": "Filter for active parameter",
            "required": false,
            "type": "boolean",
          }
        ],
        "responses": {
          "200": {
            
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
            name: "event_id",
            in: "body",
            required: true,
            type: "string",
          }
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
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
            name: "radius",
            in: "body",
            required: true,
            type: "double",
          }
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
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
          
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
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
          
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
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
          
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
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
          
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
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
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
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
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
          }
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
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
          }
        },
      },
      put: {
        tags: ["config"],
        "x-swagger-router-controller": "Config",
        operationId: "putConfig",
        description: "edit default configuration data.",
        parameters: [

        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "404": {
            "description": "successful operation",
            message: "the event do not exist",
          }
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
        radius: {type: "double"},
        duration: {type: "integer"},
        active: {type: "boolean"},
        expire_date: {type: "date-time"},
        created_at: {type: "date-time"},
        updated_at: {type: "date-time"},
        event_id: {type: "date-time"},
        event: {
          required: false,
          "$ref": "#/definitions/Event"
        }
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
    ResponseDataErrors: {
      type: "object",
      properties: {
        status: 400,
        message: {type: "string"},
        errors: {
          type: "object",
        }
      }
    },
    ResponseNotFound: {
      type: "object",
      properties: {
        status: 404,
        message: {type: "string"},
      }
    }
  }
}



