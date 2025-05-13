describe('Update Tag Category Alias Names', () => {
  const categories = [
    { categoryName: 'Topics', newAlias: 'Topics-1' },
    { categoryName: 'Treatment', newAlias: 'Treatment-1' },
    { categoryName: 'Workflow', newAlias: 'Workflow-1' },
    { categoryName: 'Conditions', newAlias: 'Conditions-1' },
    { categoryName: 'CustomTag1', newAlias: 'CustomTag1-1' },
    { categoryName: 'CustomTag2', newAlias: 'CustomTag2-1' }
  ];

  beforeEach(() => {
    // Login and navigate to tags-category page
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

    // Wait and open sidebar
    cy.get('button.btn.not-selected.btn-secondary.btn-sm', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get('.nav-control .hamburger', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Navigate to Tags List page
    cy.get('a[href="/tags-list"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    // ✅ Confirm we're on the Tags List page
    cy.url().should('include', '/tags-list');

    // Click on the Tags Category button
    cy.get('a[href="/tags-category"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    // ✅ Confirm we're on the Tags Category page
    cy.url().should('include', '/tags-category');
  });

  categories.forEach((category) => {
    it(`should update alias name for category ${category.categoryName}`, () => {
      // Find the row containing the category name and click the pencil icon
      cy.contains(category.categoryName)
        .parents('tr')
        .find('.table-actions .MuiSvgIcon-root')
        .click();

      // ✅ Verify the modal is open by checking the modal title
      cy.get('.modal-header .modal-title')
        .should('contain.text', 'Edit Tag Category Alias Name');

      // ✅ Clear the current alias name and type the new alias
      cy.get('.modal-body input.MuiInputBase-input', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(category.newAlias);

      // ✅ Submit the update
      cy.contains('button', 'Submit')
        .should('be.visible')
        .click();

      // ✅ Check updated alias appears and toast is shown
      cy.contains(category.newAlias).should('be.visible');
      cy.contains('.Toastify__toast', `Tag category Updated to ${category.newAlias}`, { timeout: 10000 })
        .should('be.visible')
        .then(($toast) => {
          cy.wrap($toast).find('button[aria-label="close"]').click();
        });
    });
  });
});
