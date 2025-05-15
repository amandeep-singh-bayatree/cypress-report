// Prevent Cypress from failing the test on uncaught app exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe("Import Users", () => {
  it("should import users from excel and login with imported user", () => {
    const filePath = 'cypress/fixtures/Sample.xlsx';

    // Visit login page
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    // Login as admin
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type("9300000000");
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();

    // Ensure we're on chat page
    cy.url().should("include", "/chat");

    // Navigate to Admin panel
    cy.get('button.btn.not-selected.btn-secondary.btn-sm').click();

    // Click the Import button
    cy.get('.add-download > div.theme-btn').contains("Import").click({ force: true });

    // Upload the Excel file
    cy.get('input[type="file"]#formFile').selectFile(filePath, { force: true });

    // Read Excel and extract phone number
    cy.task("readExcel", { filePath }).then((data) => {
      const rawPhone = data[0]["Phone Number"];
      cy.wrap(rawPhone).as("importedPhone");
      cy.log("Imported Phone Number:", rawPhone);
    });

    // Submit import
    cy.get('button').contains('Submit').should('not.be.disabled').click();

    // Close the modal after import
    cy.get('.modal-header .close.btn').click();

    // Logout admin
    cy.get('button.MuiIconButton-root').click();
    cy.contains('Logout').click();
    cy.contains('button', 'OK').click();

    // Login with imported user
    cy.get('@importedPhone').then((phone) => {
      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();
      cy.get('input[type="tel"]').clear().type(phone);
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();
    });
  });
});
