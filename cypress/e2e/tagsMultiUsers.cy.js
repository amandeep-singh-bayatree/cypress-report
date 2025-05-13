describe("Workflow Tag Verification", () => {
  describe("First User - Tag Message", () => {
    before(() => {
      cy.session("firstUserSession", () => {
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

    it("should tag the first conversation's last message with Digital Innovation", () => {
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");

      // Open first conversation
      cy.get(".convo-list-item").first().click({ force: true });
      cy.wait(500);

      // Tag the last message
      cy.get("i.fa-bookmark.taggpatient").last().click({ force: true });
      cy.contains(".convTagLabel.font-color", "Workflow")
        .next()
        .find("button.dropdown-toggle")
        .click();
      cy.get(".dropdown-menu.show").contains("a", "Digital Innovation").click();
      cy.get('i.fa-check[title="Save Tag"]').click({ force: true });
      cy.contains("Tag added successfully!").should("be.visible");
    });
  });

  describe("Second User - Verify Tag", () => {
    before(() => {
      cy.session("secondUserSession", () => {
        cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/login");
        cy.get('button[aria-label="Select country"]').click();
        cy.get('li[data-country-code="in"]').click();
        cy.get('input[type="tel"]').type("7800078000");
        cy.contains("button", "Get OTP").click();
        cy.get('input[type="text"]').type("123456");
        cy.contains("button", "Submit").click();
        cy.url().should("include", "/chat");
      });
    });

    it("should verify Workflow tag has 'Digital Innovation' selected in tagged message", () => {
      cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");

      // Open the first conversation
      cy.get(".convo-list-item").first().click({ force: true });
      cy.wait(1000);

      // Click the tag icon on the last message
      cy.get("i.fa-bookmark.taggpatient.taggColor")
        .last()
        .click({ force: true });

      // Get the first dropdown (assumed to be Workflow) and assert its value
      cy.get(".dropdown-toggle").eq(0).should("contain", "Digital Innovation");
    });
  });
});
