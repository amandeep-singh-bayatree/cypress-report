import testData from '../support/testData';

describe("Login, Archive and Unarchive Conversation", () => {
    before(() => {
      cy.session("login", () => {
        cy.task("log", "🔐 Starting Login Test");
        cy.visit(testData?.url);
  
        cy.get('button[aria-label="Select country"]').click();
        cy.get('li[data-country-code="in"]').click();
  
        cy.get('input[type="tel"]').type(testData?.loginNumber);
        cy.contains("button", "Get OTP").click();
        cy.get('input[type="text"]').type(testData?.otp);
        cy.contains("button", "Submit").click();
  
        cy.url().should("include", "/chat");
      });
    });
  
    it("should search with recent tagged conversation", () => {
      cy.visit(testData?.url);
      cy.url().should("include", "/chat");
    
      const waitForLoader = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(5000);  // Small buffer to ensure the DOM settles
      };

      const searchConv = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(3000); 

        cy.get('.conversation-search.form-control')
        .type(`${testData?.conversationToSearch}{enter}`);
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(2000); 
        cy.get('.first-panel-tab-btn.btn').each(($button) => {
          cy.wrap($button).find('span').then(($span) => {
            if ($span.text().trim() === testData?.tagBtn) {
              cy.wrap($button).click();
              return
            }
          });
        });

        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(2000);
        cy.get('.MuiButtonBase-root.MuiTab-root').each(($button) => {
          cy.wrap($button).find('span').then(($span) => {
            if ($span.text().trim() === testData?.tags?.type) {
              cy.wrap($button).click({ force: true });
              return false; // stop the loop after clicking
            }
          });
        });

        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(2000);

        cy.get('#highlights-demo')
        .invoke('val')
        .then((value) => {
          cy.task('log', `Input value is: ${value}`);
          expect(value).to.not.be.empty;
    
          if (value === testData?.tags?.name) {
            cy.wait(3000);
            cy.get('.convo-list-item').each(($div) => {
              const span = $div.find('div.user_info span#conversation-name');
            
              if (span.length > 0) {  // span exists
                const name = span.text().trim().toLowerCase();
                if (name === testData?.conversationToSearch) {
                  cy.log('Found: ' + name);
                  cy.wrap($div).click({ force: true });
                  return false;  // break loop once found
                }
              }
            });
            // clickBookmarkIfFound();
          } else {
            cy.get('.MuiInputBase-root').type(`${testData?.tags?.name}{enter}`);
            cy.get('.MuiAutocomplete-popper li').first().click();
    
            cy.task("log", "⏳ Waiting for loader to disappear");
            cy.get(".loader", { timeout: 15000 }).should("not.exist");
            cy.wait(3000);
            cy.get('.convo-list-item').each(($div) => {
              const span = $div.find('div.user_info span#conversation-name');
              cy.log('Found: ' + span.text());
              if (span.length > 0) {  // span exists
                const name = span.text().trim().toLowerCase();
                if (name === testData?.conversationToSearch) {
                  cy.log('Found: ' + name);
                  cy.wrap($div).click({ force: true });
                  return false;  // break loop once found
                }
              }
            });
            // clickBookmarkIfFound();
          }
        });

      }
      const selectTag = () => {
        cy.task('log', `find div ${testData?.tags?.num}`);
        cy.get('div.dropdown').eq(testData?.tags?.num).find('button').click({ force: true });
        cy.wait(1000);  
        cy.get('a.dropdown-item').each(($el) => {
          const linkText = $el.text();
          if(linkText.toLowerCase() === testData?.tags?.name.toLowerCase()) {
            cy.wrap($el).scrollIntoView().should('be.visible').click({ force: true });
            cy.task('log', `✅ Clicked on link: ${linkText}`);
            cy.get('i.fa.fa-check.done-btn').click({ force: true });
            searchConv();
            return   // stops the each loop once found
          }
        });
      }
    
      const clickBookmarkIfFound = () => {
        cy.get('.convo-list-item').then(($divs) => {
          let found = false;
      
          // Use Cypress' built-in Promise resolution
          Cypress._.some($divs, (div) => {
            if (found) return true;  // stop if already found
      
            const text = div.querySelector('span#conversation-name')?.innerText?.toLowerCase();
      
            cy.task('log', `Conversation matched: ${text}`);
      
            if (text === testData?.conversationToSearch.toLowerCase()) {
              found = true;
              cy.wrap(div).find('i.fa-bookmark').click({ force: true });
              cy.task('log', `✅ Clicked bookmark for conversation: ${text}`);
              cy.wait(500);
              selectTag();
              return true;  // stops _.some loop
            }
          });
      
        });
      };
      

      waitForLoader();
      cy.get('#highlights-demo')
        .invoke('val')
        .then((value) => {
          cy.task('log', `Input value is: ${value}`);
          expect(value).to.not.be.empty;
    
          if (value === testData?.groupToSearch) {
            cy.wait(2500);
            clickBookmarkIfFound();
          } else {
            cy.get('.MuiInputBase-root').type(`${testData?.groupToSearch}{enter}`);
            cy.get('.MuiAutocomplete-popper li').first().click();
    
            cy.task("log", "⏳ Waiting for loader to disappear");
            cy.get(".loader", { timeout: 15000 }).should("not.exist");
            cy.wait(2500);
    
            clickBookmarkIfFound();
          }
        });
    });
    
    
  });
  