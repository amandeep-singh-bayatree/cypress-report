describe("Chat Interaction: send sms", () => {
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

  it("Logs in and send sms", () => {
    loginAndOpenFirstConversation();

    // Open the Send SMS modal
    cy.get(".threeDot-Btn-right").last().click({ force: true });
    cy.contains("li", "Send SMS").click();

    // Select first recipient checkbox
    cy.get(".sms-recipient-list input[type='checkbox']").first().check({ force: true });

    // Message is already typed: 'hello', so skip typing

    // Click Send SMS button
    cy.get('button.SendSmsButton').click();

    // Confirm toast message
    cy.contains("SMS sent successfully!").should("be.visible");

    // Wait for message to appear
    cy.wait(2000); // Adjust based on your app's behavior

    // Confirm the last message has the envelope icon
    cy.get(".msg_cotainer_send").last().within(() => {
      cy.get("i.fa-envelope").should("be.visible");
    });
  });
});
