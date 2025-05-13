function SocialEmotionalForm() {
    cy.contains('a', 'Social and Emotional Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_293 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_294 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_295 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_296 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_297 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_298 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_299 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_300 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_301 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_302 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('div#sq_303 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_304 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_305 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_306 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_307 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('div#sq_308 span.sv-string-viewer').contains(/^Yes$/).click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default SocialEmotionalForm;