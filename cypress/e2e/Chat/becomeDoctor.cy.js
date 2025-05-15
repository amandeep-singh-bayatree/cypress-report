describe("Become a doctor", () => {
  it("Become a doctor (superAdmin + Provider)", () => {
    const phone = "7800078000";
    const otp = "123456";

    // Visit login page
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    // Login as admin
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phone);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type(otp);
    cy.contains("button", "Submit").click();

    // Ensure we're on chat page
    cy.url().should("include", "/chat");

    // Navigate to Admin panel
    cy.get('button.btn.not-selected.btn-secondary.btn-sm').click();

    // Open "Become a Doctor" modal
    cy.get('button.MuiIconButton-root').click();
    cy.contains("Become a Doctor").click();

    // Enable switch if not already
    cy.get('input[type="checkbox"]').check({ force: true });

    // Confirm and relogin
    cy.contains("button", "Confirm and Relogin").click();

    cy.wait(1000);

    cy.contains('button', 'OK').click();

    // Re-login with the same phone and OTP
    cy.url().should("include", "/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phone);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type(otp);
    cy.contains("button", "Submit").click();

    // Go to Admin panel again
    cy.url().should("include", "/chat");
    cy.get('button.btn.not-selected.btn-secondary.btn-sm').click();

    // Open "Become a Doctor" modal again
    cy.get('button.MuiIconButton-root').click();
    cy.contains("Become a Doctor").click();

    // Check for final confirmation text
    cy.contains("You're currently a Owner and Doctor").should("be.visible");
  });
});
