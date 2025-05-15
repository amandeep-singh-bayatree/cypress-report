import testData from '../../support/testData';

describe("Login", () => {
    before(() => {
        cy.session("login", () => {
            cy.task("log", "🔐 Starting Login Test");
            cy.visit(testData?.url);
          
            cy.get('button[aria-label="Select country"]').click();
            cy.get('li[data-country-code="in"]').click();

            cy.get('input[type="tel"]').type(testData?.superAdmin);
            cy.contains("button", "Get OTP").click();
          
            // Replacing direct DOM manipulation with Cypress commands
            // cy.contains('button', 'Patient').click(); // This should find and click the button with the text "Patient"
            // cy.task('log', "✅ 'Patient' button found and clicked.");
            cy.wait(3000);
          
            cy.get('input[type="text"]').type(testData?.otp);
            cy.contains("button", "Submit").click();
          
            cy.url().should("include", "/chat");
          });
          
    });

    it("Logout ", () => {
        cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
        cy.url().should("include", "/chat");
        cy.get('div.MuiAvatar-circular').click();
        cy.get('.dropdown-item').find('span').contains('Logout').click();
        //confirm logout
        cy.url().should('include', '/login');
    });
});