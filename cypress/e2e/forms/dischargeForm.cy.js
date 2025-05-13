import testData from "../../support/testData";

function DischargeForm() {
    cy.contains('a', 'Discharge Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[aria-label="Signature"]').click().clear().type(testData?.dSign);
        cy.get('input[aria-label="Office Administrator Signature"]').click().clear().type(testData?.dAdmSign);
        cy.get('input#sq_498i').click().clear().type(testData?.dDate);
        cy.get('input[type="button"][value="Complete"]').click();
}

export default DischargeForm;