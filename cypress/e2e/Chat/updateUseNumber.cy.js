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

    it("update user number", () => {
        //change user number
        cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
        cy.url().should("include", "/chat");
        cy.get('div.header-middle button').contains('Admin').click();
        cy.wait(3000);
        cy.get('input[placeholder="Enter name or phone"]').clear({ force: true }).type(testData?.change_user_num, { force: true });
        cy.get('div.input-group-append button.input-group-text').click({ force: true });
        cy.wait(2000);
        cy.get('i.editMobileNo').click({ force: true });
        cy.wait(1000);
        cy.get('button[aria-label="Select country"]').click();
        cy.get('li[data-country-code="in"]').click();
        cy.get('input[type="tel"]').type(testData?.updated_user_num);
        cy.get('button.mobLoginBtn').click();
        cy.wait(3000);

        //go for logout
        cy.get('div.MuiAvatar-circular').click();
        cy.get('.dropdown-item').find('span').contains('Logout').click();

        //confirm logout
        cy.url().should('include', '/login');
        cy.get('button.swal-button--confirm').click();

        //relogin
        cy.task("log", "🔐 Starting Login Test");
        cy.visit(testData?.url);

        
        //try login with previous number
        cy.get('button[aria-label="Select country"]').click();
        cy.get('li[data-country-code="in"]').click();

        cy.get('input[type="tel"]').type(testData?.change_user_num);
        cy.contains("button", "Get OTP").click();
        cy.get('button.close').click();


        cy.get('input[type="tel"]').clear().type(`91${testData?.updated_user_num}`);
        cy.contains("button", "Get OTP").click();
        cy.wait(2000);
          
        cy.get('input[type="text"]').type(testData?.otp);
        cy.contains("button", "Submit").click();
        cy.wait(3000);
        //relogout
        cy.url().should('include', '/home');
        cy.wait(3000);
        cy.get('div.MuiAvatar-circular').click();
        cy.get('.dropdown-item').find('span').contains('Logout').click();
        
        //confirm logout
        cy.url().should('include', '/login');
        cy.get('button.swal-button--confirm').click();
        cy.wait(2000);
        //reset the number
        // cy.task("log", "🔐 Starting Login Test");
        // cy.visit(testData?.url);
        // cy.wait(2000);
        cy.get('button[aria-label="Select country"]').click();
        cy.get('li[data-country-code="in"]').click();
        cy.wait(1000);
        cy.get('input[type="tel"]').type(testData?.superAdmin);
        cy.contains("button", "Get OTP").click();
        cy.wait(1000);
          
        cy.get('input[type="text"]').type(testData?.otp);
        cy.contains("button", "Submit").click();

        cy.url().should("include", "/chat");
        cy.get('div.header-middle button').contains('Admin').click();
        cy.wait(1000);
        cy.get('input[placeholder="Enter name or phone"]').clear({ force: true }).type(testData?.updated_user_num, { force: true });
        cy.get('div.input-group-append button.input-group-text').click({ force: true });
        cy.wait(2000);
        cy.get('i.editMobileNo').click({ force: true });
        cy.wait(1000);
        cy.get('button[aria-label="Select country"]').click();
        cy.get('li[data-country-code="in"]').click();
        cy.get('input[type="tel"]').type(testData?.change_user_num);
        cy.get('button.mobLoginBtn').click();
        // Confirm Toast
        cy.get(".Toastify__toast--success", { timeout: 10000 })
        .should("be.visible")
        .and("contain.text", "Mobile number updated successfully!");
    });
});