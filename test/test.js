require('dotenv').config();
app = require('../app');
var supertest = require("supertest");
var should = require("should");
var host = "http://localhost:"+process.env.PORT;
// This agent refers to PORT where the program is running.

var server = supertest.agent(host);//3000");

// UNIT test begin

describe("Index render test",function(){

  // #1 should return home page
  it("should return home page",function(done){
    // calling home page
    server
    .get("/")
    .expect("Content-type",/text/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });
});