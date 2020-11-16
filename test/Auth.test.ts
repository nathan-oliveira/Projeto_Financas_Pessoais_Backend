import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let idUser: string;
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
          "password": "123456"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200)
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

  describe("#POST /session", () => {
    it("Access account, return 200", (done) => {
      request(app).post("/session")
        .set("Accept", "application/json")
        .send({
          "email": "nathan10@gmail.com",
          "password": "123456"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("token");

          idUser = res.body.id;
          token = res.body.token;

          done();
        })
    });

    it("Invalid username or password", (done) => {
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

  describe("#GET /users/:id", () => {
    it("Search account, return 200", (done) => {
      request(app).get(`/users/${idUser}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("email");
          expect(res.body[0]).to.have.property("password");
          expect(res.body[0]).to.have.property("active");
          expect(res.body[0]).to.have.property("nivel");
          expect(res.body[0]).to.have.property("created_at");
          expect(res.body[0]).to.have.property("updated_at");

          done();
        })
    });

    it("Invalid account search, return 400", (done) => {
      request(app).get("/users/11111111")
        .set("Authorization", `Bearer ${token}`)
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

/* ======= Modelo TDD =======
import * as chai from "chai";
import * as dotenv from "dotenv";
import * as express from "express";
import { resolve } from "path";
import * as supertest from "supertest";

import { UserDAO } from "../app/models"
import Util from "../app/middlewares"
import { UserService } from "../app/services/UserService"
import Server from "../app/config/server";

dotenv.config({ path: resolve() + "/.env" });

//let token;
let idUser;

describe("User route", () => {

  before((done) => {
    const name = "test";
    const email = "test@teste.com";
    const password = "123456";

    // Server.listen(Server.get('port'));
    Promise.all([
      UserService.save(name, email, password)
    ]).then((resp: any) => {
      idUser = resp[0].id;
      done();
    })
  })

})


const { User } = require("../models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");

describe("api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all users", async () => {
      const users = [
        { name: "test", email: "test@gmail.com", gender: "male" },
        { name: "test1", email: "test1@gmail.com", gender: "female" }
      ];
      await User.insertMany(users);
      console.log(users);
      const res = await request(app).get("/api/users");
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  describe("GET/:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();
      const res = await request(app).get("/api/users/" + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", user.name);
    });

    it("should return 400 error when invalid object id is passed", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.status).to.equal(400);
    });

    it("should return 404 error when valid object id is passed but does not exist", async () => {
      const res = await request(app).get("/api/users/111111111111");
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "test",
          email: "test@gmail.com",
          gender: "male"
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("name", "test");
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();

      const res = await request(app)
        .put("/api/users/" + user._id)
        .send({
          name: "newTest",
          email: "newemail@gmail.com",
          gender: "male"
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "newTest");
    });
  });

  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();

      const res = await request(app).delete("/api/users/" + user._id);
      expect(res.status).to.be.equal(200);
    });

    it("should return 404 when deleted user is requested", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();

      let res = await request(app).delete("/api/users/" + user._id);
      expect(res.status).to.be.equal(200);

      res = await request(app).get("/api/users/" + user._id);
      expect(res.status).to.be.equal(404);
    });
  });
});
*/
