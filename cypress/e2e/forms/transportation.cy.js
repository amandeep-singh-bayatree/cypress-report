import testData from "../../support/testData";

function TransportationForm() {
    cy.contains('h4', 'Transportation Services').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get(`input[aria-label="Participant's Signature"]`).clear().type(testData?.authSign1);
        cy.get('input[type="button"][value="Complete"]').click();
}

export default TransportationForm;