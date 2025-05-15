describe("Untag from conversation", () => {
  const phoneNumber = "9300000000";

  const login = () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phoneNumber);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/chat");
  };

  it("Logs in and untags a conversation", () => {
    login();

    // Click the bookmark icon to untag the conversation
    cy.get('.img_cont .fa-bookmark.taggColor').first().click({ force: true });

    // Click the "Clear Tags" button
    cy.contains('button', 'Clear Tags').click();

    // Click the "Yes" button to confirm clearing the tags
    cy.contains('button', 'Yes').click();

    // Wait for and verify the toast message
    cy.contains("Tag Removed successfully", { timeout: 5000 }).should("be.visible");
  });
});
