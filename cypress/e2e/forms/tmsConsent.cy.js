import testData from "../../support/testData";

function TmsConsentForm() {
    cy.contains('h4', 'TMS Consent').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[aria-label="Signature"]').clear().type(testData?.authSign1);
        cy.get('input#sq_658i').clear().type(testData?.cnsnt_witnessFirstName);
        cy.get('input#sq_659i').clear().type(testData?.cnsnt_witnessLastName);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_663i_0').click();
        cy.get('input#sq_663i_1').click();
        cy.get('input#sq_663i_2').click();
        cy.get('input#sq_663i_3').click();
        cy.get('input#sq_663i_4').click();
        cy.get('input#sq_663i_5').click();
        cy.get('input#sq_663i_6').click();
        cy.get('input#sq_663i_7').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_664i_0').click();
        cy.get('input#sq_664i_1').click();
        cy.get('input#sq_664i_2').click();
        cy.get('input#sq_664i_3').click();
        cy.get('input#sq_665i_0').click();
        cy.get('input#sq_665i_1').click();
        cy.get('input#sq_665i_2').click();
        cy.get('input#sq_665i_3').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default TmsConsentForm;