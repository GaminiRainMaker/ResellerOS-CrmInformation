import {test, expect} from '@playwright/test';

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
  await page.getByLabel('Customer').click();

  await page.evaluate(() => {
    // Create a new div element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'customMessage';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.left = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = 'yellow';
    messageDiv.style.border = '2px solid black';
    messageDiv.style.zIndex = '1000';
    messageDiv.innerText = 'Please fill in the select field manually.';

    // Append the message to the body
    document.body.appendChild(messageDiv);
  });

  // Function to repeatedly check if the select element has the expected value
  async function waitForUserInput(selector, timeout = 30000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const value = await page.getByTestId(selector).innerText();
      console.log('valuevalue', value);

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

  // await page.waitForFunction(async () => {
  //   const value = await page
  //     .getByTestId('custom_select')
  //     .evaluate('el => el.options[el.selectedIndex].text');
  //   return value ? true : false;
  // });

  await page.getByPlaceholder('Enter Text').fill('Opportunity Demo');
  await page.getByPlaceholder('Enter Amount').fill('2,352,4563');
  await page.getByLabel('Stages').click();
  await page.getByText('Develop').nth(3).click();
  // await page.getByRole('button', {name: 'Save'}).click();

  await page.pause();
});
