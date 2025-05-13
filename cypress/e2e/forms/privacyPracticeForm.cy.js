import testData from "../../support/testData";

function PrivacyPracticeForm() {
    cy.contains('a', 'Privacy Practice Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    cy.get('input[aria-label="Signature"]').click().type(testData?.ppSign);
    cy.get('input[type="button"][value="Complete"]').click();
}

export default PrivacyPracticeForm;