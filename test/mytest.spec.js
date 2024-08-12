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
  // await page.getByLabel('Customer').click();

  // await page.locator('.ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search').first().click();
  // await page
  //   .locator('div')
  //   .filter({hasText: /^Demo 6$/})
  //   .nth(1)
  //   .click();
  // await page.getByPlaceholder('Enter Text').fill('Opportunity Demo5');
  // await page.getByPlaceholder('Enter Amount').fill('425,3453');
  // await page.getByLabel('Stages').click();
  // await page.getByText('Qualify').nth(3).click();


  await page
    .locator(
      '.ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search',
    )
    .first()
    .click();

  // Assuming the user provides the option text
  const userProvidedText = 'Demo 6'; // Replace this with dynamic input if necessary

  // Locate the option with the desired text
  const option = page
    .locator('div')
    .filter({hasText: new RegExp(`^${userProvidedText}$`)})
    .nth(1);

  // Log the text content of the option for verification
  const optionText = await option.textContent();
  console.log('Option Text:', optionText);

  // Proceed only if the option is found
  if ((await option.count()) > 0) {
    await option.click();

    // Fill in the form fields
    await page.getByPlaceholder('Enter Text').fill('Opportunity Demo5');
    await page.getByPlaceholder('Enter Amount').fill('425,3453');
    await page.getByLabel('Stages').click();
    await page.getByText('Qualify').nth(3).click();
  }

  await page.pause();
});

// import {test, expect} from '@playwright/test';

// test('test', async ({page}) => {
//   await page.goto('https://www.app.reselleros.com/login');
//   await page
//     .getByPlaceholder('Enter your email here!')
//     .fill('naman@cloudanalogy.com');
//   await page.getByPlaceholder('Minimum 8 characters').fill('Naman@123');
//   await page.getByPlaceholder('Minimum 8 characters').press('Enter');
//   await page.getByRole('complementary').getByLabel('right').click();
//   await page.getByText('CRM Information').click();
//   await page.getByText('Opportunity').click();
//   await page.locator('button:has-text("Add Opportunity")').nth(0).click();
//   await page.getByLabel('Customer').click();

//   const selectedOption = page
//     .getByTestId('custom_select')
//     .locator('option[selected="selected"]');
//   console.log('selectedOption', selectedOption);

//   if (selectedOption) {
//     await page.getByPlaceholder('Enter Text').fill('Opportunity Demo');
//     await page.getByPlaceholder('Enter Amount').fill('2,352,4563');
//     await page.getByLabel('Stages').click();
//     await page.getByText('Develop').nth(3).click();
//     // await page.getByRole('button', {name: 'Save'}).click();
//   }

//   await page.pause();
// });
