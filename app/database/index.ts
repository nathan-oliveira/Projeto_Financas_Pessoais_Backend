import { createConnection } from "typeorm";
import { UserDAO, CategoryDAO, GoalDAO } from "../models";

const Connection = createConnection({
  database: "node_vue",
  entities: [UserDAO, CategoryDAO, GoalDAO],
  host: "localhost",
  logging: false,
  password: "",
  port: 3306,
  synchronize: false,
  type: "mysql",
  username: "root",
});

export default Connection;
