describe("Remove member from group", () => {
  before(() => {
    cy.session("login", () => {
      cy.task("log", "🔐 Starting Login Test");
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();

      cy.get('input[type="tel"]').type("9300000000");
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type("123456");
      cy.contains("button", "Submit").click();

      cy.url().should("include", "/chat");
    });
  });

  it("should edit a group and remove member", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "✏️ Starting Edit Group Test");

    // Open Edit Group Modal
    cy.get('i.fa-pencil[title="Edit Group"]').first().click();
    cy.get("#DZ_W_TimeLine").should("be.visible");

    // Remove Manas Prasad
    cy.contains("tr", "Manas Prasad")
      .within(() => {
        cy.get('a').contains("Remove").click();
      });

    // Confirm removal toast
    cy.get(".Toastify__toast--success", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Member removed Successfully. Please click on UPDATE GROUP INFO button to save.");

    // Click Update Group Info button
    cy.contains("button", "Update Group Info").click();

    // Confirm final success toast
    cy.get(".Toastify__toast--success", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Group Info updated Successfully");
  });
});
