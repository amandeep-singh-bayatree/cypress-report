import testData from "../../support/testData";

function OpioidConsentForm() {
    cy.contains('a', 'Opioid Consent Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    cy.get('input#pAgreementInput2').click().type(testData?.oAgreement1);
    cy.get('input#pAgreementInput3').click().type(testData?.oAgreement2);
    cy.get('input#pAgreementInput4').click().type(testData?.oAgreement3);
    cy.get('input[aria-label="Patient Signature"]').click().type(testData?.oPSign);
    cy.get('input[aria-label="Prescriber First Name"]').click().type(testData?.oPFName);
    cy.get('input[aria-label="Prescriber Last Name"]').click().type(testData?.oPLName);
    cy.get('input[aria-label="Prescriber Signature"]').click().type(testData?.oPSign);
    cy.get('input[type="button"][value="Complete"]').click();
}

export default OpioidConsentForm;