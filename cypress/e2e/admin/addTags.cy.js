describe('Complete Tag Creation Workflow', () => {
  const tags = [
    { name: 'Patient Onboarding', type: 'Workflow' },
    { name: 'Therapy Assessment', type: 'Treatment' },
    { name: 'Endocrinology', type: 'Topics' },
    { name: 'Arthritis', type: 'Conditions' },
    { name: 'Coverage Check', type: 'CustomTag1' },
    { name: 'Study Enrollment', type: 'CustomTag2' }
  ];
  
  
  beforeEach(() => {
    // Login and navigate to tags creation page
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

    cy.visit('https://develop.di9bb30rgpciu.amplifyapp.com/chat');
    cy.get('button.btn.not-selected.btn-secondary.btn-sm').click();
    cy.get('.nav-control .hamburger').click();
    cy.get('a[href="/tags-list"]').click();
    cy.get('.mr-auto a[href="/tags"]').click();
  });

  tags.forEach((tag, index) => {
    it(`should successfully create tag ${index + 1}: ${tag.name} (${tag.type})`, () => {
      // 1. Fill tag name
      cy.get('input[name="name"]')
        .should('be.empty')
        .type(tag.name)
        .should('have.value', tag.name);


      cy.get('[role="combobox"][aria-haspopup="listbox"]').click();
      cy.get('[role="listbox"]').should('be.visible');
      
      // Scroll to and select the option
      cy.get(`li[data-value="${tag.type}"]`)
        .scrollIntoView()
        .should('be.visible')
        .click();

      // 3. Verify dropdown selection
      cy.get('[role="combobox"]')
        .should('contain', tag.type);

      // 4. Submit the form
      cy.contains('button', 'Submit')
        .should('be.enabled')
        .click();

      // 5. Verify success toast message
      cy.contains('.Toastify__toast', 'Tag added successfully!', { timeout: 10000 })
        .should('be.visible')
        .then(($toast) => {
          // Close the toast to prevent interference with next tests
          cy.wrap($toast).find('button[aria-label="close"]').click();
        });

      // 6. Verify form is reset
      cy.get('input[name="name"]').should('have.value', '');
      
    
    });
  });
});