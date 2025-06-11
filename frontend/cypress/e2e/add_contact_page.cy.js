describe("Add Contact page", () => {
  beforeEach(() => {
    cy.visit("/contacts/new");
  });

  it("has a single h1 for accessibility", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("contain", "Add Contact");
  });

  it("should have a form with name, address, email, and notes fields", () => {
    cy.get('form[data-cy="add-contact-form"]').within(() => {
      cy.get('input[name="name"]').should("exist");
      cy.get('input[name="address"]').should("exist");
      cy.get('input[name="email"]').should("exist");
      cy.get('textarea[name="notes"]').should("exist");
      cy.get('input[name="contacted"]').should("exist");
      cy.get('input[name="followup"]').should("exist");
    });
  });

  it("name is a required field and shows an alert if left empty", () => {
    cy.get('form[data-cy="add-contact-form"]').within(() => {
      cy.get('input[name="name"]').clear();
      cy.get('button[type="submit"]').click();
    });
    cy.on("window:alert", (text) => {
      expect(text).to.contains(
        "Please fix these form errors before submitting."
      );
      expect(text).to.contains("Contact name is required");
    });
  });

  it("name is a required field and shows an alert if less than 2 characters", () => {
    cy.get('form[data-cy="add-contact-form"]').within(() => {
      cy.get('input[name="name"]').type("A");
      cy.get('button[type="submit"]').click();
    });
    cy.on("window:alert", (text) => {
      expect(text).to.contains(
        "Please fix these form errors before submitting."
      );
      expect(text).to.contains(
        "Contact name must be at least 2 characters long"
      );
    });
  });

  it("shows an alert if email is not a valid format", () => {
    cy.get('form[data-cy="add-contact-form"]').within(() => {
      cy.get('input[name="name"]').type("Brenda Sanchez");
      cy.get('input[name="email"]').type("invalid email");
      cy.get('button[type="submit"]').click();
    });
    cy.on("window:alert", (text) => {
      expect(text).to.contains(
        "Please fix these form errors before submitting."
      );
      expect(text).to.contains("Please enter a valid email address");
    });
  });

  it("shows an alert if submit is successful", () => {
    cy.get('form[data-cy="add-contact-form"]').within(() => {
      cy.get('input[name="name"]').type("Brenda Sanchez");
      cy.get('input[name="address"]').type("100 Cryptology Ave");
      cy.get('input[name="email"]').type("brenda@cryptology.com");
      cy.get('textarea[name="notes"]').type("Excited to volunteer!");
      cy.get('button[type="submit"]').click();
    });
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Contact created!");
    });
  });

  it("redirects to /contacts after successful submission", () => {
    cy.get('form[data-cy="add-contact-form"]').within(() => {
      cy.get('input[name="name"]').type("Brenda Sanchez");
      cy.get('button[type="submit"]').click();
    });
    cy.url().should("include", "/contacts");
  });
});
