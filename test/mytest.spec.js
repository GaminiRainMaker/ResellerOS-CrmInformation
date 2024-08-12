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

  const selectedOption = page
    .getByTestId('custom_select')
    .locator('option[selected="selected"]');
  console.log('selectedOption', selectedOption);

  if (selectedOption) {
    await page.getByPlaceholder('Enter Text').fill('Opportunity Demo');
    await page.getByPlaceholder('Enter Amount').fill('2,352,4563');
    await page.getByLabel('Stages').click();
    await page.getByText('Develop').nth(3).click();
    // await page.getByRole('button', {name: 'Save'}).click();
  }

  await page.pause();
});
