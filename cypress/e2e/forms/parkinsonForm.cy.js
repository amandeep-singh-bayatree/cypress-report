function ParkinsonForm() {
    cy.contains('h4', 'Parkinson Disease Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input#sq_613i_0').click();
        cy.get('input#sq_614i_0').click();
        cy.get('input#sq_615i_0').click();
        cy.get('input#sq_616i_3').click();
        cy.get('input#sq_617i_0').click();
        cy.get('input#sq_618i_0').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default ParkinsonForm;