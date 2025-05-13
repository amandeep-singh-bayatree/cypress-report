const { defineConfig } = require("cypress");
const moment = require("moment"); // Using moment for timestamp formatting
const fs = require('fs');
const path = require('path');

// Generate timestamp in MM-DD-YYYY_HH-mm-ss format (US style)
const timestamp = moment().format("MM-DD-YYYY_HH-mm-ss");
const reportFilename = `Report_${timestamp}`;

module.exports = defineConfig({
  projectId: "t4kun3",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,  // Enable HTML report
    json: true, // Disable individual JSON files
    embeddedScreenshots: true,
    inlineAssets: true,
    "saveJson": true,
    reportPageTitle: "Cypress Report",
    reportFilename: reportFilename, // Custom timestamped filename
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        async readCsv(fileName) {
          const neatCSV = (await import('neat-csv')).default;

          // Ensure path and fs are being used correctly here
          const filePath = path.resolve(__dirname, 'cypress', 'fixtures', fileName);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          return await neatCSV(fileContent);
        },
        writeCsv({ fileName, data }) {
          const csvRows = [Object.keys(data[0]).join(',')];
          data.forEach(row => {
            csvRows.push(Object.values(row).join(','));
          });
    
          const output = csvRows.join('\n');
          const outputPath = path.resolve(__dirname, 'cypress', 'downloads', fileName);
          fs.writeFileSync(outputPath, output);
          return null;
        },
        log(message) {
          console.log(`[LOG]: ${message}`);
          return null;
        },
        error(message) {
          console.error(`[ERROR]: ${message}`);
          return null;
        },
      });

      return config;
    },
    env: {
      baseUrl: "https://develop.di9bb30rgpciu.amplifyapp.com",
      debugMode: true,
    },
    defaultCommandTimeout: 10000,
    retries: 2,
    viewportWidth: 1440,
    viewportHeight: 1000,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
