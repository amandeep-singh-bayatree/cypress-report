import testData from "../../support/testData";

function ConsentProcedureForm() {
    cy.contains('h4', 'Consent for Procedure').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('textarea#sq_508i').clear().type(testData?.cnsnt_nameAndProced);
        cy.get('textarea#sq_509i').clear().type(testData?.cnsnt_portentialRisks);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('textarea#sq_510i').clear().type(testData?.cnsnt_outcomes);
        cy.get('textarea#sq_511i').clear().type(testData?.cnsnt_alternate);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_517i').clear().type(testData?.authSign1);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_520i').clear().type(testData?.cnsnt_dctrFirstName);
        cy.get('input#sq_521i').clear().type(testData?.cnsnt_dctrLastName);
        cy.get('input#sq_523i').clear().type(testData?.cnsnt_dctrsign);
        cy.get('input#sq_526i').clear().type(testData?.cnsnt_witnessFirstName);
        cy.get('input#sq_527i').clear().type(testData?.cnsnt_witnessLastName);
        cy.get('input#sq_529i').clear().type(testData?.cnsnt_witnesssign);
        cy.get('input[type="button"][value="Complete"]').click();
}

export default ConsentProcedureForm;