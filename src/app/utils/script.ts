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
      let finalItem: any;

      // If no exact match is found, check for items with dependentFiled === true
      if (!matchingTemplateItem) {
        template.some((item: any) => {
          if (item.dependentFiled) {
            // Check each dependentFiledArr item for a match
            const dependentMatch = item.dependentFiledArr.find(
              (dependentItem: any) => {
                // Normalize dependentItem.label if it exists

                finalItem =
                  dependentItem?.label === newKey
                    ? dependentItem
                    : dependentItem.find((item: any) => item.label === newKey);

                return dependentItem?.label
                  ? dependentItem?.label === newKey
                  : dependentItem.length > 0
                    ? dependentItem.find((item: any) => item.label === newKey)
                    : '';
              },
            );

            // If a dependent match is found, set matchingTemplateItem to the dependent item
            if (finalItem) {
              matchingTemplateItem = finalItem;
              return true; // Break out of the some loop if a match is found
            }
          }
          return false;
        });
      }
      // Retrieve the name if a match was found; otherwise, default to an empty string
      let type = matchingTemplateItem
        ? matchingTemplateItem === finalItem
          ? matchingTemplateItem.type
          : matchingTemplateItem.name
        : '';
      let name = matchingTemplateItem
        ? matchingTemplateItem.customFieldName
        : '';
      if (finalUniqueData[key] && (type || name)) {
        transformedData.push({
          [newKey]: finalUniqueData[key],
          userFill: userFill,
          type: type, // Adding the "name" field from the template
          name: name,
        });
      }
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

