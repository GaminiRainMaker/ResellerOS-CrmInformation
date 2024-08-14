import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByLabel('Username').click();
  await page
    .getByLabel('Username')
    .fill('rjaiswal+betadealreg@rainmaker-llc.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('sfdc12345@');
  await page.getByRole('button', {name: 'Log In'}).click();
  await page.getByRole('link', {name: 'Accounts'}).click();
  await page.getByRole('button', {name: 'New'}).click();

  await page.getByLabel('*Account Name').click();
  await page.getByLabel('*Account Name').fill('Devops');
  await page.getByLabel('Account Number').click();
  await page.getByLabel('Account Number').fill('52345235666235662');
  await page.getByRole('textbox', {name: 'Account Site'}).click();
  await page
    .getByRole('textbox', {name: 'Account Site'})
    .fill('www.devops.com');

  await page.getByRole('textbox', {name: 'Phone'}).fill('114546532356');
  await page.getByRole('combobox', {name: 'Ownership'}).click();
    await page.getByText('Private').click();

  //   await page.evaluate(() => {
  //     const messageDiv = document.createElement('div');
  //     messageDiv.id = 'customMessage';
  //     messageDiv.style.position = 'fixed';
  //     messageDiv.style.top = '20px';
  //     messageDiv.style.left = '20px';
  //     messageDiv.style.padding = '10px';
  //     messageDiv.style.backgroundColor = 'white';
  //     messageDiv.style.width = '250px';
  //     messageDiv.style.height = '120px';
  //     messageDiv.style.border = '1px solid #000';
  //     messageDiv.style.borderRadius = '12px';
  //     messageDiv.style.zIndex = '1000';
  //     messageDiv.innerHTML = `
  //     <h3>Owner</h3>
  //   <p>This field is required to fill up the form.</p>
  //     <button id="close-popup">Close</button>
  //   `;
  //     document.body.appendChild(messageDiv);
  //     document.getElementById('close-popup').addEventListener('click', () => {
  //       messageDiv.style.display = 'none';
  //     });
  //   });

  //   async function waitForUserInput(selector, timeout = 90000) {
  //     const start = Date.now();
  //     while (Date.now() - start < timeout) {
  //       const value = await page.getByTestId(selector).innerText();
  //       if (value && value !== 'Select') {
  //         return true;
  //       }
  //       // Wait for a short period before checking again
  //       await page.waitForTimeout(500); // Adjust this value as needed
  //     }
  //     throw new Error(
  //       `Timeout: Select element did not get the value within ${timeout / 1000} seconds.`,
  //     );
  //   }

  //   await waitForUserInput('lgcp-1000013');
  //   await page.evaluate(() => {
  //     const messageDiv = document.getElementById('customMessage');
  //     if (messageDiv) {
  //       messageDiv.remove();
  //     }
  //   });

  await page.getByLabel('Billing Street').fill('California');
  await page.getByLabel('Shipping Street').fill('California');
  await page.getByLabel('Billing City').fill('city');
  await page.getByLabel('Billing State/Province').fill('state');
  await page.getByLabel('Shipping City').fill('city');
  await page.getByLabel('Shipping State/Province').fill('state');
  await page.getByLabel('Billing Zip/Postal Code').fill('623456');
  await page.getByLabel('Billing Country').fill('USA');
  await page.getByLabel('Shipping Zip/Postal Code').fill('63457');
  await page.getByLabel('Shipping Country').fill('USA');
  await page.getByRole('combobox', {name: 'Customer Priority'}).click();
  await page.getByText('Medium').click();
  await page.getByLabel('SLA Expiration Date').click();
  await page.getByLabel('-08-28').getByRole('button', {name: '28'}).click();
  await page.getByRole('combobox', {name: 'Active'}).click();
  await page.getByText('Yes').click();
  await page.getByLabel('Description').fill('This is a playwright demo.');

  await page.pause();
});
