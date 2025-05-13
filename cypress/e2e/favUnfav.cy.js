describe("Login and Favorite Conversation Toggle Test", () => {
  it("should login and toggle favorite on a conversation", () => {
    cy.task("log", "🔐 Starting Login and Favorite Toggle Test");

    // ✅ Visit login page
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    // ✅ Login flow
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type("9300000000");
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();

    // ✅ Verify we’re on /chat
    cy.url().should("include", "/chat");

    // ✅ Click first unfavorited star (even if it's overlapped)
    cy.get('i.fa-star-o[title="Add Favorite"]', { timeout: 20000 })
      .first()
      .should("be.visible")
      .click({ force: true });

    // ✅ Confirm favorite toast
    cy.contains("Conversation marked as favorite successfully", {
      timeout: 10000,
    }).should("be.visible");

    // ✅ Click first favorited star to unfavorite (with force)
    cy.get('i.fa-star.favouritedConvo[title="Add Favorite"]', {
      timeout: 10000,
    })
      .first()
      .should("be.visible")
      .click({ force: true });

    // ✅ Confirm unfavorite toast
    cy.contains("Conversation marked as unfavorite successfully", {
      timeout: 10000,
    }).should("be.visible");
  });
});
