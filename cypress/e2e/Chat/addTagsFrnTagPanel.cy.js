describe("Add tag from chat tags section", () => {
  it("Add tag from tag section (Chat > Tag section)", () => {
    const tagName = `test-${Date.now()}`; // Dynamic tag name using timestamp

    // Visit login page
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    // Login as admin
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type("9300000000");
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();

    // Ensure we're on chat page
    cy.url().should("include", "/chat");

    // Click on the 'Tags' tab
    cy.get('button.first-panel-tab-btn').contains('Tags').click();

    // Click on the 'Add' button to open the add tag panel
    cy.get('i.fa.fa-plus[title="Add Workflow-1"]').click();

    // Enter the tag name in the input field
    cy.get('input[name="name"]').type(tagName);

    // Submit the form to add the tag
    cy.get('button[type="submit"]').contains('Submit').click();

    // Verify success message (Toast)
    cy.get('.Toastify__toast-body').should('contain.text', `${tagName} is added successfully to the Workflow-1`);
  });
});