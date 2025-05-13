import users from "../../fixtures/users";

describe("Complete User Flow Test", () => {
  beforeEach(() => {
    cy.session("userSession", () => {
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();
      cy.get('input[type="tel"]').type("9300000000");
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();
      cy.url().should("include", "/chat");
    });

    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.get("button.btn.not-selected.btn-secondary.btn-sm").click();
    cy.get(".add-download a.btn").contains("+ Add New").click({ force: true });
    cy.url().should("include", "/users");
  });

  users.forEach((user, index) => {
    it.skip(`should add ${user.userRole}: ${user.firstName} ${user.lastName}`, () => {
      cy.get('input[name="firstName"]').type(user.firstName);
      cy.get('input[name="lastName"]').type(user.lastName);
      cy.get('input[name="phoneNumber"]').clear().type(user.phoneNumber);

      // Handle User Role selection
      if (index === 0) {
        cy.get('div[role="combobox"]').first().should('contain', 'Internal Provider');
      } else {
        cy.get('div[role="combobox"]').first().click();
        cy.get('ul[role="listbox"]').should('be.visible');
        cy.get('ul[role="listbox"]').contains(user.userRole).click();
        cy.wait(1000);
      }

      // Handle User Type if applicable
      if (user.userType && user.userRole !== "Patient") {
        cy.contains('div[role="combobox"]', 'Select User Type').click();
        cy.get('ul[role="listbox"]').contains(user.userType).click();
      }

      // Special handling for Access Level
      if (index === 0) {
        // Explicitly set Access Level for Internal Provider (first user)
        cy.contains('div[role="combobox"]', 'Select Access Level').click();
        cy.get('ul[role="listbox"]').contains(user.accessLevel).click();
      } else {
        // Verify auto-selected Access Level for other roles
        cy.get('div[role="combobox"]').contains(user.accessLevel).should('exist');
      }

      // Handle Specialization if applicable
      if (user.specialization && ["Internal Provider", "Referring Provider"].includes(user.userRole)) {
        cy.contains('div[role="combobox"]', 'Select Specialization').click();
        cy.get('ul[role="listbox"]').contains(user.specialization).click();
      }

      // Handle Category if applicable
      if (user.category && user.userRole === "Referring Provider") {
        cy.contains('div[role="combobox"]', 'Select Category').click();
        cy.get('ul[role="listbox"]').contains(user.category).click();
      }

      // Submit form and verify
      cy.get('button[type="submit"]').should("be.enabled").click();
      cy.contains(".Toastify__toast", "User registered successfully", { timeout: 10000 })
        .should("be.visible");
      cy.get('input[name="firstName"]').should("have.value", "");
    });
  });
});