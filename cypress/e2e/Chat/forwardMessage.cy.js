describe("Forward msg", () => {
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

  it("Logs in and forward message", () => {
    loginAndOpenConversation();

    // Click the last message's three-dot menu
    cy.get(".threeDot-Btn-right").last().click({ force: true });
    cy.contains("li", "Forward").click();

    // Type and select 'test 009' from the user list
    cy.get('input[type="search"]').first().type("test 009");
    cy.contains("li", "test 009").click();

    // Search for conversation named 'test-msgs'
    cy.get('input[type="search"]').type("test-msgs");

    // Wait for the convo to show and click Send
    cy.contains("li", "test-msgs").find("button").contains("Send").click();

    // Click the Done button to close modal
    cy.get("button.closeModalBtn").contains("Done").click();

    // Wait for message to appear in chat box
    cy.get(".msg_cotainer_send")
      .last()
      .within(() => {
        // Check that the message contains the forwarded icon
        cy.get("i.fa-mail-forward").should("exist");

        // Check that the message text contains "hello"
        cy.contains("hello").should("exist");
      });
  });
});
