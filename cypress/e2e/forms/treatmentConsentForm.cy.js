import testData from "../../support/testData";

function TreatmentConsentForm() {
    cy.contains('a', 'Treatment Consent Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    cy.get('input[aria-label="Authorized Signature"]').click().type(testData?.tSign);
    cy.get('input[type="button"][value="Complete"]').click();
}

export default TreatmentConsentForm;