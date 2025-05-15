import testData from '../../support/testData';

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
  
    it("should search with conversation name, show matched conversations", () => {
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
      cy.url().should("include", "/chat");
    
      cy.task("log", "⏳ Waiting for loader to disappear");
      cy.get(".loader", { timeout: 15000 }).should("not.exist");
      cy.wait(1000); 
      if(testData?.search){
      cy.get('.conversation-search.form-control')
        .type(`${testData?.searchString}{enter}`);
        cy.wait(2500); 
      }

      cy.task("log", "⏳ Waiting for loader to disappear");
      cy.get(".loader", { timeout: 15000 }).should("not.exist"); 
      if(testData?.isUnread){
        cy.get('input#unreadConvCheck').click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist"); 
        cy.wait(2500); 
      }

      if(testData?.isArchive){
        cy.get('input#archiveCheckBox').click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist"); 
        cy.wait(2500); 
      }

      if(testData?.isStatusOpen || testData?.isStatusDone || testData?.isStatusPending){
        cy.get('i.fa-filter').click();
        cy.wait(500); 
      }
      if(testData?.isStatusOpen){
        cy.get('input[type="checkbox"][id="status1"]').click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist"); 
        cy.wait(2500); 
      }
      if(testData?.isStatusPending){
        cy.get('input[type="checkbox"][id="status2"]').click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist"); 
        cy.wait(2500); 
      }
      if(testData?.isStatusDone){
        cy.get('input[type="checkbox"][id="status3"]').click();
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist"); 
        cy.wait(2500); 
      }
    
      cy.get('body').then($body => {
        if ($body.find('.first-panel-tab-btn').length > 0) {
          cy.get(".MuiAutocomplete-endAdornment").click();
          cy.get('.first-panel-tab-btn').each(($btn) => {
            cy.wrap($btn).scrollIntoView().should("be.visible").click();
            cy.wrap($btn).find('span').invoke('text').then((text) => {
              if (text.trim() === 'Favorites') {   // <-- match exact text
                if(testData?.search){
                // ✅ Your logic for the "Favorites" button
                cy.get('span#conversation-name').then(($span) => {
                  if ($span.length > 0) {
                    const text = $span.text().toLowerCase();
                    cy.task("log", text);
                
                    if (text.includes(testData?.searchString)) {
                      cy.task("log", "⏳ convo-matched--------------------------------");
                      expect(text).to.contain(testData?.searchString);
                      return;
                    } 
                  }
                });
              }
              if(testData?.isUnread){
                cy.get('.convo-list-item').each(($div) => {
                  const div = $div.find('div.chat-action div.extra-details div.notification-count');
                
                  if (div.length > 0) { //div exist
                    cy.task("log", "⏳ unread conv found--------------------------------");
                  }
                });
                return;
              }
              if(testData?.isArchive){
                cy.get('.convo-list-item').each(($el) => {
                  if ($el.find('div.chat-action div .archivedConvo').length > 0) {
                    // If archived SVG is found inside this .convo-list-item
                    cy.wrap($el).should('contain', 'Archived'); // or whatever assertion or action you want
                  } else {
                    // If no archived SVG is found
                    cy.wrap($el).should('contain', 'Archived'); // or handle accordingly
                    cy.task("log", "⏳-----------Found not unarchived conv");
                    return;
                  }
                });
              }
                // Do your next steps here...
              }
            });
        
            cy.task("log", "⏳ Waiting for loader to disappear");
            cy.get(".loader", { timeout: 15000 }).should("not.exist");
        
            cy.get('body').then(($body) => {
              if ($body.find('[role="tab"]').length > 0) {
        
                cy.get('[role="tab"]').each(($tab) => {
                  if (Cypress.$($tab).css("display") !== "none") {
                    cy.wrap($tab).scrollIntoView().should("be.visible").click();
        
                    cy.task("log", "⏳ Waiting for loader to disappear");
                    cy.get(".loader", { timeout: 15000 }).should("not.exist");
        
                    cy.task("log", "🌟 Attempting to open dropdown");
                    cy.get('.MuiInputBase-root').click(); // open each time
        
                    cy.get('.MuiAutocomplete-popper li', { timeout: 10000 })
                      .should('have.length.greaterThan', 0)  // Ensure options are present
                      .then(($options) => {
        
                        // Iterate using plain JS loop to handle dropdown reopen
                        for (let i = 0; i < $options.length; i++) {
                          cy.get('.MuiInputBase-root').click(); // open each time
                          cy.get('.MuiAutocomplete-popper li').eq(i).click();
        
                          cy.task("log", `✅ Selected option index: ${i}`);
                          // cy.get(".loader", { timeout: 15000 }).should("not.exist");
                          cy.task("log", "⏳ Waiting for loader to disappear");
                          cy.get(".loader", { timeout: 15000 }).should("not.exist");
                          cy.wait(3000); 
                          cy.get('.MuiInputBase-input').then(($input) => {
                            const inputValue = $input.val()?.toLowerCase();
                            cy.task("log", `group-name ---------- ${inputValue}`);
                            if (inputValue?.includes(testData?.searchString) && testData?.search) {
                              cy.task("log", inputValue);
                              expect(inputValue).to.include(testData?.searchString);
                            }
                            if (!inputValue?.includes(testData?.searchString) && testData?.search) {
                                cy.document().then((doc) => {
                                    const span = doc.querySelector('span#conversation-name');
                                    
                                    if (span) {
                                      const text = span.textContent.toLowerCase();
                                      cy.task("log", text);
                                  
                                      if (text.includes(testData?.searchString)) {
                                        cy.task("log", "⏳ convo-matched--------------------------------");
                                        expect(text).to.contain(testData?.searchString);
                                      } else {
                                        cy.get('.convo-list-item').last().click();
                                        cy.task("log", "⏳ first div selected---------------------------------");
                                        cy.get(".loader", { timeout: 15000 }).should("not.exist");
                                        cy.wait(3000); 
                                        cy.get('.fa-info-circle').click();
                                        cy.wait(2000); 
                                        cy.get('.conversation-info').then(($elements) => {
                                          const texts = [...$elements].map(el => el.innerText.toLowerCase());
                                          cy.task("log", texts);
                                          const found = texts.some(text => text.includes(testData?.searchString));
                                          expect(found, `"search string" should exist in at least one div`).to.be.true;
                                        });
                                      }
                                  
                                    } else {
                                        //for no conversations
                                      cy.task("log", "❌ span#conversation-name not found, skipping.");
                                    }
                                  });                                                                                                                                
                            }
                            if(testData?.isUnread){
                                cy.document().then((doc) => {
                                    const span = doc.querySelector('span#conversation-name');
                                    if(span){
                                        cy.get('.convo-list-item').each(($div) => {
                                        const div = $div.find('div.chat-action div.extra-details div.notification-count');
                                        
                                        if (div.length > 0) { //div exist
                                            cy.task("log", "⏳ unread div found--------------------------------");
                                        }
                                        });
                                    }
                                })
                            }
                            if(testData?.isArchive){
                                cy.document().then((doc) => {
                                    const span = doc.querySelector('span#conversation-name');
                                    if(span){
                                        cy.get('.convo-list-item').each(($el) => {
                                            const hasArchivedSvg = $el.find('div.chat-action div .archivedConvo').length > 0;
                                            if (hasArchivedSvg) {
                                            // If archived SVG is found inside this .convo-list-item
                                            cy.task("log", "✅ ArchivedConvo icon found in this convo item");// or whatever assertion or action you want
                                            } else {
                                            // If no archived SVG is found
                                            cy.wrap($el).should('contain', 'Archived'); 
                                            cy.task("log", "⏳-----------Found not unarchived conv");
                                            }
                                        });
                                    }
                                })
                            }
                            if(!testData?.isStatusOpen && (testData?.isStatusDone || testData?.isStatusPending)){
                                cy.document().then((doc) => {
                                    const span = doc.querySelector('span#conversation-name');
                                    if(span){
                                        cy.get('.convo-list-item').each(($el) => {
                                            const hasOpenStatus = $el.find('div.chat-action div.task-status i[title="Open"]').length >= 0;
                                            if (hasOpenStatus) {
                                            // If archived SVG is found inside this .convo-list-item
                                            cy.task("log", "✅ open convo icon found in this convo item");// or whatever assertion or action you want
                                            cy.wrap($el).should('not.contain', 'open');
                                            }
                                        });
                                    }
                                })
                            }
                            if(!testData?.isStatusDone && (testData?.isStatusPending || testData?.isStatusOpen) ){
                                cy.document().then((doc) => {
                                    const span = doc.querySelector('span#conversation-name');
                                    if(span){
                                        cy.get('.convo-list-item').each(($el) => {
                                        const hasDoneStatus = $el.find('div.chat-action div.task-status i[title="Done"]').length >= 0;
                                        if (hasDoneStatus) {
                                            // If archived SVG is found inside this .convo-list-item
                                            cy.task("log", "✅ done convo icon found in this convo item");// or whatever assertion or action you want
                                            cy.wrap($el).should('not.contain', 'done'); 
                                        }
                                        });
                                    }
                                })
                            }
                            if(!testData?.isStatusPending && (testData?.isStatusDone || testData?.isStatusOpen) ){
                                cy.document().then((doc) => {
                                    const span = doc.querySelector('span#conversation-name');
                                    if(span){
                                        cy.get('.convo-list-item').each(($el) => {
                                            const hasPendingStatus = $el.find('div.chat-action div.task-status i[title="Pending"]').length >= 0;
                                            if (hasPendingStatus) {
                                            // If archived SVG is found inside this .convo-list-item
                                            cy.task("log", "✅ pending convo icon found in this convo item");// or whatever assertion or action you want
                                            cy.wrap($el).should('not.contain', 'Pending'); 
                                            }
                                        });
                                    }
                                })
                            }
                          });
                        }
                      });
                  }
                  cy.wait(1000);
                });
        
              } else {
                cy.task("log", "⚠️ No tabs found, checking favorites tab.");
                cy.get('span#conversation-name')
                  .invoke('text')
                  .then((text) => {
                    expect(text.toLowerCase()).to.contain(testData?.searchString);
                  });
              }
            });
          });
        }
        else {
          cy.task("log", "⏳ No Result Found");
        }
      })
    
    });
    
  });
  