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

  // Function to repeatedly check if the select element has the expected value
  async function waitForSelectValue(selector, timeout = 30000) {
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

  await waitForSelectValue('custom_select');

  const selectedOption = await page.getByTestId('custom_select').innerText();
  // expect(selectedOption).not.toBeEmpty();
  console.log('selectedOption', selectedOption);

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
