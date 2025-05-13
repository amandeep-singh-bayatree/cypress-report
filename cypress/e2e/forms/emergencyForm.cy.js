import testData from '../..//support/testData';

function EmergencyForm() {
  cy.contains('h4', 'Emergency Form').click();

  const waitForLoading = () => {
    cy.task("log", "⏳ Waiting for loader to disappear");
    cy.get(".loader", { timeout: 15000 }).should("not.exist");
    cy.wait(1000);
  };
  waitForLoading();
  cy.get('input[type="button"][value="Start"]').click();
  cy.get(`input[aria-label="Patient's ID Number"]`).clear().type(testData?.emPatientId);
  cy.get('input[type="button"][value="Next"]').click();
  cy.get(`input#sq_123i`).clear().type(testData?.emMedFName);
  cy.get(`input#sq_124i`).clear().type(testData?.emMedLName);
  cy.get(`input#sq_126i`).clear().type(testData?.emMedPhone);
  cy.get('input[type="button"][value="Next"]').click();
  cy.get('input[type="button"][value="Next"]').click();
  cy.get('input[type="button"][value="Next"]').click();
  cy.get('input[value="No"]').click();
  cy.get('input[type="button"][value="Complete"]').click();
}

export default EmergencyForm;



// let testCase = 'Fail'; // default to fail

// describe("Login, Fill onboard forms", () => {
//   before(() => {
//     cy.session("login", () => {
//       cy.task("log", "🔐 Starting Login Test");
//       cy.visit(testData?.url);

//       cy.get('button[aria-label="Select country"]').click();
//       cy.get('li[data-country-code="in"]').click();

//       cy.get('input[type="tel"]').type('7140071400');
//       cy.contains("button", "Get OTP").click();

//       cy.wait(3000);

//       cy.get('input[type="text"]').type(testData?.otp);
//       cy.contains("button", "Submit").click();

//       cy.url().should("include", "/home");
//     });
//   });

//   it("fill forms", () => {
//     cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/home");
//     cy.url().should("include", "/home");
//     cy.contains('a', 'Emergency Form').click();

//     const waitForLoading = () => {
//       cy.task("log", "⏳ Waiting for loader to disappear");
//       cy.get(".loader", { timeout: 15000 }).should("not.exist");
//       cy.wait(1000);
//     };
//     waitForLoading();

//     cy.task('readCsv', 'emergencyForm.csv').then((emergencyData) => {
//         cy.get('svg.MuiSvgIcon-root').click();
//       cy.get('input[type="button"][value="Start"]').click();
//       cy.get(`input[aria-label="Patient's ID Number"]`).clear().type(emergencyData[0]?.patientId);
//       cy.get('input[type="button"][value="Next"]').click();
//       cy.get(`input#sq_123i`).clear().type(emergencyData[0]?.medicalFirstName);
//       cy.get(`input#sq_124i`).clear().type(emergencyData[0]?.medicalLastName);
//       cy.get(`input#sq_126i`).clear().type(emergencyData[0]?.medicalPhone);
//       cy.get('input[type="button"][value="Next"]').click();
//       cy.get('input[type="button"][value="Next"]').click();
//       cy.get('input[type="button"][value="Next"]').click();
//       cy.get('input[value="No"]').click();
//       cy.get('input[type="button"][value="Complete"]').click();

//       cy.wait(2500);
//       cy.get('a[href="/emergency"]').should('contain.text', 'Completed1');
//     });
//   });

//   afterEach(function () {
//     const result = [{
//       Form: "EmergencyForm",
//       Result: this.currentTest.state === 'passed' ? 'Pass' : 'Fail'
//     }];
//     cy.task('writeCsv', { fileName: 'emergencyFormResult.csv', data: result });
//   });
// });
