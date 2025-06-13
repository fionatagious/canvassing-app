// Creates the database and tables with needed fields
import { conn } from "./src/db";

async function dbSetup() {
  try {
    console.log("Creating database and tables...");
    // Create database if it doesn't exist
    await conn.query(`CREATE DATABASE IF NOT EXISTS canvassing_db`);

    // Use the new database
    await conn.query(`USE canvassing_db`);

    // Create contacts table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) DEFAULT NULL,
        email VARCHAR(100) DEFAULT NULL,
        notes TEXT DEFAULT NULL,
        contacted TINYINT(1) NOT NULL DEFAULT 0,
        follow_up_needed TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
      `);
    console.log("Database and table setup complete.");
    await conn.end(); // gracefully close the pool
    process.exit(0); // exit the node process
  } catch (error) {
    console.log("Error while seeding:", error);
    process.exit(1);
  }
}

dbSetup();
