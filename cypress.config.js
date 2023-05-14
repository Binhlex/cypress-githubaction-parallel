const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://demoqa.com",
     specPattern:"cypress/e2e/**/*.spec.js"
  },
  env: {
    userName: "binhle6",
    password: "Binh@123456",
    userId: "c1f70dca-fa15-4efe-8b5c-0f73a797599f",
    isbn: "9781593277574",
  }
});
