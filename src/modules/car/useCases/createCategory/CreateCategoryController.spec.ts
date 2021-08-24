import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import createConnection from "@shared/infra/database";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("should be able create a new category", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'SSSSSD')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to a create a new category", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category SuperTest",
        description: "Criando Categoria SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to a create a new category witch name exist", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category SuperTest",
        description: "Criando Categoria SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
