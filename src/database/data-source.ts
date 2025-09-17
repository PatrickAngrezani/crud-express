import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

import dotenv from "dotenv";
dotenv.config();

const dbHost = process.env.NODE_ENV === 'development' ? 'localhost' : 'db'; 

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
});
