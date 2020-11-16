import { CategoryDAO } from "../app/models"
import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA1NTU1NjgxLCJleHAiOjE2MDU2NDIwODF9.O7fh7Q5RAoB7gLnH79eNhyspu8DgJJsCjO-Z5RcB7NM";

let idCategory: number;

describe("Validate category routes", () => {
  describe("#POST /category", () => {
    it("Create category", (done) => {
      request(app).post("/category")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "name": "Despesas",
          "icon": "https://www.guarapuava.pr.gov.br/wp-content/uploads/2019/05/icon_despesas.png"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("icon");

          idCategory = res.body.id

          done();
        })
    });
  });

  describe("#GET /category", () => {
    it("Search all categories", (done) => {
      request(app).get("/category")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          done();
        })
    });
  });

  describe("#GET /category/:id", () => {
    it("Search category, return 200", (done) => {
      request(app).get(`/category/${idCategory}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("icon");

          done();
        })
    });

    it("Invalid category search, return 400", (done) => {
      request(app).get("/category/11111111")
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

  // put
  /*
  describe("#PUT /category/:id", () => {

  })
  */
  /*
  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const categoryDAO = new CategoryDAO({
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
  */
  // delete
});
