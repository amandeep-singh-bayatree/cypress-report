describe("Login, Archive and Unarchive Conversation", () => {
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

  it("should archive, show archived conversations, then unarchive", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "⏳ Waiting for loader to disappear");
    cy.get(".loader", { timeout: 15000 }).should("not.exist");

    // Archive the conversation
    cy.task("log", "📁 Clicking the archive icon...");
    cy.get('[data-testid="ArchiveOutlinedIcon"][title="Archive Conversation"]')
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    cy.task(
      "log",
      "✅ Archive icon clicked, waiting for confirmation modal..."
    );
    cy.get(".radio-container")
      .should("be.visible")
      .within(() => {
        cy.contains("button", "Yes").click({ force: true });
      });

    cy.task("log", "✅ Archive confirmed, waiting for toast message...");
    cy.contains("Conversation marked as archived successfully.").should(
      "be.visible"
    );

    cy.task("log", "✅ Archive toast displayed!");

    // Show archived conversations
    cy.task("log", "📌 Clicking on 'Show archive conversations' checkbox...");
    cy.get("#archiveCheckBox").should("be.visible").check({ force: true });

    cy.task("log", "✅ Archived conversations are now visible!");

    // Unarchive the conversation
    cy.task("log", "📤 Clicking the unarchive icon...");
    cy.get(
      '[data-testid="ArchiveOutlinedIcon"][title="Unarchive Conversation"]'
    )
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    cy.task(
      "log",
      "✅ Unarchive icon clicked, waiting for confirmation modal..."
    );
    cy.get(".radio-container") // assuming the modal stays the same
      .should("be.visible")
      .within(() => {
        cy.contains("button", "Yes")
          .should("be.visible")
          .click({ force: true });
      });

    cy.task("log", "✅ Unarchive confirmed, waiting for toast message...");
    cy.contains("Conversation marked as unarchived successfully.").should(
      "be.visible"
    );

    cy.task("log", "✅ Unarchive toast displayed! Test completed.");
  });
});
