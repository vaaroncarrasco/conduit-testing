const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demo.realworld.io/#',
  },
  env: {
    apiURL: 'https://api.realworld.io/api',
    userEmail: 'hajeda3721@galotv.com',
    userPassword: 'elpepe'
  }
});
