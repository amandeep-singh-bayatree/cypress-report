import testData from "../../support/testData";

function FinancialAgreementForm() {
    cy.contains('a', 'Financial Agreement Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    cy.get('input[aria-label="Signature"]').click().type(testData?.fSign);
    cy.get('input[type="button"][value="Complete"]').click();
}

export default FinancialAgreementForm;