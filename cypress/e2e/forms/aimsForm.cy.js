function AimsForm() {
    cy.contains('h4', 'Aims Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_214 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('div#sq_215 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_216 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('div#sq_217 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_219 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('div#sq_220 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_222 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_224 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('div#sq_225 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('div#sq_226 label.sv_q_rating_item span.sv-string-viewer').contains(/^4$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default AimsForm;