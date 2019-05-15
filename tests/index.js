const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("codes", () => {
  describe("GET /codes", () => {
    
    it("should get all codes records", (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});