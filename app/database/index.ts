import { createConnection } from "typeorm";
import {
  UserDAO,
  CategoryDAO,
  GoalDAO,
  BusinessDAO,
} from "../models";

const Connection = createConnection({
  database: "devprnn4jta6nv",
  entities: [UserDAO, CategoryDAO, GoalDAO, BusinessDAO],
  host: "ec2-54-211-210-149.compute-1.amazonaws.com",
  logging: false,
  password: "63a0801f6fca2ae654a19969fd83b03e7a8dd7186249a00d81f9cfcaa2aa1f42",
  port: 5432,
  synchronize: false,
  type: "postgres",
  username: "cfoenzkqhvogdr",
  ssl: { rejectUnauthorized: false }
});

/*
** Config to MySQL **
const Connection = createConnection({
  database: "node_react",
  entities: [UserDAO, CategoryDAO, GoalDAO, BusinessDAO],
  host: "localhost",
  logging: false,
  password: "",
  port: 3306,
  synchronize: false,
  type: "mysql",
  username: "root",
});


const Connection = createConnection({
  database: "node_vue",
  entities: [UserDAO, CategoryDAO, GoalDAO, BusinessDAO],
  host: "localhost",
  logging: false,
  password: "",
  port: 3306,
  synchronize: false,
  type: "mysql",
  username: "root",
});
*/

/*
**Postgres**
const Connection = createConnection({
  database: "devprnn4jta6xnvx",
  entities: [UserDAO, CategoryDAO, GoalDAO, BusinessDAO],
  host: "ec2-54-211-210-119.compute-1.amazonaws.com",
  logging: false,
  password: "63a0801f6fca2aex654a19969fd83b03e7a8dd7186249a00d81f9cfcaa2aa1f42",
  port: 5432,
  synchronize: false,
  type: "postgres",
  username: "cfoenxzkqhvogdr",
  ssl: { rejectUnauthorized: false }
});
*/
export default Connection;
