import {test} from '@playwright/test';

test('test', async ({page}) => {
  await page.goto('https://www.app.reselleros.com/login');
  await page
    .getByPlaceholder('Enter your email here!')
    .fill('naman@cloudanalogy.com');
  await page.getByPlaceholder('Minimum 8 characters').fill('Naman@123');
  await page.getByPlaceholder('Minimum 8 characters').press('Enter');
  await page.getByRole('complementary').getByLabel('right').click();
  await page.getByText('CRM Information').click();
  await page.getByText('Opportunity').click();
  await page.locator('button:has-text("Add Opportunity")').nth(0).click();
  // await page.getByLabel('Customer').click();

  await page.evaluate(() => {
    const messageDiv = document.createElement('div');
    messageDiv.id = 'customMessage';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.left = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = 'white';
    messageDiv.style.width = '250px';
    messageDiv.style.height = '120px';
    messageDiv.style.border = '1px solid #000';
    messageDiv.style.borderRadius = '12px';
    messageDiv.style.zIndex = '1000';
    messageDiv.innerHTML = `
    <h3>Customer value</h3>
  <p>This field is required to fill up the form.</p>
    <button id="close-popup">Close</button>
  `;
    document.body.appendChild(messageDiv);
    document.getElementById('close-popup').addEventListener('click', () => {
      messageDiv.style.display = 'none';
    });
  });
  async function waitForUserInput(selector, timeout = 90000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const value = await page.getByTestId(selector).innerText();
      if (value && value !== 'Select') {
        return true;
      }
      // Wait for a short period before checking again
      await page.waitForTimeout(500); // Adjust this value as needed
    }
    throw new Error(
      `Timeout: Select element did not get the value within ${timeout / 1000} seconds.`,
    );
  }

  await waitForUserInput('custom_select');
  await page.evaluate(() => {
    const messageDiv = document.getElementById('customMessage');
    if (messageDiv) {
      messageDiv.remove();
    }
  });
  await page.getByPlaceholder('Enter Text').fill('Opportunity Demo');
  await page.getByPlaceholder('Enter Amount').fill('2,352,4563');
  await page.getByLabel('Stages').click();
  await page.getByText('Develop').nth(3).click();
  // await page.getByRole('button', {name: 'Save'}).click();

  await page.pause();
});
