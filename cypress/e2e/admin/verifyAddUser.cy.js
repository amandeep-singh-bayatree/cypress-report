import users from "../../fixtures/users";

describe("User Login Verification Test", () => {
  users.forEach((user) => {
    it.skip(`verifies login for ${user.phoneNumber}`, () => {
      // Step 1: Visit login page
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
      
      // Step 2: Select country (India)
      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();
      
      // Step 3: Enter user's phone number
      cy.get('input[type="tel"]').clear().type(user.phoneNumber);
      
      // Step 4: Get and enter OTP
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();
      
      // Step 5: Verify successful login based on user role
      if (user.userRole === "Patient") {
        cy.url().should("include", "/home");
      } else {
        cy.url().should("include", "/chat");
      }
      
      // Step 6: Click on user profile dropdown
      cy.get('#user-profile').click();
      
      // Step 7: Verify phone number format in dropdown
      const formattedPhone = user.phoneNumber.replace('+91', '').replace(/(\d{5})(\d{4})/, '$1-$2');
      cy.get('.dropdown-menu.show').within(() => {
        cy.contains('div', `+91 ${formattedPhone}`).should('be.visible');
      });
      
      // Step 8: Logout
      cy.get('.dropdown-menu.show').contains('Logout').click();
      
      // Step 9: Verify logout
      cy.url().should("include", "/login");
      cy.get('input[type="tel"]').should('be.visible');
    });
  });
});