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

    it("change admin settings", () => {
        cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
        cy.url().should("include", "/chat");
        cy.get('div.header-middle button').contains('Admin').click();
        cy.wait(3000);
        cy.get('div.hamburger').click();
        cy.get('a[href="/settings"]').should('be.visible').click();
        cy.wait(3000);
        const selectSessionTimeOut = (type) => {
            if(type === 'weeks'){
                cy.get('input#inline-weekly-radio').click();
                cy.get('select[name="sessionTimeout.weekly.day"]').select('Monday');
                cy.get('input[name="sessionTimeout.weekly.time"]').type(testData?.weekly_time);
            }
            if(type === 'days'){
                cy.get('input#inline-daily-radio').click();
                cy.get('input[name="sessionTimeout.daily.day"]').clear().type(testData?.days_duration);
            }
            if(type === 'hours') {
                cy.get('input#inline-hourly-radio').click();
                cy.get('input[name="sessionTimeout.hourly.hour"]').clear().type(testData?.hours_duration);
            }
        }
        selectSessionTimeOut(testData?.sessionType);
        cy.get('input[name="smsReminder.enable"]').then(($input) => {
            if ($input.val() === 'false') {
              cy.wrap($input).click();
              cy.get('input[name="smsReminder.time"]').type(testData?.weekly_time)
            }
        });
        cy.get('input[name="autoArchiveConversation"]').clear().type(testData?.auto_archive_dur);
        cy.contains('button', 'Save Settings').click();

        // Confirm settings saved
        cy.contains("Settings saved successfully", {
            timeout: 10000,
        }).should("be.visible");
    });
});