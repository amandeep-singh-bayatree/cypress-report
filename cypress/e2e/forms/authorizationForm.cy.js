import testData from "../../support/testData";

function AuthorizationForm() {
    cy.contains('h4', 'Authorization Form').click();
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
        cy.get('input[aria-label="Hospital"]').clear().type(testData?.hospitalName);
        cy.get('input[aria-label="Address of Hospital"]').clear().type(testData?.hospitalAddress);
        cy.get('input[aria-label="Provider"]').clear().type(testData?.providerName);
        cy.get('input[aria-label="Address of Provider"]').clear().type(testData?.providerAddress);
        cy.get('input[aria-label="Attorney"]').clear().type(testData?.attorneyName);
        cy.get('input[aria-label="Address of Attorney"]').clear().type(testData?.AttorneyAddress);
        cy.get('input[aria-label="Family"]').clear().type(testData?.familyName);
        cy.get('input[aria-label="Address of Family Member"]').clear().type(testData?.familyAddress);
        cy.get('input[type="button"][value="Next"]').click();
        cy.get('input[aria-label="Authorized Signature"]').clear().type(testData?.authSign1);
        cy.get('input[type="button"][value="Complete"]').click();
}

export default AuthorizationForm;