export let processFormData = (template: any, finalUniqueData: any) => {
  // Extract labels with user_fill set to true from the template
  let labelsWithUserFillTrue = template
    .filter((item: any) => item.user_fill === true)
    .map((item: any) => item.label);

  // Transform data keys
  let transformedData = [];

  for (let key in finalUniqueData) {
    if (finalUniqueData.hasOwnProperty(key)) {
      // Step 1: Remove 'u_'
      let newKey = key.replace(/^u_/, '');
      newKey = newKey.replace('_required', '');
      newKey = newKey.replace('_userfill', '');
      newKey = newKey.replace(/_[a-zA-Z0-9]+$/, '');
      newKey = newKey.replace(/_/g, ' ');

      let userFill = labelsWithUserFillTrue.includes(newKey);

      //This Process For Type
      let matchingTemplateItem = template.find((item: any) => {
        return item.label === newKey;
      });
      // If no exact match is found, check for items with dependentFiled === true
      if (!matchingTemplateItem) {
        template.some((item: any) => {
          if (item.dependentFiled) {
            // Check each dependentFiledArr item for a match
            const dependentMatch = item.dependentFiledArr.find(
              (dependentItem: any) => {
                // Normalize dependentItem.label if it exists
                const dependentLabel = dependentItem.label
                  ? dependentItem.label
                  : '';
                return dependentLabel === newKey;
              },
            );

            // If a dependent match is found, set matchingTemplateItem to the dependent item
            if (dependentMatch) {
              matchingTemplateItem = dependentMatch;
              return true; // Break out of the some loop if a match is found
            }
          }
          return false;
        });
      }
      // Retrieve the name if a match was found; otherwise, default to an empty string
      let type = matchingTemplateItem ? matchingTemplateItem.name : '';
      let name = matchingTemplateItem
        ? matchingTemplateItem.customFieldName
        : '';

      transformedData.push({
        [newKey]: finalUniqueData[key],
        userFill: userFill,
        type: type, // Adding the "name" field from the template
        name: name,
      });
    }
  }

  // Include keys from labelsWithUserFillTrue that are not in finalUniqueData
  labelsWithUserFillTrue.forEach((item: any) => {
    let transformedKey = item;
    if (!transformedData.some((d) => Object.keys(d)[0] === transformedKey)) {
      // Find the corresponding template item to extract Type (name)
      let matchingTemplateItem = template.find(
        (templateItem: any) => templateItem.label === transformedKey,
      );
      let type = matchingTemplateItem ? matchingTemplateItem.name : '';
      let name = matchingTemplateItem
        ? matchingTemplateItem.customFieldName
        : '';

      transformedData.push({
        [transformedKey]: '',
        userFill: true,
        type: type, // Adding the "name" field from the template
        name: name,
      });
    }
  });

  return transformedData;
};

export let dependentFieldProcess = (templateData: any, formData: any) => {
  templateData?.forEach((templateItem: any) => {
    if (templateItem?.dependentFiled) {
      templateItem?.dependentFiledArr?.forEach((dependentItem: any) => {
        const formDataItem = formData?.find(
          (fItem: any) => fItem[dependentItem?.label] !== undefined,
        );
        if (formDataItem) {
          formDataItem.dependentFill = true;
          formDataItem.dependentLabel = templateItem.label;
        }
      });
    }
  });
  return formData;
};

