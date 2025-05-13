import testData from "../../support/testData";

function IntakeForm() {
    cy.contains('b', 'Intake Questions').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
        cy.get('input[type="button"][value="Start"]').click();
        const formattedDate = new Date().toLocaleDateString('en-US'); // MM/DD/YYYY
        cy.get('input[aria-label="Choose your upcoming visit date"]').clear().type(formattedDate);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_181i_0').click();
        cy.get('input#sq_181i_1').click();
        cy.get('input#sq_181i_2').click();
        cy.get('input#sq_181i_3').click();
        cy.get('input#sq_181i_4').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('textarea#sq_182i').clear().type(testData?.intake_add_change);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[aria-label="Test"]').clear().type(testData?.intake_test);
        cy.get('input[aria-label="Approximate Date"]').clear().type(testData?.intake_test_date);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_815i_0').click();
        cy.get('input[aria-label="Approximate Date"]').clear().type(testData?.intake_office_test);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('textarea#sq_193i').clear().type(testData?.intake_main_problems);
        cy.get('input[type="button"][value="Next"]').click();
        // cy.get('input#sq_839i_0').click();
        // cy.get('input#sq_840i_0').click();
        // cy.get('ul.sv-list > li').eq(1).click();
        // cy.wait(300);
        // cy.get('input#sq_841i_0').click();
        // cy.get('ul.sv-list > li').eq(3).click();
        // cy.wait(300);
        // cy.get('input#sq_842i_0').click();
        // cy.get('ul.sv-list > li').eq(4).click();
        // cy.wait(300);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_204i_1').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_206i_0').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_207i_1').click();
        cy.get('input#sq_208i_2').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_209i_3').click();
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input#sq_210i_0').click();
        cy.get('input#sq_210i_1').click();
        cy.get('input#sq_210i_2').click();
        cy.get('input#sq_210i_3').click();
        cy.get('input#sq_210i_4').click();
        cy.get('input#sq_210i_5').click();
        cy.get('input#sq_210i_6').click();
        cy.get('input[type="button"][value="Complete"]').click();
}

export default IntakeForm;