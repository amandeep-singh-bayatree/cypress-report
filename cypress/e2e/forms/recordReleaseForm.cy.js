import testData from "../../support/testData";

function RecordReleaseForm() {
    cy.contains('a', 'Records Release / Authorization Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    cy.get('input[aria-label="Authorizing Signature"]').click().type(testData?.rrSign);
    cy.get('input[aria-label="Print Name"]').click().type(testData?.rrPrintName);
    cy.get('input[aria-label="Relationship to the patient"]').click().type(testData?.rrRel);
    cy.get('input[type="button"][value="Complete"]').click();
}

export default RecordReleaseForm;