export let processScript = (finalObj: any) => {
  // Join the script array into a single string
  let processedScript = finalObj.script.join('\n');
  let parsedScript = JSON.parse(processedScript).split('\n');
  let loginStepImplemented = finalObj.isLoginStep ? false : true;
  let newScript = [];
  newScript.push(`let labelFilled=[];`);
  let formPages = 1 * finalObj.data.length;
  let formValues = [];
  let iswaitingScript = false;
  let waitingScriptValue = '';
  const pushedLabels: string[] = [];
  for (let i = 0; i < parsedScript.length; i++) {
    const lastline = newScript[newScript.length - 1];

    let currentLine = parsedScript[i].trim();
    if (currentLine) {
      if (currentLine.includes('page.goto')) {
        let index = newScript.findIndex((script) =>
          script.includes('page.goto'),
        );
        if (index == -1) {
          newScript.push(currentLine);
          if (currentLine.includes('paloalto')) {
            iswaitingScript = true;
          }
        }
      } else {
        if (
          currentLine.includes('button') &&
          !(lastline.includes('Code') && currentLine.includes('Verify'))
        ) {
          newScript.push(currentLine);
          let index = newScript.findIndex((item) =>
            item.includes('await page.locator(text='),
          );
          if (index > -1) {
            formPages = formPages + 1;
          }
        } else if (
          currentLine.toLowerCase().includes('username') ||
          currentLine.toLowerCase().includes('email') ||
          currentLine.toLowerCase().includes('password')
        ) {
          if (currentLine.includes('fill')) {
            let currentlabel = currentLine.includes('getByLabel(')
              ? currentLine.split('getByLabel(')[1]
              : currentLine.includes('getByPlaceholder(')
                ? currentLine.split('getByPlaceholder(')[1]
                : currentLine.includes('getByRole(')
                  ? currentLine.split('}).fill(')[0]?.split('name:')[1]
                  : '';
            let finalVal = currentLine.toLowerCase().includes('password')
              ? finalObj.password
              : finalObj.username;
            currentLine = currentLine.includes('getByLabel(')
              ? `await page.getByLabel('${currentlabel
                  .split(')')[0]
                  .replace(/['"]+/g, '')}').fill('${finalVal}')`
              : currentLine.includes('getByPlaceholder(')
                ? `await page.getByPlaceholder('${currentlabel
                    .split(')')[0]
                    .replace(/['"]+/g, '')}').fill('${finalVal}')`
                : `${currentLine.split('.fill(')[0]}.fill('${finalVal}')`;

            newScript.push(currentLine);
          } else {
            if (!currentLine.includes('Enter')) {
              newScript.push(currentLine);
            }
          }
        } else {
          let index = newScript.findIndex((script) =>
            script.includes('button'),
          );

          if (
            finalObj.isLoginStep &&
            index > -1 &&
            !loginStepImplemented &&
            currentLine.includes('fill') &&
            (currentLine.includes('Verification') ||
              currentLine.includes('Code'))
          ) {
            newScript.push(
              ` const verificationTextExists = await page.isVisible('text="Verify"');`,
            );
            if (iswaitingScript) {
              newScript.push(`await page.waitForTimeout(15000);`);
            }

            let data = `
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
        messageDiv.innerHTML =  \`
        <h3>Verification Code</h3>
        <p>Please Enter the verification code.</p>
        <button id="close-popup">Close</button>
      \`;
        document.body.appendChild(messageDiv);
        document.getElementById('close-popup').addEventListener('click', () => {
          messageDiv.style.display = 'none';
        });
      });
    }
            
           
            await page.waitForFunction(() => {
      return new Promise((resolve) => {
        const buttons = document.querySelectorAll('input[type="submit"]');
        console.log(buttons,"buttons") 
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            resolve(true); 
          });
        });
      });
    },{ timeout: 900000 });
    await page.waitForTimeout(30000);
    `;

            newScript.push(data);
            loginStepImplemented = true;
          } else {
            if (
              currentLine.includes('fill') &&
              !currentLine.includes('pause()') &&
              formValues.length <= formPages &&
              !currentLine.includes('Verification')
            ) {
              for (let dataObj of finalObj.data) {
                for (let [label, value] of Object.entries(dataObj)) {
                  if (
                    label !== 'userFill' &&
                    value &&
                    label !== 'name' &&
                    label !== 'type' &&
                    dataObj.type &&
                    !pushedLabels.includes(label)
                  ) {
                    if (!dataObj.userFill) {
                      if (!currentLine.includes('combobox')) {
                        newScript.push(
                          `await page.getByLabel('${label}').waitFor({ state: 'visible', timeout: 50000 });`,
                        );
                      }

                      let data = `
  
                      ${
                        dataObj.type.toLowerCase().includes('text') ||
                        dataObj.type.toLowerCase().includes('email') ||
                        dataObj.type.toLowerCase().includes('date')
                          ? `await page.getByLabel('${label}').fill('${value}');`
                          : dataObj.type.toLowerCase().includes('select') ||
                              dataObj.type.toLowerCase().includes('drop')
                            ? dataObj.name
                              ? `await page.locator('select[name="${dataObj.name}"]').selectOption('${value}');`
                              : `await page.getByLabel('${label}').selectOption('${value}');`
                              ?currentLine.includes("combobox")?
                              `await page.getByRole('option', { name: '${value}' }).locator('span').nth(1).click();`
                              :`await page.getByText('${value}').click();`
                            : `await page.getByText('${value}').click();`
                      }
                      labelFilled.push('${label}');
                      `;
                      pushedLabels.push(label);
                      const stateIndex = newScript.findIndex((item) =>
                        item.includes('State'),
                      );
                      if (label.includes('State') && stateIndex === -1) {
                        const countryIndex = newScript.findIndex((item) =>
                          item.includes('Country'),
                        );
                        if (countryIndex == -1) {
                          waitingScriptValue = data;
                        } else {
                          newScript.push(data);
                        }
                      } else {
                        if (label.includes('Country') && waitingScriptValue) {
                          newScript.push(data);
                          newScript.push(waitingScriptValue);
                        } else {
                          newScript.push(data);
                        }
                      }
                    } else {
                      if (dataObj.userFill && !pushedLabels.includes(label)) {
                        let data = `
                        if(!labelFilled.includes('${label}')){
  
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
        messageDiv.innerHTML =  \`
        <h3>${label}</h3>
        <p>Please Enter ${label}.</p>
        <button id="close-popup">Close</button>
      \`;
        document.body.appendChild(messageDiv);
        document.getElementById('close-popup').addEventListener('click', () => {
          messageDiv.style.display = 'none';
        });
      });
  }
                      
                       await page.waitForFunction(async() => {
      const label = Array.from(document.querySelectorAll('label')).find(label => label.innerText.includes('${label}'));
          const button = document.querySelector('button[role="combobox"][aria-label="${label}"]');
  
  
  
      if (label) {
        const control = label.control || label.querySelector('input, select'); 
        
        if (control) {
          return control.value && control.value.trim() !== '';  
        }
      }
        if(button){
  
  return button.getAttribute('data-value') || null;
        }
      return false;
    }, { timeout: 900000 }); 
                        `;
                        newScript.push(data);
                      }
                    }
                    formValues.push(label);
                  }
                }
              }
            } else {
              if (
                !currentLine.includes('pause()') &&
                !currentLine.includes('fill') &&
                !currentLine.includes('selectOption') &&
                !currentLine.includes('press') &&
                !(lastline.includes('Code') && currentLine.includes('Verify'))
              ) {
                const loginLinkIndex = newScript.findIndex((item) =>
                  item.includes(`const loginLink =`),
                );
                if (currentLine.includes('link') && loginLinkIndex == -1) {
                  newScript.push(
                    `const loginLink = ${currentLine.replace('.click()', '')};

                await loginLink.waitFor({ state: 'visible', timeout: 5000 });
                await loginLink.scrollIntoViewIfNeeded();

                for (let i = 0; i < 3; i++) {
                  try {
                    await loginLink.click();
                    console.log('Login link clicked successfully.');
                    break;
                  } catch (error) {
                    console.warn('Attempt failed');
                    await page.waitForTimeout(500);
                  }
                }
                `,
                  );
                } else {
                  newScript.push(currentLine);
                }
              }
            }
          }
        }
      }
    }
  }
  let finalArr = newScript;

  let updatedScript = finalArr.join('\n');

  return updatedScript;
};
