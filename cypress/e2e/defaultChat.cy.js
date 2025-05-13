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

  it("Checks and unchecks the default conversation checkbox and verifies persistence", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");

    // Wait for the conversation list to load
    cy.get(".d-flex.bd-highlight.mt-2.mb-2.convo-list-item.pb-2").should(
      "be.visible"
    );

    // **Fix Overlay Issue**
    cy.get(".MuiAutocomplete-endAdornment")
      .should("exist")
      .invoke("hide"); // Hide it to prevent blocking

    // Click on the first conversation safely
    cy.get(".convo-list-item").first().click({ force: true });

    cy.task("log", "✅ First conversation selected!");

    // **Click the Default checkbox (Check it)**
    cy.get("#defaultConvoCheckbox")
      .should("exist")
      .and("be.visible")
      .check()
      .should("be.checked"); // Ensure it's checked

    cy.task("log", "✅ Default checkbox checked!");

    // **Wait for the toast message**
    cy.contains(".Toastify__toast", "Marked successfully!", { timeout: 5000 })
      .should("be.visible");

    cy.task("log", "✅ Toast notification appeared!");

    // **Refresh the page**
    cy.reload();
    cy.task("log", "🔄 Page refreshed!");

    // **Verify the checkbox remains checked**
    cy.get("#defaultConvoCheckbox")
      .should("exist")
      .and("be.visible")
      .should("be.checked");

    cy.task("log", "✅ Default checkbox remains checked after refresh!");

    // **Click the Default checkbox again (Uncheck it)**
    cy.get("#defaultConvoCheckbox").uncheck().should("not.be.checked");

    cy.task("log", "✅ Default checkbox unchecked!");

    // **Wait for the toast message**
    cy.contains(".Toastify__toast", "Unmarked successfully", { timeout: 5000 })
      .should("be.visible");

    cy.task("log", "✅ Toast notification for unmarking appeared!");

  });
});
