describe('Login, Tag Search, and Save Tag', () => {

  const patientInfo = {
    firstName: 'april',
    lastName: 'tenth',
    phoneNumber: '+919998880905',
  };
  
  before(() => {
    cy.session('userSession', () => {
      cy.visit('https://develop.di9bb30rgpciu.amplifyapp.com/login');
      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();
      cy.get('input[type="tel"]').type('9300000000');
      cy.contains('button', 'Get OTP').click();
      cy.get('input[type="text"]').type('123456');
      cy.contains('button', 'Submit').click();
      cy.url().should('include', '/chat');
    });
  });

  it("should open first conversation and click the last message tag icon only", () => {
    // Step 1: Visit chat page using saved session
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");

    // Step 2: Click on the first conversation
    cy.get(".convo-list-item")
      .first()
      .should("be.visible")
      .click({ force: true });

     // Step 3: Wait for messages to load
     cy.wait(500); // adjust based on load time if needed

     // Step 4: Click the last message-level tag icon (not conversation one)
     cy.get("i.fa-bookmark.taggpatient")
       .should("exist")
       .last()
       .click({ force: true });

       // 3. Check for "Create Patient" option
       cy.get('body').then($body => {
         if ($body.find('.create-patient-tag').length > 0) {
           // 3a. Click "Create Patient"
           cy.get('.create-patient-tag').click({ force: true });
   
           // 3b. Fill form fields using `patientInfo`
           cy.get('input[name="firstName"]')
             .should('be.visible')
             .type(patientInfo.firstName, { force: true });
   
           cy.get('input[name="lastName"]')
             .should('be.visible')
             .type(patientInfo.lastName, { force: true });
   
           cy.get('input[name="phoneNumber"]')
             .should('be.visible')
             .clear()
             .type(patientInfo.phoneNumber, { force: true });
   
           // 3c. Click "Create Patient" button
           cy.contains('button', 'Create Patient').click({ force: true });
   
           // 3d. Wait for toast and extra buffer before tagging
           cy.contains('Patient created successfully', { timeout: 10000 }).should('be.visible');
           cy.wait(1000); // Small buffer
         } else {
           // 4. Select first suggestion
           cy.get('.suggestions-container ul > li', { timeout: 10000 })
             .should('have.length.greaterThan', 0)
             .first()
             .click({ force: true });
         }
       });
   
       // 5. Click Save Tag
       cy.get('i.fa-check[title="Save Tag"]')
         .should('be.visible')
         .click({ force: true });
   
       // 6. Confirm tag saved
       cy.contains('Tag added successfully!').should('be.visible');
  });
});
