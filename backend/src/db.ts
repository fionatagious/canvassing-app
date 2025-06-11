// This file sets up the connection to MySQL database
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "canvassing_db",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
