import testData from "../../support/testData";

function patientInformationForm() {
    cy.contains('a', 'Patient Information Form').click();
    const waitForLoading = () => {
        cy.task("log", "⏳ Waiting for loader to disappear");
        cy.get(".loader", { timeout: 15000 }).should("not.exist");
        cy.wait(1000); 
    }
    waitForLoading();
    cy.get('input[type="button"][value="Start"]').click();
    // cy.get('input[type="button"][value="Next"]').click();
    cy.get('input[value="Right hand"]').click();
    cy.get('input[value="Mild Pain"]').click();
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('textarea[aria-label="What problems are you having?"]').click().type(testData?.pProblem);
    cy.get('textarea[aria-label="Originally started"]').click().type(testData?.pStarted);
    cy.get('textarea[aria-label="Frequency"]').click().type(testData?.pFrequency);
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('input[aria-label="Test"]').click().type(testData?.pTest);
    cy.get('input[aria-label="Date"]').click().type(testData?.pDate);
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('input[aria-label="Surgery"]').click().type(testData?.pSurgery);
    cy.get('input[aria-label="Date"]').click().type(testData?.pDate);
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('input#sq_447i_0').click();
    cy.get('input#sq_447i_1').click();
    cy.get('input#sq_447i_2').click();
    cy.get('input#sq_447i_3').click();
    cy.get('input#sq_447i_4').click();
    cy.get('input#sq_447i_5').click();
    cy.get('input#sq_447i_6').click();
    cy.get('input#sq_447i_7').click();
    cy.get('input#sq_447i_8').click();
    cy.get('input#sq_447i_9').click();
    cy.get('input#sq_447i_10').click();
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('textarea[aria-label="Please list all medications you are currently taking."]').click().type(testData?.pMedication);
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('textarea[aria-label="Allergic or sensitive to any medications?"]').click().type(testData?.psensMed);
    cy.get('input[name="smoke_sq_450"][value="no"]').click();
    cy.get('input[name="drink_sq_451"][value="no"]').click();
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('input[value="alone"]').click();
    cy.get('textarea[aria-label="Occupation if applicable"]').click().type(testData?.pOcc);
    cy.get('input[type="button"][value="Next"]').click();
    cy.get('input#sq_456i_0').click();
    cy.get('input#sq_456i_1').click();
    cy.get('input#sq_456i_2').click();
    cy.get('input#sq_456i_3').click();
    cy.get('input#sq_456i_4').click();
    cy.get('input#sq_456i_5').click();
    cy.get('input#sq_456i_6').click();
    cy.get('input#sq_456i_7').click();
    cy.get('input#sq_456i_8').click();
    cy.get('input#sq_456i_9').click();
    cy.get('input#sq_456i_10').click();
    cy.get('input#sq_456i_11').click();
    cy.get('input#sq_456i_12').click();
    cy.get('input#sq_456i_13').click();
    cy.get('input#sq_456i_14').click();
    cy.get('input#sq_456i_15').click();
    cy.get('input#sq_456i_16').click();
    cy.get('input#sq_456i_17').click();
    cy.get('input#sq_456i_18').click();
    cy.get('input[type="button"][value="Complete"]').click();
}

export default patientInformationForm;
