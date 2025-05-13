import testData from "../../support/testData";

function PatientRightsForm() {
    cy.task('log', 'yes')
    cy.contains('h4', 'Patient Rights').click();
    cy.task('log', 'yes1')
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    cy.get('input[aria-label="Patient Signature"]').click().type(testData?.prSign);
    cy.get('input[type="button"][value="Complete"]').click();
}

export default PatientRightsForm;