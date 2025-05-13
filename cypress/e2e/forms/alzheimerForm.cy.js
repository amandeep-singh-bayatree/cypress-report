function AlzheimerForm() {
    cy.contains('h4', `Alzheimer's Disease`).click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input#sq_794i_0').click();
        cy.get('input#sq_794i_1').click();
        cy.get('input#sq_794i_2').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_796i_0').click();
        cy.get('input#sq_796i_2').click();
        cy.get('input#sq_796i_5').click();
        cy.get('input#sq_798i_3').click();
        cy.get('input#sq_798i_5').click();
        cy.get('input#sq_798i_6').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_800i_0').click();
        cy.get('input#sq_801i_0').click();
        cy.get('input#sq_802i_0').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default AlzheimerForm;