describe("View contact", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/contacts/1", {
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
      ],
    }).as("getContact");
    cy.visit("/contacts/1");
  });

  it("should have a button to delete the contact", () => {
    cy.wait("@getContact").then(() => {
      cy.get('button[data-cy="delete-contact-button"]').should("exist");
    });
  });

  it("'Delete contact' button when clicked should delete the contact and redirect to contacts page", () => {
    cy.wait("@getContact").then(() => {
      cy.get('button[data-cy="delete-contact-button"]').click();
      cy.url().should("include", "/contacts");
    });
  });
});
