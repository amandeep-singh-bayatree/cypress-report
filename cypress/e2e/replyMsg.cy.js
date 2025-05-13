describe("Chat Interaction: reply Message", () => {
  const phoneNumber = "9300000000";

  const loginAndOpenFirstConversation = () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phoneNumber);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/chat");
    cy.get(".convo-list-item").first().click({ force: true });
    cy.wait(1000); // Ensure messages are loaded
  };

  it("Logs in, replies to a message, types new message and sends it", () => {
    loginAndOpenFirstConversation();

    // Click the last three-dot menu and choose "Reply"
    cy.get(".threeDot-Btn-right").last().click({ force: true });
    cy.contains("li", "Reply").click();

    // Type message in the textarea
    cy.get("textarea#textarea").type("hi reply msg");

    // Click the send button
    cy.get('button[type="submit"][name="chat"]').click();

    // Verify the replied message format in the message container
    cy.get(".msg_cotainer_send").last().within(() => {
      cy.get(".fa-mail-reply").should("exist");
      cy.contains("span", "hello").should("exist"); // new message typed
    });
  });
});
