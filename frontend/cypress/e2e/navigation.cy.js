describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a navigation", () => {
    cy.get("nav").should("exist");
  });

  it("has a navigation link to the 'Your notes' page", () => {
    cy.get("nav a")
      .contains("Your notes")
      .should("have.attr", "href", "/notes");
  });

  it("has a navigation link to the 'Home' page", () => {
    cy.get("nav a").contains("Home").should("have.attr", "href", "/");
  });

  it("has a navigation link to the 'Your contacts' page", () => {
    cy.get("nav a")
      .contains("Your contacts")
      .should("have.attr", "href", "/contacts");
  });

  it("has a navigation link to the 'Add a contact' page", () => {
    cy.get("nav a")
      .contains("Add a contact")
      .should("have.attr", "href", "/contacts/new");
  });
});
