describe("Login and Conversation Feature Test", () => {
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

  it.skip("should double-click to edit conversation name and update it", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "🖱️ Double-clicking first #conversation-name");

    // Optional: wait for possible UI transitions or dropdowns to disappear

    // ✅ Double-click to make the conversation name input editable
    cy.get('#conversation-name')
      .first()
      .should('exist') // can be used instead of visible if force is used
      .dblclick({ force: true });

    // ✅ Clear the existing value and type a new name
    cy.get('#conversation-name-edit')
      .clear()
      .type('test-1');

    // ✅ Click the check icon to save the change, forcing the click if it's covered
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
    cy.get(".d-flex.bd-highlight.mt-2.mb-2.convo-list-item.pb-2").should("be.visible");

    // Hide overlay if exists
    cy.get(".MuiAutocomplete-endAdornment").should("exist").invoke("hide");

    // Click the first conversation
    cy.get(".convo-list-item").first().click({ force: true });

    // Wait for and click the pencil icon with title="Edit"
    cy.get('i[title="Edit"]').should("be.visible").click({ force: true });

    // Clear the input and type new name
    cy.get('input#conversation-name-edit')
      .should("be.visible")
      .clear()
      .type("test-2");

    // Click the check icon to confirm
    cy.get('svg[data-testid="CheckIcon"]').click({ force: true });

  });
});


    // ✅ Verify that the toast appears with the success message
    cy.contains('Conversation name updated successfully!')
      .should('be.visible');
  });
});
