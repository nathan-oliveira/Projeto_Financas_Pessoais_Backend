import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTYwOTkzMzczMSwiZXhwIjoxNjEwMDIwMTMxfQ.2e9NBRyHPqsJ15Ut719Wvs77wQuazHown3jfL4dxi94";

let idBusiness: string;

describe("Validate business routes", () => {
  describe("#POST /api/business", () => {
    it("Create an business, return 200", (done) => {
      request(app).post("/api/business")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "business",
          "types": "despesa",
          "money": 100.9,
          "categoryId": 62
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("id");

          idBusiness = res.body.id;

          done();
        })
    });

    it("Validations when creating business, return 400", (done) => {
      request(app).post("/api/business")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          done();
        })
    });
  });

  describe("#GET /api/business", () => {
    it("Search all business, return 200", (done) => {
      request(app).get("/api/business")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          done();
        })
    });
  });

  describe("#GET /api/business/:id", () => {
    it("Search business, return 200", (done) => {
      request(app).get(`/api/business/${idBusiness}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          done();
        })
    });

    it("Invalid business search, return 400", (done) => {
      request(app).get("/api/business/1133232311")
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

  describe("#PUT /api/business/:id", () => {
    it("Update an business, return 200", (done) => {
      request(app).put(`/api/business/${idBusiness}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "business",
          "types": "despesa",
          "money": 100.9,
          "categoryId": 62
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        })
    });

    it("Business is invalid, return 400", (done) => {
      request(app).put("/api/business/1133232311" + idBusiness)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "description": "business",
          "types": "despesa",
          "money": 100.9,
          "categoryId": 62
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("statusCode");

          done();
        });
    });
  });

  describe("#DELETE /api/business/:id", () => {
    it("Delete business", (done) => {
      request(app).delete(`/api/business/${idBusiness}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        });

    });

    it("Could not delete business", (done) => {
      request(app).delete("/api/business/1232323444")
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
