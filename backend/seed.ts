// Seeds dummy data into the db
import { conn } from "./src/db";

async function seed() {
  try {
    console.log("Deleting existing records...");
    await conn.query("DELETE FROM contacts");
    await conn.query("ALTER TABLE contacts AUTO_INCREMENT = 1");
    console.log("Seeding contacts...");
    await conn.query(`
      INSERT INTO contacts (name, address, email, notes) VALUES
        ('Grace Hopper', '312 Apple St', 'grace@union.com', 'Send campaign flyers to Grace'),
        ('Ada Lovelace', '606 Milwaukee Ave', 'ada@union.com', 'Almost signed'),
        ('Elizabeth Friedman', '200 Cryptology Ave', 'elizabeth@union.com', 'Interested in door knocking'),
        ('Senri Kawaguchi', 'senri@kiyosen.com', '555-4444', 'Interested in canvassing'),
        ('Meg White', 'meg@thewhitestripes.com', '555-5555', 'Follow up next week'),
        ('Danielle Haim', 'danielle@haim.com', '555-6666', 'Expressed interest in volunteering');
      `);
    console.log("Successfully seeded contacts");
    console.log("Seeding complete!");
    await conn.end(); // gracefully close the pool
    process.exit(0); // exit the node process
  } catch (error) {
    console.log("Error while seeding:", error);
    process.exit(1);
  }
}

seed();
