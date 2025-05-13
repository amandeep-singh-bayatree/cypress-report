const staffEditData = require("../../fixtures/staffUserToEdit");

describe("Login and Favorite Conversation Toggle Test", () => {
  it("should login, search for a staff, click edit icon, update fields, submit, and verify success", () => {
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
    cy.get("input#search-text").type(staffEditData.searchKeyword, { force: true });
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

    // ✍️ Fill out modal form fields
    cy.get('input[name="firstName"]', { timeout: 10000 })
      .clear()
      .type(staffEditData.firstName);
    cy.get('input[name="lastName"]').clear().type(staffEditData.lastName);
    cy.get('input[name="phoneNumber"]').clear().type(staffEditData.phoneNumber);

    // 🔽 Change user type
    cy.get('[aria-haspopup="listbox"]').contains("Front Desk").click({ force: true });
    cy.get('[role="listbox"]')
      .should("be.visible")
      .contains("li", staffEditData.userType)
      .click({ force: true });

    // 🔽 Change access level
    cy.get('[aria-haspopup="listbox"]').contains("Staff User").click({ force: true });
    cy.get('[role="listbox"]')
      .should("be.visible")
      .find(`li[data-value="${staffEditData.accessRole}"]`)
      .not('.Mui-disabled')
      .click({ force: true });

    // ✅ Submit the form
    cy.get('button.MuiButton-root').contains('Submit').click({ force: true });

    cy.wait(2000);

    // 🔍 Search again to verify
    cy.get("input#search-text").clear({ force: true }).type(staffEditData.firstName, { force: true });
    cy.get('i.flaticon-381-search-2[title="Search"]').click({ force: true });

    cy.contains("td", `${staffEditData.firstName} ${staffEditData.lastName}`, { timeout: 10000 })
      .should("be.visible");
  });
});
