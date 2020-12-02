import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImlhdCI6MTYwNjY2NjM2MiwiZXhwIjoxNjA2NzUyNzYyfQ.HvxR1tafulSjYg1gCjmdLnABZHHK6Zh65E6dQUnakmw";

let idGoal: string;
let userId: number = 42;

describe("Validate goal routes", () => {
  describe("#POST /goal", () => {
    it("Create an goal, return 200", (done) => {
      request(app).post("/goal")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "teste",
          "types": "receita",
          "money": 108.20,
          "userId": userId
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
      request(app).post("/goal")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("id");

          done();
        })
    })
  });

  describe("#GET /goal", () => {
    it("Search all goals, return 200", (done) => {
      request(app).get("/goal")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .end((err: Error, res: request.Response) => {
        expect(res.status).to.equal(200);

        done();
      })
    });
  });

  describe("#GET /goal/:id", () => {
    it("Search goal, return 200", (done) => {
      request(app).get(`/goal/${idGoal}`)
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
      request(app).get("/goal/12121212121")
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

  describe("#PUT /goal/:id", () => {
    it("Update an account, return 200", (done) => {
      request(app).put(`/goal/${idGoal}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send({
        "description": "teste",
        "types": "receita",
        "money": 108.20,
        "userId": userId
      })
      .end((err: Error, res: request.Response) => {
        expect(res.status).to.equal(200);

        expect(res.body).to.have.property("message");

        done();
      })
    });

    it("Goal is invalid, return 400", (done) => {
      request(app).put(`/goal/${idGoal}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("statusCode");

          done();
        })
    });
  });

  describe("#DELETE /goal/:id", () => {
    it("Delete goal", (done) => {
      request(app).delete(`/goal/${idGoal}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        })
    });

    it("Could not delete goal", (done) => {
      request(app).delete("/goal/131131212121")
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
