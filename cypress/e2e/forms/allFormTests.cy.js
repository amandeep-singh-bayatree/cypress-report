import testData from '../..//support/testData';
import RegistrationFormTest from './registrationForm.cy';
import patientInformationForm from './patientInfoForm.cy';
import RecordReleaseForm from './recordReleaseForm.cy';
import TreatmentConsentForm from './treatmentConsentForm.cy';
import OpioidConsentForm from './opioidConsentForm.cy';
import PrivacyPracticeForm from './privacyPracticeForm.cy';
import PatientRightsForm from './patientRightsForm.cy';
import DischargeForm from './dischargeForm.cy';
import FinancialAgreementForm from './financialAgreementForm.cy';
import EmergencyForm from './emergencyForm.cy';
import SocialEmotionalForm from './socialEmotionalForm.cy';
import AimsForm from './aimsForm.cy';
import VestibularForm from './vestibularForm.cy';
import FamilyCaregiverForm from './familyCaregiverForm.cy';
import AuthorizationForm from './authorizationForm.cy';
import ConsentProcedureForm from './consentProcedureForm.cy';
import TmsConsentForm from './tmsConsent.cy';
import TransportationForm from './transportation.cy';
import AppealForm from './appealfForm.cy';
import ParkinsonForm from './parkinsonForm.cy';
import AlzheimerForm from './alzheimerForm.cy';
import IntakeForm from './intakeForm.cy';

describe("Login, Fill onboard forms", () => {
    before(() => {
        cy.session("login", () => {
            cy.task("log", "🔐 Starting Login Test");
            cy.visit(testData?.url);
          
            cy.get('button[aria-label="Select country"]').click();
            cy.get('li[data-country-code="in"]').click();
          
            const randomNumber = '7' + Math.floor(100000000 + Math.random() * 900000000);
            cy.get('input[type="tel"]').type(randomNumber);
            cy.contains("button", "Get OTP").click();
          
            // Replacing direct DOM manipulation with Cypress commands
            cy.contains('button', 'Patient').click(); // This should find and click the button with the text "Patient"
            cy.task('log', "✅ 'Patient' button found and clicked.");
            cy.wait(3000);
          
            cy.get('input[type="text"]').type(testData?.otp);
            cy.contains("button", "Submit").click();
          
            cy.url().should("include", "/home");
          });
          
    });

    it("fill forms", () => {
        cy.visit("https://develop.di9bb30rgpciu.amplifyapp.com/home");
        cy.url().should("include", "/home");
        RegistrationFormTest();
        cy.wait(2500);
        patientInformationForm();
        cy.wait(2500);
        RecordReleaseForm();
        cy.wait(2500);
        TreatmentConsentForm();
        cy.wait(2500);
        OpioidConsentForm();
        cy.wait(2500);
        PrivacyPracticeForm();
        cy.wait(2500);
        PatientRightsForm();
        cy.wait(2500);
        DischargeForm();
        cy.wait(2500);
        FinancialAgreementForm();
        cy.wait(2500);
        EmergencyForm();
        cy.wait(2500);
        SocialEmotionalForm();
        cy.wait(2500);
        AimsForm();
        cy.wait(2500);
        VestibularForm();
        cy.wait(2500);
        FamilyCaregiverForm();
        cy.wait(2500);
        AuthorizationForm();
        cy.wait(2500);
        ConsentProcedureForm();
        cy.wait(2500);
        TmsConsentForm();
        cy.wait(2500);
        TransportationForm();
        cy.wait(2500);
        AppealForm();
        cy.wait(2500);
        ParkinsonForm();
        cy.wait(2500);
        AlzheimerForm();
        cy.wait(2500);
        IntakeForm();
    });
});