describe("Login and Group Feature Test", () => {
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

  it("should verify login and create a group", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "➕ Starting Add Group Test");

    cy.get('.icn-div i.fa-plus').click();
    cy.get("#DZ_W_TimeLine").should("be.visible");
    cy.contains("h4", "Create Group").should("be.visible");

    const randomGroupName = `Group ${Math.floor(Math.random() * 1000000)}`;
    cy.get('#outlined-name').type(randomGroupName);
    cy.get('#outlined-name').should('have.value', randomGroupName);

    cy.contains("button", "+ Add Existing Members").click();

    cy.get('.react-tags__search-input').clear().type("raj");
    cy.contains("rajshree sharma").click();
    cy.get('.react-tags__selected').should("contain.text", "rajshree sharma");

    cy.get('.react-tags__search-input').clear().type("manas");
    cy.contains("Manas Prasad").click();
    cy.get('.react-tags__selected').should("contain.text", "Manas Prasad");

    cy.get("button.addMember-btn").should("be.visible").click();

    cy.get("button").contains("CREATE GROUP")
      .should("be.visible")
      .should("not.be.disabled")
      .click();
  });
});
