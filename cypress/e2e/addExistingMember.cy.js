describe("Login and add existing member", () => {
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

  it("should verify login and edit a group with existing members", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "✏️ Starting Edit Group Test");

    // Click on the pencil icon to edit a group
    cy.get('i.fa-pencil[title="Edit Group"]').first().click();

    cy.get("#DZ_W_TimeLine").should("be.visible");

    // Add existing members
    cy.contains("button", "+ Add Existing Members").click();

    cy.get(".react-tags__search-input").clear().type("raj");
    cy.contains("rajshree sharma").click();
    cy.get(".react-tags__selected").should("contain.text", "rajshree sharma");

    cy.get(".react-tags__search-input").clear().type("manas");
    cy.contains("Manas Prasad").click();
    cy.get(".react-tags__selected").should("contain.text", "Manas Prasad");

    cy.get("button.addMember-btn").should("be.visible").click();

    cy.contains("button", "Update Group Info")
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.contains(".Toastify__toast", "Group Info updated Successfully", {
      timeout: 10000,
    }).should("be.visible");
  });
});
