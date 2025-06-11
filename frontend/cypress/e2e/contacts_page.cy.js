describe("Contacts page", () => {
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
    cy.visit("/contacts");
  });

  it("has a single h1 for accessibility", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("contain", "Your contacts");
  });

  it("should fetch and display all contacts in a table", () => {
    cy.wait("@getContacts").then(() => {
      cy.get("table tbody tr").should("have.length", 3);

      cy.contains("th", "Email").should("be.visible");
      cy.contains("th", "Address").should("be.visible");
      cy.contains("th", "Contacted").should("be.visible");
      cy.contains("th", "Follow up needed").should("be.visible");

      cy.contains("td", "Grace Hopper").should("be.visible");
      cy.contains("td", "Ada Lovelace").should("be.visible");
      cy.contains("td", "Elizabeth Friedman").should("be.visible");
    });
  });

  it("should display only contacted contacts when 'Contacted' filter is applied", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('[data-cy="contacts-filter-contacted"]')
        .click()
        .then(() => {
          cy.get("table tbody tr").should("have.length", 1);
          cy.contains("td", "Grace Hopper").should("be.visible");
        });
    });
  });

  it("should display only not-yet-contacted contacts when 'Not yet contacted' filter is applied", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('[data-cy="contacts-filter-not-yet-contacted"]')
        .click()
        .then(() => {
          cy.get("table tbody tr").should("have.length", 2);
          cy.contains("td", "Ada Lovelace").should("be.visible");
          cy.contains("td", "Elizabeth Friedman").should("be.visible");
        });
    });
  });

  it("should display follow-up-needed contacts when 'Follow up needed' filter is applied", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('[data-cy="contacts-filter-follow-up-needed"]')
        .click()
        .then(() => {
          cy.get("table tbody tr").should("have.length", 1);
          cy.contains("td", "Elizabeth Friedman").should("be.visible");
        });
    });
  });

  it("should have a button, one button for each contact, to view contact details", () => {
    cy.wait("@getContacts").then(() => {
      cy.get("table tbody tr").each(($row) => {
        cy.wrap($row).find('button[data-cy^="view-contact-"]').should("exist");
      });
    });
  });

  it("should navigate to /contacts/1 when View Contact button is clicked", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="view-contact-button-1"]').click();
      cy.url().should("include", "/contacts/1");
    });
  });

  it("should navigate to /contacts/2 when View Contact button is clicked", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="view-contact-button-2"]').click();
      cy.url().should("include", "/contacts/2");
    });
  });

  it("should navigate to /contacts/3 when View Contact button is clicked", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="view-contact-button-3"]').click();
      cy.url().should("include", "/contacts/3");
    });
  });

  it("should have a button to add a new contact", () => {
    cy.wait("@getContacts").then(() => {
      cy.get('button[data-cy="add-contact-button"]').should("exist");
    });
  });

  it("should navigate to /contacts/new after 'Add Contact' button is clicked", () => {
    cy.get('button[data-cy="add-contact-button"]').click();
    cy.url().should("include", "/contacts/new");
  });
});
