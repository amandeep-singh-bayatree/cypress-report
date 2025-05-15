describe("Login and Apply Filter", () => {
  before(() => {
    cy.session("login", () => {
      cy.task("log", "🔐 Logging in...");
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

      // Select country
      cy.get('button[aria-label="Select country"]').should("be.visible").click();
      cy.get('li[data-country-code="in"]').should("be.visible").click();

      // Enter phone number & submit OTP
      cy.get('input[type="tel"]').type("9300000000");
      cy.contains("button", "Get OTP").should("be.visible").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").should("be.visible").click();

      // Validate successful login
      cy.url().should("include", "/chat");
      cy.task("log", "✅ Successfully logged in!");
    });
  });

  it("should apply filters for Open, Pending, and Done", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "⏳ Waiting for loader...");
    cy.get(".loader", { timeout: 15000 }).should("not.exist");

    // Open filter and select 'Open'
    cy.task("log", "🔍 Clicking on the filter icon...");
    cy.get(".fa-filter.no-filter").should("be.visible").click();
    cy.task("log", "✅ Clicking on 'Open' checkbox...");
    cy.get('input[value="Open"]').check().should("be.checked");

    // Click 'Done' to apply filter
    cy.task("log", "✅ Clicking on 'Done' button...");
    cy.contains("button", "Done").should("be.visible").click();
    cy.task("log", "🎉 Filter applied successfully!");

    // Validate 'Open' filter results
    cy.task("log", "🔎 Validating Open filtered results...");
    cy.get(".convo-list-item").each(($item) => {
      cy.wrap($item)
        .find(".task-status img")
        .should("have.attr", "title", "Open");
    });
    cy.task("log", "✅ Open filter verification complete!");

    // Reset and apply 'Pending' filter
    cy.task("log", "🔄 Opening filter again...");
    cy.get(".fa-filter").should("be.visible").click();
    cy.task("log", "❌ Unchecking 'Open'...");
    cy.get('input[value="Open"]').uncheck().should("not.be.checked");
    cy.task("log", "✅ Checking 'Pending' (onHold)...");
    cy.get('input[value="onHold"]').check().should("be.checked");

    // Apply filter
    cy.contains("button", "Done").should("be.visible").click();
    cy.task("log", "🎉 Pending filter applied!");

    // Validate 'Pending' filter results
    cy.task("log", "🔎 Validating Pending filtered results...");
    cy.get(".convo-list-item").each(($item) => {
      cy.wrap($item)
        .find(".task-status img")
        .should("have.attr", "title", "Pending");
    });
    cy.task("log", "✅ Pending filter verification complete!");

    // Reset and apply 'Done' filter
    cy.task("log", "🔄 Opening filter again...");
    cy.get(".fa-filter").should("be.visible").click();
    cy.task("log", "❌ Unchecking 'Pending'...");
    cy.get('input[value="onHold"]').uncheck().should("not.be.checked");
    cy.task("log", "✅ Checking 'Done'...");
    cy.get('input[value="Done"]').check().should("be.checked");

    // Apply filter
    cy.contains("button", "Done").should("be.visible").click();
    cy.task("log", "🎉 Done filter applied!");

    // Validate 'Done' filter results
    cy.task("log", "🔎 Validating Done filtered results...");
    cy.get(".convo-list-item").each(($item) => {
      cy.wrap($item)
        .find(".task-status img")
        .should("have.attr", "title", "Done");
    });
    cy.task("log", "✅ Done filter verification complete!");
  });
});
