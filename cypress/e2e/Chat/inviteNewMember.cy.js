import { inviteNewMemberConfig } from "../../fixtures/inviteMemberConfig"; // update path as needed

const { baseUrl, login, newMember } = inviteNewMemberConfig;

describe("Login and invite new member Group Feature Test", () => {
  before(() => {
    cy.session("login", () => {
      cy.task("log", "🔐 Starting Login Test");
      cy.visit(`${baseUrl}/login`);

      cy.get('button[aria-label="Select country"]').click();
      cy.get(`li[data-country-code="${login.countryCode}"]`).click();

      cy.get('input[type="tel"]').type(login.phoneNumber);
      cy.contains("button", "Get OTP").click();
      cy.get('input[type="text"]').type(login.otp);
      cy.contains("button", "Submit").click();

      cy.url().should("include", "/chat");
    });
  });

  it("should edit a group and invite a new member with Indian number", () => {
    cy.visit(`${baseUrl}/chat`);
    cy.url().should("include", "/chat");

    cy.task("log", "✏️ Starting Edit Group with Invite Test");

    // Click pencil icon to open edit group modal
    cy.get('i.fa-pencil[title="Edit Group"]').first().click();
    cy.get("#DZ_W_TimeLine").should("be.visible");

    // Click on "+ Invite New Members"
    cy.contains("button", "+ Invite New Members").click();

    // Fill first and last name
    cy.get('input[name="firstName"]').type(newMember.firstName);
    cy.get('input[name="lastName"]').type(newMember.lastName);

    // Select country
    cy.get('button[aria-label="Select country"]').click();
    cy.get(`li[data-country-code="${newMember.countryCode}"]`).click();

    // Enter phone number
    cy.get('input[name="phoneNumber"]').clear().type(newMember.phoneNumber);

    // Select User Role
    cy.contains("div", "Select User Role").should("be.visible").click();
    cy.get(`li[data-value="${newMember.userRole}"]`).should("be.visible").click();

    // Select User Type
    cy.contains("div", "Select User Type").should("be.visible").click();
    cy.get(`li[data-value="${newMember.userType}"]`).should("be.visible").click();

    // Select Specialization
    cy.contains("div", "Select Specialization").should("be.visible").click();
    cy.get(`li[data-value="${newMember.specialization}"]`).should("be.visible").click();

    // Click INVITE button
    cy.contains("button", "INVITE").should("not.be.disabled").click();

    // Click Update Group Info
    cy.contains("button", "Update Group Info")
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    // Confirm Toast
    cy.get(".Toastify__toast--success", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Group Info updated Successfully");
  });
});
