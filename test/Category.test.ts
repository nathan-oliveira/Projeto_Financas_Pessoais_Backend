import request from "supertest";
import { expect } from "chai";
import app from "../app/config/server";

let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImlhdCI6MTYwNjY2NjM2MiwiZXhwIjoxNjA2NzUyNzYyfQ.HvxR1tafulSjYg1gCjmdLnABZHHK6Zh65E6dQUnakmw";

let idCategory: number;

describe("Validate category routes", () => {
  describe("#POST /category", () => {
    it("Create an category, return 200", (done) => {
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

    it("Validations when creating category, return 400", (done) => {
      request(app).post("/category")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

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

  describe("#PUT /category/:id", () => {
    it("Update an account, return 200", (done) => {
      request(app).put("/category/" + idCategory)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          "name": "Despesas",
          "icon": "https://www.guarapuava.pr.gov.br/wp-content/uploads/2019/05/icon_despesas.png"
        })
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        })
    });

    it("Category is invalid, return 400", (done) => {
      request(app).put("/category/" + idCategory)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({})
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("statusCode");

          done();
        });
    });

  });

  describe("#DELETE /category/:id", () => {
    it("Delete category", (done) => {
      request(app).delete("/category/" + idCategory)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(200);

          expect(res.body).to.have.property("message");

          done();
        });
    });

    it("Could not delete category", (done) => {
      request(app).delete("/category/12121212121121")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .end((err: Error, res: request.Response) => {
          expect(res.status).to.equal(400);

          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");

          done();
        });
    });
  });
});
