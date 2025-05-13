import testData from "../../support/testData";

function AppealForm() {
    cy.contains('h4', 'Appeal Utilization').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input#represent1').click();
        cy.get('input#represent2').clear().type(testData?.appeal_rep);
        cy.get('input#release').click();
        cy.get('input[aria-label="Signature"]').clear().type(testData?.authSign1);
        cy.get('input#sq_539i_0').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#consent1').click();
        cy.get('input#consent2').clear().type(testData?.appeal_rep2);
        cy.get('input[aria-label="Signature"]').clear().type(testData?.authSign1);
        cy.get('input#sq_559i_0').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default AppealForm;