import { dirname } from 'path';
import { createConnection } from 'typeorm';
import { UserDAO, CategoryDAO } from "../models"

export const Connection = createConnection({
  database: "node_vue",
  entities: [
    UserDAO,
    CategoryDAO
  ],
  host: "localhost",
  logging: false,
  password: "",
  port: 3306,
  synchronize: false,
  type: "mysql",
  username: "root",
})

