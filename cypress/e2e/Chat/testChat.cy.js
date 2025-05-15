import { messagesToSend, convoName, users } from "../../fixtures/chatConfig";

describe("Chat Interaction: Sending and Receiving Messages", () => {

  const loginAndOpenChat = (phoneNumber) => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phoneNumber);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/chat");
    cy.contains(".convo-list-item", convoName).click({ force: true });
    cy.wait(1000);
  };

  it("User 1 sends multiple simple messages", () => {
    loginAndOpenChat(users.user1); // User 1

    messagesToSend.forEach((msg) => {
      cy.get("#textarea").type(msg);
      cy.get('button[type="submit"]').click();
      cy.wait(300); // simulate real typing delay
    });

    cy.get(".msg_cotainer_send").last().find(".message-container").should("contain.text", "Message 9");
  });

  it("User 2 receives all messages from User 1 (with scroll and count check)", () => {
    loginAndOpenChat(users.user2); // User 2
  
    // 🔴 Check unread message count badge before clicking on the chat
    cy.contains(".convo-list-item", convoName)
      .find(".notificationBadge")
      .should("be.visible")
      .and("contain.text", messagesToSend.length);
  
    // 📩 Click to open chat
    cy.contains(".convo-list-item", convoName).click({ force: true });
    cy.wait(1000);
  
    // Scroll to top before checking all messages
    cy.get("#DZ_W_Contacts_Body34").scrollTo("top");
  
    // Then verify each message
    messagesToSend.forEach((msg) => {
      cy.get(".msg_cotainer").contains(".message-container", msg).should("exist");
    });
  });
  
});
