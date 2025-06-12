// Seeds dummy data into the db
import { conn } from "./src/db";

async function seed() {
  try {
    console.log("Deleting existing records...");
    await conn.query("DELETE FROM contacts");
    await conn.query("ALTER TABLE contacts AUTO_INCREMENT = 1");
    console.log("Seeding contacts...");
    await conn.query(`
      INSERT INTO contacts (name, address, email, notes, contacted, follow_up_needed) VALUES
        ('Grace Hopper', '312 Apple St', 'grace@union.com', 'Send campaign flyers to Grace', TRUE, FALSE),
        ('Ada Lovelace', '606 Milwaukee Ave', 'ada@union.com', 'Almost signed', TRUE, TRUE),
        ('Elizabeth Friedman', '200 Cryptology Ave', 'elizabeth@union.com', 'Interested in door knocking', TRUE, FALSE),
        ('Senri Kawaguchi', '480 Cherry Lane', 'senri@kiyosen.com', 'Interested in canvassing', TRUE, FALSE),
        ('Meg White', '100 Washington Ave', 'meg@thewhitestripes.com', 'Follow up next week', TRUE, TRUE),
        ('Danielle Haim', '999 Lucky Road', 'danielle@haim.com', 'Expressed interest in volunteering', FALSE, FALSE);
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
