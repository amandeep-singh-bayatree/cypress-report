describe("Login and Conversation List Test", () => {
  beforeEach(() => {
    cy.session("userSession", () => {
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

      cy.task("log", "🔐 Logging in...");

      // Select Country (India)
      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();

      // Enter Phone Number & OTP
      cy.get('input[type="tel"]').type("9300000000");
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();

      // Ensure login is successful
      cy.url().should("include", "/chat");
      cy.task("log", "✅ Login Successful!");
    });
  });

  it("Selects the first conversation", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");

    // Wait for the conversation list to load
    cy.get(".d-flex.bd-highlight.mt-2.mb-2.convo-list-item.pb-2").should(
      "be.visible"
    );

    // **Fix Overlay Issue**
    // cy.get(".MuiAutocomplete-endAdornment")
    //   .should("exist") // Ensure it's in the DOM
    //   .invoke("hide"); // Hide it to prevent blocking

    // Click on the first conversation safely
    cy.get(".convo-list-item").first().click({ force: true });

    cy.task("log", "✅ First conversation selected!");

    // **Verify the Default checkbox exists**
    cy.get("#defaultConvoCheckbox")
      .should("exist") // Ensure it exists in the DOM
      .and("be.visible"); // Ensure it's visible

    cy.task("log", "✅ Default checkbox is present!");
  });
});
