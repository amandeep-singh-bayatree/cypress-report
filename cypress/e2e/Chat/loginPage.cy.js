describe("Login Page Test", () => {
  // login suite
  it("should allow user to login with phone number and OTP", () => {
    // test case
    cy.task("log", "🚀 Starting Login Test");

    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
    cy.task("log", "✅ Visited Login Page");

    // Step 1: Click the country flag button to open the dropdown
    cy.get('button[aria-label="Select country"]').click();
    cy.task("log", "🌍 Opened country selection dropdown");

    // Step 2: Ensure the country list appears
    cy.get('li[data-country-code="in"]').should("be.visible");

    // Step 3: Click on "India (+91)" in the dropdown
    cy.get('li[data-country-code="in"]').click();
    cy.task("log", "🇮🇳 Selected India (+91)");

    // Step 4: Enter phone number without country code
    cy.get('input[type="tel"]').type("9300000000");
    cy.task("log", "📱 Entered phone number: 9300000000");

    // Step 5: Click "Get OTP" button
    cy.contains("button", "Get OTP").click();
    cy.task("log", "📩 Requested OTP");

    // Step 6: Wait for OTP input field to appear
    cy.get('input[type="text"]').should("be.visible");

    // Step 7: Enter OTP
    cy.get('input[type="text"]').type("123456");
    cy.task("log", "🔢 Entered OTP: 123456");

    // Step 8: Submit OTP
    cy.contains("button", "Submit").click();
    cy.task("log", "🚀 Submitted OTP");

    // Step 9: Verify successful login
    cy.url().should("include", "/chat").then((url) => {
      cy.task("log", `✅ Successfully logged in. Redirected to: ${url}`);
    });
  });
});
