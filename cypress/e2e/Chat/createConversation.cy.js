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

  it("should verify login and create a conversation", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    // Click the 'Create Conversation' button
    cy.get('i.fa-comments[title="Create Conversation"]').click();

    // Verify the toast message appears
    cy.contains("Conversation Created successfully", { timeout: 5000 }).should(
      "be.visible"
    );
  });
});
