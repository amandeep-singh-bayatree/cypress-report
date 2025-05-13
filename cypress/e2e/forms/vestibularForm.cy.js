function VestibularForm() {
    cy.contains('h4', 'Vestibular Assessment Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[name="question5_sq_238"][value="3"]').click();
        cy.get('input[name="question6_sq_239"][value="4"]').click();
        cy.get('input[name="question734_sq_240"][value="2"]').click();
        cy.get('input[name="question8_sq_241"][value="3"]').click();
        cy.get('input[name="question9_sq_242"][value="3"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[name="question10_sq_243"][value="3"]').click();
        cy.get('input[name="question11_sq_244"][value="4"]').click();
        cy.get('input[name="question12_sq_245"][value="3"]').click();
        cy.get('input[name="question13_sq_246"][value="3"]').click();
        cy.get('input[name="question14_sq_247"][value="2"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[name="question16_sq_249"][value="6"]').click();
        cy.get('input[name="question17_sq_250"][value="4"]').click();
        cy.get('input[name="question18_sq_251"][value="4"]').click();
        cy.get('input[name="question19_sq_252"][value="6"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[name="question28_sq_264"][value="3"]').click();
        cy.get('input[name="question29_sq_265"][value="3"]').click();
        cy.get('input[name="question30_sq_266"][value="2"]').click();
        cy.get('input[name="question31_sq_267"][value="3"]').click();
        cy.get('input[name="question32_sq_268"][value="3"]').click();
        cy.get('input[name="question33_sq_269"][value="4"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[name="question34_sq_270"][value="4"]').click();
        cy.get('input[name="question35_sq_271"][value="3"]').click();
        cy.get('input[name="question36_sq_272"][value="2"]').click();
        cy.get('input[name="question37_sq_273"][value="4"]').click();
        cy.get('input[name="question38_sq_274"][value="4"]').click();
        cy.get('input[name="question39_sq_275"][value="2"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_288i_0').click();
        cy.get('input#sq_288i_1').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default VestibularForm;