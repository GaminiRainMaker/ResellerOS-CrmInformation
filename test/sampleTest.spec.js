import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  // Access the data passed from the test environment options
  const data = testInfo.config.testEnvironmentOptions.data;

  // Log the data to verify it's received correctly
  console.log('Received data: testtttttt', data);

  // Use the data in your test
  // Example: navigating to a URL from the data
  if (data && data.url) {
    await page.goto(data.url);
  }

  // Add more test steps using the received data
  // Example: filling out a form with data fields
  if (data && data.formFields) {
    for (const field of data.formFields) {
      await page.fill(field.selector, field.value);
    }
  }

  // Perform assertions based on the data
  if (data && data.expectedTitle) {
    await expect(page).toHaveTitle(data.expectedTitle);
  }
});
