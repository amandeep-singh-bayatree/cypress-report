function FamilyCaregiverForm() {
    cy.contains('h4', 'Family Caregivers Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_587 label.sv-boolean span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_588 label.sv-boolean span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_589 label.sv-boolean span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default FamilyCaregiverForm;