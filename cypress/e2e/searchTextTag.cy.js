describe("search text and tags", () => {
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
    cy.get(".convo-list-item").first().click({ force: true });
    cy.wait(1000); // wait for messages to load
  };

  it("Search text and check tag workflow", () => {
    loginAndOpenConversation();

    // Click on search icon
    cy.get('i.fa.fa-search[title="Find"]').click();

    // Type '22' into the search input
    cy.get("#msg-search-text").type("22");

    // Click on the search button icon
    cy.get("i.fa-search.search-text").click();

    // Verify the count text is correct (e.g., "1/2")
    cy.get(".search-msg span.mt-2.mr-4").should("contain.text", "1/2");

    // Click on the tag icon (bookmark)
    cy.get("i.fa-bookmark.taggpatient.taggColor").first().click({ force: true });

    // Check if "Workflow" tag is set to "22"
    cy.get(".tags-dropdown .convTagLabel")
      .contains("Workflow")
      .parent()
      .find("button")
      .should("contain.text", "22");
  });
});
                        
                    