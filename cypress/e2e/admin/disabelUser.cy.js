const disableUserData = require("../../fixtures/disableUserData");

describe("Disable User, Verify Login Blocked, and Re-enable User", () => {
  it("should disable the user, verify login is blocked, then re-enable the user", () => {
    // 🌐 Visit login page
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    // 🔐 Admin Login
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(disableUserData.adminPhone);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();

    // ✅ Ensure we're on chat page
    cy.url().should("include", "/chat");

    // ⚙️ Go to Admin page
    cy.get("button.btn.not-selected.btn-secondary.btn-sm").click();

    // 🔍 Search for target user
    cy.get("input#search-text").type(disableUserData.targetUserSearchKeyword, { force: true });
    cy.get('i.flaticon-381-search-2[title="Search"]').click({ force: true });

    // 🚫 Disable target user
    cy.contains("td", disableUserData.targetUserFullName, { timeout: 10000 })
      .should("be.visible")
      .parent("tr")
      .within(() => {
        cy.get('button.toggleActive-enable[title="User Active"]').click({ force: true });
      });

    // ✅ Confirm modal
    cy.get(".modal-dialog", { timeout: 5000 }).should("be.visible");
    cy.contains(".modal-footer button", "Ok").click({ force: true });

    // 🔔 Wait for success toast
    cy.contains(`${disableUserData.targetUserFullName} is disabled !`, { timeout: 10000 }).should("be.visible");

    // 👤 Logout
    cy.get("button.MuiButtonBase-root.MuiIconButton-root").click({ force: true });
    cy.contains(".dropdown-item", "Logout").click({ force: true });

    // ✅ Wait for SweetAlert logout confirmation
    cy.get(".swal-modal", { timeout: 10000 }).should("be.visible");
    cy.contains(".swal-title", "Logout!").should("be.visible");
    cy.contains(".swal-text", "You have successfully logged out.").should("be.visible");

    // 🆗 Click OK in SweetAlert modal
    cy.get(".swal-button--confirm").click({ force: true });

    // 🚷 Try logging in with disabled user's number
    cy.url().should("include", "/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').clear().type(disableUserData.targetUserPhone);
    cy.contains("button", "Get OTP").click();

    // ❌ Expect "User Disabled" modal
    cy.get(".modal-dialog", { timeout: 10000 }).should("be.visible");
    cy.contains(".modal-title", "User Disabled").should("be.visible");
    cy.contains("p", "Your account has been disabled. Please contact Admin.").should("be.visible");

    // ✅ Click OK to dismiss modal
    cy.get("button.theme-btn.mobLoginBtn.btn.btn-primary")
      .contains("ok")
      .click({ force: true });

    // 🔐 Re-login as Admin to re-enable user
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').clear().type("919300000000");
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();

    // ✅ Ensure we're on chat page again
    cy.url().should("include", "/chat");

    // ⚙️ Go to Admin page again
    cy.get("button.btn.not-selected.btn-secondary.btn-sm").click();

    // 🔍 Search for the user again
    cy.get("input#search-text").type(disableUserData.targetUserSearchKeyword, { force: true });
    cy.get('i.flaticon-381-search-2[title="Search"]').click({ force: true });

    // ✅ Re-enable target user
    cy.contains("td", disableUserData.targetUserFullName, { timeout: 10000 })
    .should("be.visible")
    .parent("tr")
    .within(() => {
      cy.get('button[title="User Deactive"]').click({ force: true });
    });
    // ✅ Confirm re-enable modal
    cy.get(".modal-dialog", { timeout: 5000 }).should("be.visible");
    cy.contains(".modal-footer button", "Ok").click({ force: true });

    // 🔔 Wait for re-enable success toast
    cy.contains(`${disableUserData.targetUserFullName} is enabled !`, { timeout: 10000 }).should("be.visible");
  });
});
