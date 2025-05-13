describe("Add new tag from conversation", () => {
  const phoneNumber = "9300000000";

  const login = () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
    cy.get('button[aria-label="Select country"]').click();
    cy.get('li[data-country-code="in"]').click();
    cy.get('input[type="tel"]').type(phoneNumber);
    cy.contains("button", "Get OTP").click();
    cy.get('input[type="text"]').type("123456");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/chat");
  };

  it("Logs in and tags a conversation", () => {
    const tagName = "Sample Tag " + Date.now(); // generate a unique tag name

    login();

    // Step 1: Click first 'Add Tag' (bookmark) icon
    cy.get(".img_cont .fa-bookmark.withoutTag").first().click({ force: true });

    // Step 2: Click 'Add Tag' plus-circle icon
    cy.get("i.add-tag-icn").should("be.visible").click();

    // Step 3: Enter tag name in the input field
    cy.get('input[placeholder="Tag Name"]').should("be.visible").type(tagName);

    // Step 4: Click 'Submit' button
    cy.contains("button", "Submit").should("be.visible").click();

    // Step 5: Wait for modal to close and confirm toast message appears
    cy.contains("is added successfully", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
