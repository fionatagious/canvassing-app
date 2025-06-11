describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a single h1 for accessibility", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("contain", "Welcome to Empower's canvassing app!");
  });

  it("should navigate to /contacts after 'View your contacts' button is clicked", () => {
    cy.get('button[data-cy="view-contacts-button"]').click();
    cy.url().should("include", "/contacts");
  });

  it("should navigate to /notes after 'View notes' button is clicked", () => {
    cy.get('button[data-cy="view-notes-button"]').click();
    cy.url().should("include", "/notes");
  });

  it("navigates to /contacts/new after 'Add a new contact' button is clicked", () => {
    cy.get('button[data-cy="add-contact-button"]').click();
    cy.url().should("include", "/contacts/new");
  });
});
