import testData from "../../support/testData";
describe("send critical notification", () => {

  
    const login = (phone) => {
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
  
      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();

      cy.get('input[type="tel"]').type(phone);
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();
      cy.url().should("include", "/chat");
    };
  
    it("Sender sends a critical notification", () => {
      login(testData?.Admin);
        cy.get('button.MuiButtonBase-root span').contains('Internal Providers').click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.get('div.MuiInputBase-root input') // Replace with your actual selector
        .click() // Open the dropdown if needed
        .type('Super Admin', { delay: 100 }); // Add delay to simulate typing

        // Wait for options to render and select the first one
        cy.get('.MuiAutocomplete-popper li')
        .should('be.visible')
        .first()
        .click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
      // Step 1: Open first conversation
      cy.get(".convo-list-item").first().click({ force: true });
      cy.task("log", "⏳ Waiting for loader to disappear");
      cy.get(".loader", { timeout: 15000 }).should("not.exist");
    //   cy.get(".msg_cotainer").should("be.visible");

      //mention user
      cy.get('textarea#textarea')
      .clear()
      .type('@@', { delay: 200 })
      .type('{enter}', { delay: 200 })
      .should('be.visible') // optional assertion to confirm field is still there
      .type('hello are you there?');
  
      // Step 4: Click send
      cy.get('button[type="submit"]').click();
  
     
      // logout 
      cy.get('div.MuiAvatar-circular').click();
        cy.get('.dropdown-item').find('span').contains('Logout').click();
        //confirm logout
        cy.url().should('include', '/login');

        //relogin
        login(testData?.superAdmin);
        cy.get('button.first-panel-tab-btn span').contains('Notifications').click();
        cy.get(".convo-list-item").first().within(() => {
          cy.get('div.user_info span[title="@@SuperAdmin hello are you there?"]').click();
        }); 
    });
  });
  