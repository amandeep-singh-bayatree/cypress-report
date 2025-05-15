const staffEditData = require("../../fixtures/staffUserToEdit");

describe("Change User Role", () => {
  it("should login, search for a staff, click edit icon, update role", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    // ✅ Login
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type("9300000000");
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();

    // ✅ Ensure we are on the chat page
    cy.url().should("include", "/chat");

    // ✅ Visit chat page directly and toggle favorite
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.get("button.btn.not-selected.btn-secondary.btn-sm").click();

    // 🔍 Search for the staff
    cy.get("input#search-text").type(staffEditData.searchKeyword, {
      force: true,
    });
    cy.get('i.flaticon-381-search-2[title="Search"]').click({ force: true });

    // ⏳ Wait for the search result to appear before clicking the Edit icon
    cy.contains("td", staffEditData.originalName, { timeout: 10000 })
      .should("be.visible")
      .parent("tr")
      .within(() => {
        cy.get('svg[data-testid="EditIcon"]')
          .scrollIntoView()
          .click({ force: true });
      });

    // change user role
    cy.get('[aria-haspopup="listbox"]')
      .contains("Staff")
      .click({ force: true });
    cy.get('[role="listbox"]')
      .should("be.visible")
      .contains("li", staffEditData.userRole)
      .click({ force: true });

    // 🔽 Change user type
    cy.get('[aria-haspopup="listbox"]')
      .contains("Select User Type")
      .click({ force: true });
    cy.get('[role="listbox"]')
      .should("be.visible")
      .contains("li", staffEditData.userType)
      .click({ force: true });

    cy.get('[aria-haspopup="listbox"]')
      .contains("Select Specialization")
      .click({ force: true });
    cy.get('[role="listbox"]')
      .should("be.visible")
      .contains("li", staffEditData.specialization)
      .click({ force: true });

    // ✅ Submit the form
    cy.get("button.MuiButton-root").contains("Submit").click({ force: true });

    // ✅ Assert toast message appears
    cy.get(".Toastify__toast", { timeout: 10000 }) // wait for toast to appear
      .should("be.visible")
      .and("contain.text", "User updated successfully");
  });
});
