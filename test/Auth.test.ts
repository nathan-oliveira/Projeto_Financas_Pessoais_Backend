import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let emailUser: string;
let token: string;

// res.body.should.be.a('object');
// res.body.data.should.be.a('array');
// expect({ a: 1, b: 2 }).to.have.keys([‘a’, ‘b’]); // passes
// https://medium.com/@leoo.farias/testes-node-js-com-mocha-e-chai-8bbe9eeef703

describe("Validate user routes", () => {
  describe("#POST /users", () => {
    it("Create an account, return 200", (done) => {
      request(app).post("/users")
        .set("Accept", "application/json")
        .send({
          "name": "Nathan Olivera",
          "email": "nathan10@gmail.com",
          "password": "123456",
          "password_confirmation": "123456"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200)

          expect(res.body).be.a('object')
          expect(res.body).to.have.property("name")
          expect(res.body).to.have.property("email")
          expect(res.body).to.have.property("password")
          expect(res.body).to.have.property("id")
          expect(res.body).to.have.property("active")
          expect(res.body).to.have.property("nivel")
          expect(res.body).to.have.property("created_at")
          expect(res.body).to.have.property("updated_at")

          emailUser = res.body.email;

          done();
        })
    });

    it("Create account already registered, return 400", (done) => {
      request(app).post("/users")
        .set("Accept", "application/json")
        .send({
          "name": "Nathan Olivera",
          "email": "nathan10@gmail.com",
          "password": "123456",
          "password_confirmation": "123456"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("statusCode");

          done();
        })
    });

    it("Could not create user, return 400", (done) => {
      request(app).post("/users")
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          done();
        })
    });
  });

  describe("#POST /session", () => {
    it("Access account, return 200", (done) => {
      request(app).post("/session")
        .set("Accept", "application/json")
        .send({
          "email": "nathan2@gmail.com",
          "password": "123456"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("token");

          token = res.body.token;

          done();
        })
    });

    it("Invalid username or password, return 400", (done) => {
      request(app).post("/session")
        .set("Accept", "application/json")
        .send({
          "email": "tessssssssssssssssssssssst@gmail.com",
          "password": "123456"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");

          done();
        })
    });
  });
  describe("#GET /profile", () => {
    it("Search account, return 200", (done) => {
      request(app).get("/profile")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("email");
          expect(res.body[0]).to.have.property("active");
          expect(res.body[0]).to.have.property("nivel");

          done();
        })
    });

    it("Invalid account search, return 400", (done) => {
      request(app).get("/profile")
        .set("Authorization", `Bearer x${token}x`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");

          done();
        })
    });
  });
});
