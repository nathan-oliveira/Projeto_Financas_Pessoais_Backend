import { createConnection } from "typeorm";
import {
  UserDAO,
  CategoryDAO,
  GoalDAO,
  BusinessDAO,
} from "../models";

const Connection = createConnection({
  database: "d3dm2njj4pg8ge",
  entities: [UserDAO, CategoryDAO, GoalDAO, BusinessDAO],
  host: "ec2-50-19-32-202.compute-1.amazonaws.com",
  logging: false,
  password: "2ca2256961197477bbd8d7428b5a7f8aa80cde7928ccb844dc0bf1c53fa526bf",
  port: 5432,
  synchronize: false,
  type: "postgres",
  username: "fetkujuflvbkba",
  ssl: { rejectUnauthorized: false }
});

/*
DATABASE_URL
postgres://fetkujuflvbkba:2ca2256961197477bbd8d7428b5a7f8aa80cde7928ccb844dc0bf1c53fa526bf@ec2-50-19-32-202.compute-1.amazonaws.com:5432/d3dm2njj4pg8ge
*/

/*
** Config to MySQL **
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

export default Connection;
