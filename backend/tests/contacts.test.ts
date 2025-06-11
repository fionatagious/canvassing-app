import { conn } from "../src/db";
import app from "../src/server";
import request from "supertest";
import { describe, it, beforeEach, expect } from "vitest";
import { afterAll } from "vitest";
describe("Contacts API", () => {
  beforeEach(async () => {
    // Reset the contacts table before each test
    await conn.query("DELETE FROM contacts");
  });

  it("Create a contact", async () => {
    const response = await request(app).post("/api/v1/contacts").send({
      contactName: "Senri Kawaguchi",
      contactAddress: "500 Drummer Lane",
      contactEmail: "senri@kiyosen.com",
      contactNotes: "first time learning about the campaign",
      contacted: true,
      needToFollowUp: false,
    });

    expect(response.status).toBe(201);
    expect(response.body.contactId).toBeDefined();
    expect(response.body.message).toContain("Contact created successfully");
  });

  it("Create a contact with missing required name field", async () => {
    const response = await request(app).post("/api/v1/contacts").send({
      contactAddress: "500 Drummer Lane",
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name is a required field.");
  });

  it("Get all contacts", async () => {
    await request(app).post("/api/v1/contacts").send({
      contactName: "Senri Kawaguchi",
      contactEmail: "senri@kiyosen.com",
    });

    await request(app).post("/api/v1/contacts").send({
      contactName: "Danielle Haim",
      contactEmail: "danielle@haim.com",
    });

    const response = await request(app).get("/api/v1/contacts");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("Get a single contact", async () => {
    const createResponse = await request(app).post("/api/v1/contacts").send({
      contactName: "Senri Kawaguchi",
      contactEmail: "senri@kiyosen.com",
    });

    const contactId = createResponse.body.contactId;
    const getResponse = await request(app).get(`/api/v1/contacts/${contactId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body[0]).toMatchObject({
      id: contactId,
      name: "Senri Kawaguchi",
      address: null,
      email: "senri@kiyosen.com",
      notes: null,
      contacted: false,
      follow_up_needed: false,
      created_at: expect.any(String),
    });
  });

  it("Invalid contact ID in the GET request", async () => {
    const response = await request(app).get(`/api/v1/contacts/invalid-id`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Contact ID must be a number.");
  });

  it("Update a note on a contact", async () => {
    const createResponse = await request(app).post("/api/v1/contacts").send({
      contactName: "Meg White",
      contactEmail: "meg@thewhitestripes.com",
      contactNotes:
        "Meg is excited about the initiative and wants to learn more",
    });

    const contactId = createResponse.body.contactId;
    const updateResponse = await request(app)
      .put(`/api/v1/contacts/${contactId}`)
      .send({
        contactNotes: "Meg collected signatures at the event today",
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.message).toContain("Note updated successfully");
  });

  it("Delete a contact", async () => {
    const createResponse = await request(app).post("/api/v1/contacts").send({
      contactName: "Senri Kawaguchi",
      contactEmail: "senri@kiyosen.com",
    });

    const contactId = createResponse.body.contactId;
    const deleteResponse = await request(app).delete(
      `/api/v1/contacts/${contactId}`
    );
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toContain(
      "Contact deleted successfully."
    );
  });

  it("Missing contact ID in the delete request", async () => {
    const deleteResponse = await request(app).delete(`/api/v1/contacts/`);
    expect(deleteResponse.status).toBe(404);
  });

  // close db connection after all tests
  afterAll(async () => {
    await conn.end();
  });
});
