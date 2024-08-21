import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
  await page.goto(
    'https://partners.salesforce.com/pdx/s/login/?language=en_US',
  );
  await page
    .locator('c-pc-login-tbid')
    .getByRole('button', {name: 'Log in'})
    .click();

  await page.getByRole('button', {name: 'Continue with Salesforce'}).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('rjaiswal@rainmakercloud.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('sfdc54321_1');
  await page.getByRole('button', {name: 'Log In'}).click();

  // Check if the text "Verification Code" exists on the page
  const verificationTextExists = await page.isVisible(
    'text="Verify Your Identity"',
  );

  console.log('verificationTextExists', verificationTextExists);

  if (verificationTextExists) {
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
      <h3>Verification Code</h3>
      <p>Please Enter the verification code.</p>
      <button id="close-popup">Close</button>
    `;
      document.body.appendChild(messageDiv);
      document.getElementById('close-popup').addEventListener('click', () => {
        messageDiv.style.display = 'none';
      });
    });

    async function waitForUserInput(
      selector,
      timeout = 900000,
      typingDelay = 2000,
    ) {
      console.log('Waiting for user input in selector:', selector);
      const start = Date.now();
      let lastValue = '';
      let lastTypedTime = Date.now();
      while (Date.now() - start < timeout) {
        const inputElement = await page?.$(`#${selector}`);
        const value = await inputElement?.inputValue();
        console.log('Current input value:', value);
        if (value !== lastValue) {
          lastValue = value;
          lastTypedTime = Date?.now();
        }
        if (
          value?.trim() !== '' &&
          Date?.now() - lastTypedTime >= typingDelay
        ) {
          return true;
        }
        await page.waitForTimeout(500);
      }
      throw new Error(
        `Timeout: Input field did not get a value within ${timeout / 1000} seconds.`,
      );
    }

    await waitForUserInput('tc');
    await page.getByRole('button', {name: 'Verify'}).click();
  } else {
    console.log('There is no verification required');
  }

  await page.waitForTimeout(7000);

  await page.getByRole('menuitem', {name: 'Manage Submenu'}).click();
  await page.getByRole('menuitem', {name: 'Leads/Deals'}).click();
  await page.getByRole('button', {name: 'New Lead/Deal'}).click();
  await page.getByRole('button', {name: 'Next'}).click();
  await page.locator('#input-185').click();
  await page.locator('#input-185').fill('ASUS');
  await page.locator('#input-193').click();
  await page.locator('#input-193').fill('New York');
  await page.locator('#input-198').click();
  await page.locator('#input-198').fill('New York');
  await page
    .locator('#select-201')
    .selectOption('USStatesList.a15300000015jARAAY');
  await page.locator('#input-206').click();
  await page.locator('#input-206').fill('13011');
  await page.locator('#RADIO-LABEL-0-207 span').first().click();
  await page.locator('#input-220').fill('');
  await page.locator('#input-220').click();
  await page.locator('#input-220').fill('2');
  await page.locator('lightning-primitive-input-checkbox span').nth(1).click();
  await page.getByRole('button', {name: 'Next'}).click();
  await page.locator('#input-280').fill('Demo');
  await page.locator('#input-285').click();
  await page.locator('#input-285').fill('lastname');
  await page.locator('#input-295').click();
  await page.locator('#input-295').fill('demo@gmail.com');
  await page.locator('#input-300').click();
  await page.locator('#input-300').fill('1234567890');
  await page.locator('#input-290').click();
  await page.locator('#input-290').fill('Devops');
  await page
    .locator('flowruntime-input-wrapper2')
    .filter({hasText: 'Validation of Customer Consent'})
    .locator('span')
    .nth(1)
    .click();
  await page.getByRole('button', {name: 'Next'}).click();
  await page.getByPlaceholder('you@example.com').click();
  await page.getByPlaceholder('you@example.com').press('ControlOrMeta+a');
  await page.getByPlaceholder('you@example.com').fill('demo@gmail.com');
  await page.getByLabel('Phone').click();
  await page.getByLabel('Phone').fill('1234567890');
  await page.getByRole('button', {name: 'Next'}).click();
  await page.getByRole('button', {name: 'Next'}).click();
  await page
    .locator('#select-397')
    .selectOption('Product_Interest_Choices.Artificial Intelligence');
  await page.locator('#CHECKBOX-LABEL-0-398 span').first().click();
  await page.locator('#input-429').click();
  await page.locator('#input-429').fill('Testing');
  await page.locator('#input-437').click();
  await page.locator('#input-437').fill('Testing');
  await page.locator('#input-441').click();
  await page.locator('#input-441').fill('Testing');
  await page.locator('#input-455').click();
  await page.locator('#input-455').fill('ADKSFJS58SNVSK');
  await page.locator('lightning-primitive-input-checkbox span').nth(1).click();

  await page.pause();
});
