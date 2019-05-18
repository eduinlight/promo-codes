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
            "name": "tags",
            "in": "query",
            "description": "Tags to filter by",
            "required": true,
            "type": "array",
            "items": {
              "type": "string"
            },
            "collectionFormat": "multi"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "400": {
            "description": "Invalid tag value"
          }
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
    }
  },
  definitions: {
    Order: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64",
        }
      }
    }
  }
}



