describe("Copy Paste msg", () => {
  const phoneNumber = "9300000000";

  const loginAndOpenConversation = () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phoneNumber);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/chat");
    cy.contains(".convo-list-item", "test-msgs").click({ force: true });
    cy.wait(1000);
  };

  it("Logs in, copies, pastes, sends the message, and verifies it", () => {
    loginAndOpenConversation();

    cy.get(".threeDot-Btn-right").last().click({ force: true });
    cy.contains("li", "Copy").click();

    cy.window().then((win) => {
      return win.navigator.clipboard.readText();
    }).then((textFromClipboard) => {
      const trimmedText = textFromClipboard.trim(); // Remove trailing space

      cy.log("Copied text:", trimmedText);
      cy.get("textarea#textarea")
        .clear()
        .type(trimmedText);
      
      cy.get('button[type="submit"]').click();

      // Verify the last sent message matches the copied text
      cy.get(".msg_cotainer_send").last().within(() => {
        cy.get(".message-container span").invoke("text").then((sentText) => {
          expect(sentText.trim()).to.equal(trimmedText);
        });
      });
    });
  });
});
