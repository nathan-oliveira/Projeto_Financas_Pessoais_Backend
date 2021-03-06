import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTYwOTkzMzczMSwiZXhwIjoxNjEwMDIwMTMxfQ.2e9NBRyHPqsJ15Ut719Wvs77wQuazHown3jfL4dxi94";

let idGoal: string;

describe("Validate goal routes", () => {
  describe("#POST /api/goal", () => {
    it("Create an goal, return 200", (done) => {
      request(app).post("/api/goal")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "teste",
          "types": "receita",
          "money": 108.20
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("description");
          expect(res.body).to.have.property("types");
          expect(res.body).to.have.property("money");

          idGoal = res.body.id

          done();
        })
    });

    it("Validations when creating goal, return 400", (done) => {
      request(app).post("/api/goal")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          done();
        })
    })
  });

  describe("#GET /api/goal", () => {
    it("Search all goals, return 200", (done) => {
      request(app).get("/api/goal")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          done();
        })
    });
  });

  describe("#GET /api/goal/:id", () => {
    it("Search goal, return 200", (done) => {
      request(app).get(`/api/goal/${idGoal}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("description");
          expect(res.body[0]).to.have.property("types");
          expect(res.body[0]).to.have.property("money");

          done();
        })
    });

    it("Invalid goal search, return 400", (done) => {
      request(app).get("/api/goal/12121212121")
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

  describe("#PUT /api/goal/:id", () => {
    it("Update an goal, return 200", (done) => {
      request(app).put(`/api/goal/${idGoal}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "teste",
          "types": "receita",
          "money": 108.20
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        })
    });

    it("Goal is invalid, return 400", (done) => {
      request(app).put("/api/goal/1133232311" + idGoal)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "teste",
          "types": "receita",
          "money": 108.20
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("statusCode");

          done();
        });
    });
  });

  describe("#DELETE /api/goal/:id", () => {
    it("Delete goal", (done) => {
      request(app).delete(`/api/goal/${idGoal}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        })
    });

    it("Could not delete goal", (done) => {
      request(app).delete("/api/goal/131131212121")
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
})
