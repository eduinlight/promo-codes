const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')

//including models to get right data
const User = require('../models/user.model');
const Event = require('../models/event.model');
const UserCode = require('../models/user-code.model');
const Code = require('../models/code.model');
const Config = require('../models/config.model');

// Configure chai
chai.use(chaiHttp);
chai.should();

//SET THE ENV IN TEST FOR NO 
process.env.NODE_ENV = 'test';

describe("codes", () => {
  describe("GET /codes", () => {
    //1
    it("should get all codes", (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("status").equal(200)

          res.body.should.have.property("data")
          res.body.data.should.be.a("array")
          res.body.data.forEach(v => {
            v.should.be.a("object")

            v.should.have.property("id")
            v.should.have.property("max_rides")
            v.should.have.property("radius")
            v.should.have.property("duration")
            v.should.have.property("active")
            v.should.have.property("expire_date")
            v.should.have.property("created_at")
            v.should.have.property("updated_at")
            v.should.have.property("event_id")

            v.id.should.be.a("string")
            v.max_rides.should.be.a("number")
            v.radius.should.be.a("number")
            v.duration.should.be.a("number")
            v.active.should.be.a("boolean")
            v.expire_date.should.be.a("string")
            v.created_at.should.be.a("string")
            v.updated_at.should.be.a("string")
            v.event_id.should.be.a("string")
          })

          done();
        });
    });
  });
  describe("GET /codes?active=true", () => {
    //2
    it("should get all active codes", (done) => {
      chai.request(app)
        .get('/codes?active=true')
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("status").equal(200)

          res.body.should.have.property("data")
          res.body.data.should.be.a("array")
          res.body.data.forEach(v => {
            v.should.be.a("object")

            v.should.have.property("id")
            v.should.have.property("max_rides")
            v.should.have.property("radius")
            v.should.have.property("duration")
            v.should.have.property("active")
            v.should.have.property("expire_date")
            v.should.have.property("created_at")
            v.should.have.property("updated_at")
            v.should.have.property("event_id")

            v.id.should.be.a("string")
            v.max_rides.should.be.a("number")
            v.radius.should.be.a("number")
            v.duration.should.be.a("number")
            v.active.should.be.a("boolean").equal(true)
            v.expire_date.should.be.a("string")
            v.created_at.should.be.a("string")
            v.updated_at.should.be.a("string")
            v.event_id.should.be.a("string")
          })

          done();
        });
    });
  });
  describe("POST /codes/generate", () => {
    //3
    it("should get error generating the code because event_id is incorrect", (done) => {

      chai.request(app)
        .post('/codes/generate')
        .send({
          event_id: "wrong",
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object")

          res.body.should.have.property("status").equal(404)
          res.body.should.have.property("message").equal("the event do not exist")

          done();
      });
    })
  });
  describe("PUT /codes/:code_id", () => {
    //4
    it("should get data error because radius data is undefined", (done) => {
      //get a valid code_id
      Code.findOne().then(code => {
        chai.request(app)
          .put(`/codes/${code.id}`)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object")
  
            res.body.should.have.property("status").equal(400)
            res.body.should.have.property("message").equal("Data errors")

            res.body.should.have.property("errors")
            res.body.errors.should.be.a("object")

            res.body.errors.should.have.property("radius").equal("required")
  
            done();
          });
      })
    });
  });
  describe("PUT /codes/deactivate/:code_id", () => {
    //5
    it("should get the code with the active parameter true", (done) => {
      //find an code with the active attribute in true
      Code.findOne().then(code => {
        //change his active attribute to true
        Code.update({active: true}, {where: {id: code.id}}).then(res => {

          chai.request(app)
            .put(`/codes/deactivate/${code.id}`)
            .end((err, res) => {
              res.should.have.status(200);
  
              res.body.should.have.property("status").equal(200)
  
              res.body.should.have.property("data")
              res.body.data.should.be.a("object")
  
              res.body.data.should.have.property("id")
              res.body.data.should.have.property("max_rides")
              res.body.data.should.have.property("radius")
              res.body.data.should.have.property("duration")
              res.body.data.should.have.property("active")
              res.body.data.should.have.property("expire_date")
              res.body.data.should.have.property("created_at")
              res.body.data.should.have.property("updated_at")
              res.body.data.should.have.property("event_id")
  
              res.body.data.id.should.be.a("string")
              res.body.data.max_rides.should.be.a("number")
              res.body.data.radius.should.be.a("number")
              res.body.data.duration.should.be.a("number")
              res.body.data.active.should.be.a("boolean").equal(false)
              res.body.data.expire_date.should.be.a("string")
              res.body.data.created_at.should.be.a("string")
              res.body.data.updated_at.should.be.a("string")
              res.body.data.event_id.should.be.a("string")
              
              done();
            });
        })
      })
    });
  });
});

describe("users", () => {
  describe("GET /users", () => {
    //9
    it("should get all users", (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").equal(200)
          res.body.should.have.property("data")
          res.body.data.should.be.a("array")
          done();
        });
    });
  });
})

describe("events", () => {
  describe("GET /events", () => {
    //10
    it("should get all events", (done) => {
      chai.request(app)
        .get('/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").equal(200)
          res.body.should.have.property("data")
          res.body.data.should.be.a("array")
          res.body.data.forEach(v => {
            v.should.be.a("object")
            v.should.have.property("id")
            v.id.should.be.a("string")
          })
          done();
        });
    });
  });
})

describe("config", () => {
  describe("GET /config", () => {
    //11
    it("should get the configuration", (done) => {
      chai.request(app)
        .get('/config')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data")
          res.body.data.should.be.a("object")
          res.body.data.should.have.property("id")
          res.body.data.should.have.property("promo_code_max_rides")
          res.body.data.should.have.property("promo_code_radius")
          res.body.data.should.have.property("promo_code_duration")
          res.body.data.id.should.be.a("string")
          res.body.data.promo_code_max_rides.should.be.a("number")
          res.body.data.promo_code_radius.should.be.a("number")
          res.body.data.promo_code_duration.should.be.a("number")
          done();
      });
    });
  })

  describe("PUT /config", () => {
    //12
    it("should edit the configuration table", (done) => {
       Config.findOne().then(config => {
        const new_config = JSON.parse(JSON.stringify(config))
        new_config.promo_code_radius = config.promo_code_radius+1 //now the radius is in 50km
  
        chai.request(app)
          .put('/config')
          .send(new_config)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("data")
            res.body.data.should.be.a("object")
            res.body.data.should.have.property("id")
            res.body.data.should.have.property("promo_code_max_rides")
            res.body.data.should.have.property("promo_code_radius")
            res.body.data.should.have.property("promo_code_duration")
            res.body.data.id.should.be.a("string")
            res.body.data.promo_code_max_rides.should.be.a("number")
            res.body.data.promo_code_duration.should.be.a("number")
            
            //let's see if it change
            res.body.data.promo_code_radius.should.be.a("number").equal(new_config.promo_code_radius)
            done();
          });
      });
    })
  });
})