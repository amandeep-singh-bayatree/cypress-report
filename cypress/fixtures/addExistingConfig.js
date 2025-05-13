import addExistingConfig from "../fixtures/addExistingConfig"; 

const { baseUrl, phoneNumber, otp, existingMembers } = addExistingConfig;

describe("Login and Group Feature Test", () => {
  before(() => {
    cy.session("login", () => {
      cy.task("log", "🔐 Starting Login Test");
      cy.visit(`${baseUrl}/login`);

      cy.get('button[aria-label="Select country"]').click();
      cy.get('li[data-country-code="in"]').click();

      cy.get('input[type="tel"]').type(phoneNumber);
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type(otp);
      cy.contains("button", "Submit").click();

      cy.url().should("include", "/chat");
    });
  });

  it("should verify login and edit a group with existing members", () => {
    cy.visit(`${baseUrl}/chat`);
    cy.url().should("include", "/chat");

    cy.task("log", "✏️ Starting Edit Group Test");

    // Click on the pencil icon to edit a group
    cy.get('i.fa-pencil[title="Edit Group"]').first().click();
    cy.get("#DZ_W_TimeLine").should("be.visible");

    // Add existing members
    cy.contains("button", "+ Add Existing Members").click();

    existingMembers.forEach((memberName) => {
      cy.get(".react-tags__search-input").clear().type(memberName);
      cy.contains(memberName, { matchCase: false }).click();
      cy.get(".react-tags__selected").should("contain.text", memberName);
    });

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
