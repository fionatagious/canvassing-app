describe("Notes page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/contacts", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "Grace Hopper",
          address: "312 Apple St",
          email: "grace@union.com",
          notes: "excited about the campaign",
          contacted: true,
          follow_up_needed: false,
        },
        {
          id: 2,
          name: "Ada Lovelace",
          address: "606 Milwaukee Ave",
          email: "ada@union.com",
          notes: "interested in volunteering",
          contacted: false,
          follow_up_needed: false,
        },
        {
          id: 3,
          name: "Elizabeth Friedman",
          address: "200 Cryptology Ave",
          email: "elizabeth@union.com",
          notes: "signed the petition",
          contacted: false,
          follow_up_needed: true,
        },
      ],
    }).as("getContacts");
    cy.visit("/notes");
  });

  it("has a single h1 for accessibility", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("contain", "Canvassing notes");
  });

  it("should fetch and display all contacts in a table with their notes", () => {
    cy.wait("@getContacts").then(() => {
      cy.get("table tbody tr").should("have.length", 3);
      cy.contains("th", "Notes").should("be.visible");
      cy.contains("th", "Contacted?").should("be.visible");
      cy.contains("th", "Follow up needed?").should("be.visible");
      cy.contains("td", "excited about the campaign").should("be.visible");
      cy.contains("td", "interested in volunteering").should("be.visible");
      cy.contains("td", "signed the petition").should("be.visible");
    });
  });

  it("should have a button, one for each contact, to edit notes", () => {
    cy.wait("@getContacts").then(() => {
      cy.get("table tbody tr").each(($row) => {
        cy.wrap($row)
          .find('button[data-cy^="edit-note-button-"]')
          .should("exist");
      });
    });
  });

  it("should show 'Save note' and 'Cancel edit' buttons after 'Edit note' button is clicked", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="edit-note-button-1"]').click();
      cy.get('button[data-cy="save-note-button-1"]').should("exist");
      cy.get('button[data-cy="cancel-edit-button-1"]').should("exist");
    });
  });

  it("'Save note' button should be disabled after 'Edit note' button is clicked", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="edit-note-button-1"]').click();
      cy.get('button[data-cy="save-note-button-1"]').should("be.disabled");
    });
  });

  it("'Save note' button should not be disabled after user changes note content", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="edit-note-button-1"]').click();
      cy.get('textarea[data-cy="note-textarea-1"]')
        .clear()
        .type("Updated note content");
      cy.get('button[data-cy="save-note-button-1"]').should("not.be.disabled");
      cy.get('textarea[data-cy="note-textarea-1"]').should(
        "have.value",
        "Updated note content"
      );
    });
  });

  it("Table cell should be updated with new content after user clicks 'Save note' button", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="edit-note-button-1"]').click();
      cy.get('textarea[data-cy="note-textarea-1"]')
        .clear()
        .type("Updated note content");
      cy.get('button[data-cy="save-note-button-1"]').click();
      cy.get("table tbody tr")
        .first()
        .within(() => {
          cy.contains("td", "Updated note content").should("be.visible");
        });
    });
  });
});
