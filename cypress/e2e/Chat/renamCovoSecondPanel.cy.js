describe("Login and Edit Conversation Name Test", () => {
  before(() => {
    cy.session("login", () => {
      cy.task("log", "🔐 Starting Login Test");
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();

      cy.get('input[type="tel"]').type("9300000000");
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();

      cy.url().should("include", "/chat");
    });
  });

  it("should open first conversation and rename it", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    // Wait for conversation list
    cy.get(".d-flex.bd-highlight.mt-2.mb-2.convo-list-item.pb-2").should(
      "be.visible"
    );

    // Hide overlay if exists
    cy.get(".MuiAutocomplete-endAdornment").should("exist").invoke("hide");

    // Click the first conversation
    cy.get(".convo-list-item").first().click({ force: true });

    // Wait for and click the pencil icon with title="Edit"
    cy.get('i[title="Edit"]').should("be.visible").click({ force: true });

    // Clear the input and type new name
    cy.get("input#conversation-name-edit")
      .should("be.visible")
      .clear()
      .type("test-3");

    // Click the check icon to confirm
    cy.get('[data-testid="CheckIcon"]')
      .should("be.visible")
      .click({ force: true });

    cy.contains("Conversation name updated successfully").should("be.visible");
  });
});