export let processScript = (finalObj: {
  data: [{[key: string]: any}];
  script: any;
  isLoginStep: boolean;
  username: string;
  password: string;
}) => {
  // Join the script array into a single string
  let processedScript = finalObj.script.join('\n');
  let parsedScript = JSON.parse(processedScript).split('\n');
  let loginStepImplemented = finalObj.isLoginStep ? false : true;
  let loginDetailsFilled = false;

  let newScript = [];
  newScript.push(`let labelFilled=[];`);
  let formPages = 1 * finalObj.data.length;
  let formValues: string[] = [];
  let iswaitingScript = false;
  let waitingScriptValue = '';
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
          !currentLine.includes('getByLabel') &&
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
          !loginDetailsFilled &&
          (currentLine.toLowerCase().includes('username') ||
            currentLine.toLowerCase().includes('email') ||
            currentLine.toLowerCase().includes('password'))
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
              ? finalObj.password.replace(/['"]+/g, '')
              : finalObj.username.replace(/['"]+/g, '');
            if (currentLine.toLowerCase().includes('password')) {
              loginDetailsFilled = true;
            }
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
              (currentLine.includes('fill') ||
                currentLine.includes('combobox') ||
                currentLine.includes('selectOption') ||
                (currentLine.includes('getByLabel') &&
                  currentLine.includes('button'))) &&
              !currentLine.includes('pause()') &&
              !currentLine.includes('option') &&
              formValues.length <= formPages &&
              !currentLine.includes('Verification')
            ) {
              const excludedKeys = ['name', 'userfill', 'type'];
              let lineLabel = '';
              let lineName = '';

              if (currentLine.includes('combobox')) {
                const nameMatch = currentLine.match(/name: '(.*?)'/);

                lineLabel = nameMatch[1].replace(/\s+/g, '').trim();
              }
              const labelMatch = currentLine.match(
                /getByLabel\('(\*?\s*)(.*?)'\)/,
              );
              if (labelMatch) {
                lineLabel = labelMatch[2].replace(/\s+/g, '').trim();
              }

              const locatorRegex = /page\.locator\((['"`])([^'"`]+)\1\)/;
              const match = currentLine.match(locatorRegex);

              if (match) {
                let locatorName = match[2]; // Extract the locator name
                // Replace all special characters with an empty string
                lineName = locatorName.replace(/[^a-zA-Z0-9]/g, '');
              }

              const dataObjAll = finalObj.data.filter((objItem: any) =>
                Object.keys(objItem).find(
                  (key) =>
                    (!excludedKeys.includes(key.toLowerCase()) &&
                      lineLabel &&
                      key.replace(/\s+/g, '').trim().includes(lineLabel)) ||
                    (lineName &&
                      objItem?.name &&
                      objItem?.name
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .includes(lineName)),
                ),
              );
              const dataObj =
                dataObjAll && dataObjAll.length > 1
                  ? dataObjAll.find((objItem: any) =>
                      Object.keys(objItem).find(
                        (key) =>
                          !excludedKeys.includes(key.toLowerCase()) &&
                          key
                            .replace(/[^a-zA-Z0-9]/g, '')
                            .replace(/\s+/g, '')
                            .trim() === lineLabel,
                      ),
                    )
                  : dataObjAll.length == 1
                    ? dataObjAll[0]
                    : null;
              if (dataObj) {
                for (let [label, value] of Object.entries(dataObj)) {
                  if (
                    label !== 'userFill' &&
                    value &&
                    label !== 'name' &&
                    label !== 'type' &&
                    !formValues.includes(label)
                  ) {
                    if (!dataObj.userFill) {
                      if (
                        currentLine.includes('getByLabel') &&
                        currentLine.includes('button')
                      ) {
                        if (value && value.length > 0) {
                          for (let i = 0; i < value?.length; i++) {
                            newScript.push(`await page
                              .getByRole('option', {
                                name: '${value[i]}',
                              })
                              .click();`);

                            newScript.push(currentLine);
                          }
                        }

                        formValues.push(label);
                        break;
                      }
                      if (currentLine.includes('combobox')) {
                        newScript.push(currentLine);
                        newScript.push(
                          `await page.getByRole('option', { name: '${value}' , exact: true}).locator('span').nth(1).click();`,
                        );
                        formValues.push(label);

                        break;
                      } else if (
                        !label.includes('State') &&
                        !label.includes('Country') &&
                        !dataObj.name
                      ) {
                        newScript.push(
                          `await page.getByLabel('${label}').waitFor({ state: 'visible', timeout: 50000 });`,
                        );
                      }

                      let data = `
    
                        ${
                          dataObj.type.toLowerCase().includes('text') ||
                          dataObj.type.toLowerCase().includes('email') ||
                          dataObj.type.toLowerCase().includes('date')
                            ? dataObj.name
                              ? `await page.locator('${dataObj.type.toLowerCase() === 'textarea' ? 'textarea' : 'input'}[name="${dataObj.name}"]').fill('${value}');
`
                              : `await page.getByLabel('${label}').fill('${value}');`
                            : dataObj.type.toLowerCase().includes('select') ||
                                dataObj.type.toLowerCase().includes('drop')
                              ? dataObj.name
                                ? `await page.locator('select[name="${dataObj.name}"]').selectOption('${value}');`
                                : currentLine.includes('selectOption')
                                  ? `${currentLine.split('.selectOption')[0]}
                                      .selectOption('${value}')`
                                  : `await page.getByLabel('${label}').selectOption('${value}');`
                              : `await page.getByText('${value}').click();`
                        }
                        labelFilled.push('${label}');
                        `;
                      const stateIndex = newScript.findIndex(
                        (item) =>
                          item.includes('State') && !item.includes('States'),
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
                        if (label.includes('Country')) {
                          newScript.push(
                            `await page.getByLabel('${label}').waitFor({ state: 'visible', timeout: 50000 });`,
                          );
                        }
                        if (!currentLine.includes('combobox')) {
                          newScript.push(data);
                        }

                        if (label.includes('Country') && waitingScriptValue) {
                          newScript.push(waitingScriptValue);
                        }
                      }
                    } else {
                      const newLabel = Object.keys(dataObj).find(
                        (key) => !excludedKeys.includes(key.toLowerCase()),
                      );
                      if (dataObj.userFill && newLabel) {
                        let data = `
                            if(!labelFilled.includes('${newLabel}')){

                            await page.evaluate(() => {
            const messageDiv = document.createElement('div');
            messageDiv.id = 'customMessage-${newLabel}';
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
            <h3>${newLabel}</h3>
            <p>Please Enter ${newLabel}.</p>
            <button id="close-popup-${newLabel}">Close</button>
          \`;
            document.body.appendChild(messageDiv);
            document.getElementById("close-popup-${newLabel}").addEventListener('click', () => {
             const existingPopup = document.getElementById('customMessage-${newLabel}');
      if (existingPopup) {
        existingPopup.style.display = 'none';
      }
            });
          });
      }
                          
                           await page.waitForFunction(async() => {
          const label = Array.from(document.querySelectorAll('label')).find(label => label.innerText.includes('${newLabel}'));
              const button = document.querySelector('button[role="combobox"][aria-label="${newLabel}"]');
      
      
      
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
                !currentLine.includes('getByLabel') &&
                !currentLine.includes('combobox') &&
                !currentLine.includes('option') &&
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
