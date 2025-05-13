describe("Login and Click Task Status", () => {
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

  it("should verify login and click on task status image until it's Done", () => {
    cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/chat");
    cy.url().should("include", "/chat");

    cy.task("log", "⏳ Waiting for loader to disappear");
    cy.get(".loader", { timeout: 15000 }).should("not.exist");

    const clickUntilDone = () => {
      cy.get(".task-status img")
        .first()
        .should("exist")
        .scrollIntoView()
        .then(($img) => {
          const el = $img[0]; // Get the raw DOM element
          const title = el.getAttribute("title");
          cy.task("log", `🔍 Current task status: ${title}`);

          if (title === "Done") {
            cy.log("✅ Task is already done. No further action needed.");
            return;
          }

          cy.log("🖱️ Clicking on Task Status...");
          el.click();

          // Wait for status change, then recheck
          cy.wait(1000);
          cy.get(".task-status img")
            .first()
            .invoke("attr", "title")
            .then((newTitle) => {
              if (newTitle !== "Done") {
                clickUntilDone(); // Keep clicking until it reaches "Done"
              } else {
                cy.log("✅ Task is now Done!");
              }
            });
        });
    };

    clickUntilDone();
  });
});
