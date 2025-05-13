describe("Image is sent by one user and received by another", () => {
  const senderPhone = "919300000000";
  const receiverPhone = "917800078000";

  const login = (phone) => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");

    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').clear().type(phone);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/chat");
  };

  it("Sender sends an image", () => {
    login(senderPhone);

    // Step 1: Open first conversation
    cy.get(".convo-list-item").first().click({ force: true });
    cy.wait(500);
    cy.get(".msg_cotainer").should("be.visible");

    // Step 2: Upload the image
    cy.get('i.fa-paperclip').click({ force: true });
    cy.get('input[type="file"]')
      .should("exist")
      .selectFile("cypress/fixtures/task priority.png", { force: true });

    // Step 3: Wait for upload
    cy.wait(5000);

    // Step 4: Click send
    cy.get('button[type="submit"]').click();

    // Step 5: Confirm image is sent
    cy.get(".msg_cotainer_send").last().within(() => {
      cy.get("img")
        .should("have.attr", "src")
        .and("include", "task%20priority.png");
    });

    cy.clearLocalStorage();
  });

  it("Receiver sees the image", () => {
    login(receiverPhone);

    // Step 1: Open the same conversation (assumes first one)
    cy.get(".convo-list-item").first().click({ force: true });
    cy.wait(1000);

    // Step 2: Check that image was received
    cy.get(".msg_cotainer").last().within(() => {
      cy.get("img")
        .should("have.attr", "src")
        .and("include", "task%20priority.png");
    });
  });
});
