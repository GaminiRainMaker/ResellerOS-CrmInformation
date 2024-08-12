// playwright.config.js
const {defineConfig} = require('@playwright/test');

module.exports = defineConfig({
  timeout: process.env.CI ? 250000 : 200000,
  globalTimeout: process.env.CI ? 1500000 : 1000000,
  projects: [
    {
      name: 'chromium',
      use: {browserName: 'chromium'},
    },
    {
      name: 'firefox',
      use: {browserName: 'firefox'},
    },
    {
      name: 'webkit',
      use: {browserName: 'webkit'},
    },
  ],
});
