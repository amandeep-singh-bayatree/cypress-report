describe('Login, Tag Search, and Save Tag', () => {
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

  it('should search and save tag for patient "manas"', () => {
    cy.visit('https://develop.di9bb30rgpciu.amplifyapp.com/chat');

    // 1. Open Add Tag
    cy.get('i[title="Add Tag"]')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // 2. Type into input
    cy.get('input[placeholder="Search patient"]')
      .first()
      .should('exist')
      .type('manas', { force: true });

    // 3. Select first suggestion (force click)
    cy.get('.suggestions-container ul > li', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .first()
      .click({ force: true });

    // 3a. Click the "Set conversation name to patient name" checkbox
    cy.get('input#saveAsPatientName')
      .should('be.visible')
      .click({ force: true });

    // 4. Click Save Tag
    cy.get('i.fa-check[title="Save Tag"]')
      .should('be.visible')
      .click({ force: true });
  });
});