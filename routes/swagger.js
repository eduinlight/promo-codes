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
        operationId: "get",
        description: "get all codes",
        parameters: [
            
        ],
        responses: {

        }
      }
    },
    "/tests": {
      get: {
        tags: [""],
        "x-swagger-router-controller": "Tests",
        operationId: "get",
        description: "this is me testing things",
        parameters: [
            
        ],
        responses: {

        }
      }
    }
  }
}



