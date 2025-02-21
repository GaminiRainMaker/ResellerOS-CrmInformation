import dayjs from 'dayjs';

type TemplateItem = {
  name: string;
  label: string;
  type: string;
  user_fill: boolean;
  required?: boolean;
  customFieldName?: string;
  userFillTextValue?: string;
  locater?: string;
  dateformat?: string;
  dependentFiled?: boolean;
  dependentFiledArr?: any[];
  options?: string[];
};

type FinalDataItem = Record<string, any>;

export const processFormData = (
  template: TemplateItem[],
  finalUniqueData: FinalDataItem,
) => {
  // Extract labels with user_fill set to true from the template
  const labelsWithUserFillTrue = template
    .filter((item) => item.user_fill === true)
    .map((item) => item.label);

  // Transform data keys
  const transformedData: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in finalUniqueData) {
    if (Object.prototype.hasOwnProperty.call(finalUniqueData, key)) {
      // Remove prefixes and suffixes from keys
      let newKey = key.replace(/^u_/, '');
      newKey = newKey.replace('_required', '');
      newKey = newKey.replace('_userfill', '');
      newKey = newKey.replace(/_[a-zA-Z0-9]+$/, '');
      newKey = newKey.replace(/_/g, ' ');

      const userFill = labelsWithUserFillTrue.includes(newKey);

      // Find matching template item
      let matchingTemplateItem = template.find(
        (item) =>
          item.label?.replace(/\s+/g, '') === newKey?.replace(/\s+/g, ''),
      );

      let finalItem: any;
      if (!matchingTemplateItem) {
        // Handle dependent fields
        template.some((item) => {
          if (item.dependentFiled) {
            const dependentMatch = item.dependentFiledArr?.find(
              (dependentItem: any) => {
                finalItem =
                  dependentItem.label === newKey
                    ? dependentItem
                    : dependentItem.find(
                        (subItem: any) => subItem.label === newKey,
                      );
                return finalItem;
              },
            );
            if (dependentMatch) {
              matchingTemplateItem = finalItem;
              return true; // Break loop
            }
          }
          return false;
        });
      }

      // eslint-disable-next-line no-nested-ternary
      const type = matchingTemplateItem
        ? matchingTemplateItem === finalItem
          ? matchingTemplateItem.type
          : matchingTemplateItem.name
        : '';
      const name = matchingTemplateItem?.customFieldName || '';
      const locater = matchingTemplateItem?.locater || '';
      const dateformat = matchingTemplateItem?.dateformat || '';
      const userFillTextValue = matchingTemplateItem?.userFillTextValue || '';

      if (finalUniqueData[key] && (type || name)) {
        transformedData.push({
          [newKey]: finalUniqueData[key],
          userFill,
          type,
          name,
          locater,
          dateformat,
          userFillTextValue,
        });
      }
    }
  }

  // Add missing fields with user_fill === true
  labelsWithUserFillTrue.forEach((label) => {
    if (!transformedData.some((data) => Object.keys(data)[0] === label)) {
      const matchingTemplateItem = template.find(
        (item) => item.label === label,
      );
      const type = matchingTemplateItem?.type || '';
      const name = matchingTemplateItem?.customFieldName || '';
      const locater = matchingTemplateItem?.locater || '';
      const dateformat = matchingTemplateItem?.dateformat || '';
      const userFillTextValue = matchingTemplateItem?.userFillTextValue || '';

      transformedData.push({
        [label]: '',
        userFill: true,
        type,
        name,
        locater,
        dateformat,
        userFillTextValue,
      });
    }
  });

  return transformedData;
};

export const dependentFieldProcess = (templateData: any, formData: any) => {
  templateData.forEach((templateItem: any) => {
    if (
      templateItem?.dependentFiled &&
      Array.isArray(templateItem.dependentFiledArr)
    ) {
      templateItem.dependentFiledArr.forEach((dependentItem: any) => {
        const dependentKey = dependentItem[0]?.label; // Extract the dependent key
        if (!dependentKey) return; // Skip if the key is not valid

        const formDataItem = formData.find((fItem: any) => {
          const fieldValue = fItem[dependentKey]; // Access value using the key
          return fieldValue !== undefined; // Return item if value exists
        });

        if (formDataItem) {
          formDataItem.dependentFill = true; // Mark as dependent
          formDataItem.dependentLabel = templateItem.label; // Assign label
        }
      });
    }
  });
  return formData;
};

export const addLocatorAndNameForDependentFields = (
  template: TemplateItem[],
  formData: any[],
) => {
  // Find all objects in formData with dependentFill: true
  const dependentFormDataArray = formData?.filter(
    (item: any) => item?.dependentFill === true,
  );

  // If no dependent fields are found, return formData unchanged
  if (dependentFormDataArray?.length === 0) {
    return formData;
  }

  // Iterate over each dependentFormData and update its properties
  dependentFormDataArray?.forEach((dependentFormData) => {
    const dependentLabel = dependentFormData?.dependentLabel;
    // Find the corresponding object in the template by matching the label
    const matchingTemplateObject = template?.find(
      (item) => item.label === dependentLabel,
    );
    // If no matching template object is found, skip to the next dependentFormData
    if (!matchingTemplateObject || !matchingTemplateObject?.dependentFiledArr) {
      return;
    }
    // Extract the key (first key in the object) for dependentFormData
    const dependentFormDataKey = Object?.keys(dependentFormData)[0];
    // Iterate through the dependentFiledArr to find a matching dependent field
    const matchingDependentField = matchingTemplateObject?.dependentFiledArr
      ?.flat()
      ?.find(
        (dependentFieldItem) =>
          dependentFieldItem?.label === dependentFormDataKey,
      );
    // If a matching dependent field is found, update the dependentFormData object
    if (matchingDependentField) {
      // eslint-disable-next-line no-param-reassign
      dependentFormData.customFieldName =
        matchingDependentField?.customFieldName;
      // eslint-disable-next-line no-param-reassign
      dependentFormData.locater = matchingDependentField?.locater;
      // eslint-disable-next-line no-param-reassign
      dependentFormData.dateformat = matchingDependentField?.dateformat;
      // eslint-disable-next-line no-param-reassign
      dependentFormData.userFill = matchingDependentField?.user_fill;
      // eslint-disable-next-line no-param-reassign
      dependentFormData.userFillTextValue =
        matchingDependentField?.userFillTextValue;
    }
  });

  // Return the updated formData
  return formData;
};

export const processScript = (finalObj: {
  data: [{[key: string]: any}];
  script: any;
  isLoginStep: boolean;
  username: string;
  password: string;
}) => {
  // Join the script array into a single string
  const processedScript = finalObj.script.join('\n');
  const parsedScript = JSON.parse(processedScript).split('\n');
  let loginStepImplemented = !finalObj.isLoginStep;
  let loginDetailsFilled = false;

  const newScript = [];
  newScript.push(`let labelFilled=[];`);
  let formPages = 1 * finalObj.data.length;
  const formValues: string[] = [];
  let iswaitingScript = false;
  let waitingScriptValue = '';
  const excludedKeys = [
    'name',
    'userfill',
    'type',
    'locater',
    'dateformat',
    'dependentfill',
    'dependentlabel',
    'userfilltextvalue',
    'customfieldname',
  ];
  for (let i = 0; i < parsedScript.length; i++) {
    const lastline = i > 0 ? parsedScript[i - 1].trim() : '';
    const nextLine =
      i < parsedScript.length - 1 ? parsedScript[i + 1].trim() : '';
    let currentLine = parsedScript[i].trim();
    let currentPage = 1;
    const pageIndex = newScript.findIndex((script) => script.includes('page1'));
    let dataObj;
    if (pageIndex > -1) {
      currentPage = 2;
    }

    if (currentLine) {
      if (currentLine.includes('page.goto')) {
        const index = newScript.findIndex((script) =>
          script.includes('page.goto'),
        );
        if (index === -1) {
          newScript.push(currentLine);
          if (currentLine.includes('paloalto')) {
            iswaitingScript = true;
          }
        }
      } else if (
        currentLine.includes('button') &&
        !currentLine.toLowerCase().includes('move') &&
        !currentLine.toLowerCase().includes('search') &&
        !currentLine.includes('getByLabel') &&
        !(lastline.includes('Code') && currentLine.includes('Verify'))
      ) {
        newScript.push(currentLine);
        const index = newScript.findIndex((item) =>
          item.includes('await page.locator(text='),
        );
        if (index > -1) {
          formPages += 1;
        }
      } else if (
        !loginDetailsFilled &&
        finalObj.username &&
        finalObj.password &&
        (currentLine.toLowerCase().includes('username') ||
          currentLine.toLowerCase().includes('email') ||
          currentLine.toLowerCase().includes('password'))
      ) {
        const index = newScript.findIndex((item) => item.includes('cribl'));

        if (currentLine.toLowerCase().includes('email') && index > -1) {
          if (currentLine.includes('click')) {
            newScript.push(`await page.locator('input[name="log"]').click()`);
          } else {
            newScript.push(
              `await page.locator('input[name="log"]').fill('${finalObj?.username}')`,
            );
          }
        } else if (currentLine.includes('fill')) {
          // eslint-disable-next-line no-nested-ternary
          const currentlabel = currentLine.includes('getByLabel(')
            ? currentLine.split('getByLabel(')[1]
            : // eslint-disable-next-line no-nested-ternary
              currentLine.includes('getByPlaceholder(')
              ? currentLine.split('getByPlaceholder(')[1]
              : currentLine.includes('getByRole(')
                ? currentLine.split('}).fill(')[0]?.split('name:')[1]
                : '';
          const finalVal = currentLine.toLowerCase().includes('password')
            ? finalObj?.password?.replace(/['"]+/g, '')
            : finalObj?.username?.replace(/['"]+/g, '');
          if (currentLine.toLowerCase().includes('password')) {
            loginDetailsFilled = true;
          }
          // eslint-disable-next-line no-nested-ternary
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
        } else if (!currentLine.includes('Enter')) {
          newScript.push(currentLine);
        }
      } else {
        const index = newScript.findIndex((script) =>
          script.includes('button'),
        );

        if (
          finalObj.isLoginStep &&
          index > -1 &&
          !loginStepImplemented &&
          currentLine.includes('fill') &&
          (currentLine.includes('Verification') || currentLine.includes('Code'))
        ) {
          if (iswaitingScript) {
            newScript.push(
              `await ${currentPage === 1 ? 'page' : 'page1'}.waitForTimeout(15000);`,
            );
          }

          const data = `
            
      await ${currentPage === 1 ? 'page' : 'page1'}.evaluate(() => {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'verificationMessage';
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
 
    await ${currentPage === 1 ? 'page' : 'page1'}.waitForTimeout(9000);
    `;

          newScript.push(data);
          loginStepImplemented = true;
        } else if (
          !currentLine.includes('pause()') &&
          formValues.length <= formPages &&
          !currentLine.includes('Verification') &&
          (currentLine.includes('fill') ||
            currentLine.includes('combobox') ||
            currentLine.includes('selectOption') ||
            currentLine.includes('getByPlaceholder') ||
            (currentLine.includes('getByLabel') &&
              currentLine.includes('button')) ||
            (currentLine.toLowerCase().includes('search') &&
              currentLine.includes('button') &&
              lastline.includes('getByText')) ||
            (currentLine.toLowerCase().includes('option') &&
              lastline.includes('getByText') &&
              nextLine.toLowerCase().includes('move')) ||
            (currentLine.includes('locator') && currentLine.includes('click')))
        ) {
          let lineLabel = '';
          let lineName = '';
          let exactLineLabel = '';

          if (currentLine.includes('combobox')) {
            const nameMatch = currentLine.match(/name: '(.*?)'/);

            lineLabel = nameMatch[1].replace(/\s+/g, '').trim();
          }
          if (currentLine.includes('getByPlaceholder')) {
            const labelMatch = currentLine.match(
              /getByPlaceholder\('(\*?\s*)(.*?)'\)/,
            );
            if (labelMatch) {
              lineLabel = labelMatch[2].replace(/\s+/g, '').trim();
            }
          }
          if (
            currentLine.includes('getByRole') &&
            currentLine.includes('textbox')
          ) {
            const labelMatch = currentLine.match(/name:\s*['"`](.*?)['"`]/);

            if (labelMatch) {
              lineLabel = labelMatch[1].replace(/\s+/g, '').trim();
              // eslint-disable-next-line prefer-destructuring
              exactLineLabel = labelMatch[1];
            }
          }

          if (
            currentLine.includes('getByLabel') &&
            currentLine.includes('exact')
          ) {
            const labelMatch = currentLine.match(/getByLabel\('([^']+)'/);
            if (labelMatch) {
              lineLabel = labelMatch[1].replace(/\s+/g, '').trim();
            }
          } else {
            const labelMatch = currentLine.match(
              /getByLabel\('(\*?\s*)(.*?)'\)/,
            );
            if (labelMatch) {
              lineLabel = labelMatch[2].replace(/\s+/g, '').trim();
            }
          }
          // Extract all locator values using regex

          const locatorRegex =
            currentPage === 1
              ? /page\.locator\((['"`])([^'"`]+)\1\)/
              : /page1\.locator\((['"`])([^'"`]+)\1\)/;
          const match = currentLine.match(locatorRegex);

          if (match) {
            const locatorName = match[2]; // Extract the locator name

            // const locators = [
            //   ...currentLine.matchAll(/page\.locator\((['"`])([^'"`]+)\1\)/g),
            // ];
            // // Get the last locator value
            // const lastLocator =
            //   locators.length > 0 ? locators[locators.length - 1] : null;
            // const locatorName = lastLocator; // Extract the locator name
            // // Replace all special characters with an empty string
            // lineName = locatorName
            //   ? locatorName?.replace(/[^a-zA-Z0-9]/g, '')
            //   : null;
            lineName = locatorName.replace(/[^a-zA-Z0-9]/g, '');
          }

          const dataObjAll = finalObj.data.filter((objItem: any) =>
            Object.keys(objItem).find(
              (key) =>
                (lineLabel &&
                  !excludedKeys.includes(key.toLowerCase()) &&
                  key.replace(/\s+/g, '').trim().includes(lineLabel)) ||
                (lineName &&
                  objItem?.name &&
                  objItem?.name
                    .replace(/[^a-zA-Z0-9]/g, '')
                    .includes(lineName)) ||
                (lineName &&
                  objItem?.locater &&
                  objItem?.locater
                    .replace(/[^a-zA-Z0-9]/g, '')
                    .includes(lineName)),
            ),
          );

          if (dataObjAll.length > 1) {
            if (currentLine.includes('first') || currentLine.includes('nth')) {
              if (currentLine.includes('nth')) {
                dataObj = dataObjAll.find(
                  (item) =>
                    item.locater.replace(/[^a-zA-Z0-9]/g, '') !== lineName,
                );
              } else {
                dataObj = dataObjAll.find(
                  (item) =>
                    item.locater.replace(/[^a-zA-Z0-9]/g, '') === lineName,
                );
              }
            } else {
              dataObj = dataObjAll.find((objItem: any) =>
                Object.keys(objItem).find(
                  (key) =>
                    !excludedKeys.includes(key.toLowerCase()) &&
                    key
                      .replace(/[^a-zA-Z0-9]/g, '')
                      .replace(/\s+/g, '')
                      .trim() === lineLabel.replace(/[^a-zA-Z0-9]/g, ''),
                ),
              );
            }
          } else if (dataObjAll.length === 1) {
            // eslint-disable-next-line prefer-destructuring
            dataObj = dataObjAll[0];
          } else {
            dataObj = null;
          }

          if (
            (currentLine.toLowerCase().includes('search') ||
              currentLine.includes('option')) &&
            lastline.includes('getByText') &&
            !dataObj
          ) {
            if (lastline.includes('getByText')) {
              const labelMatch = lastline.match(/getByText\('(\*?\s*)(.*?)'\)/);
              if (labelMatch) {
                lineLabel = labelMatch[2].replace(/\s+/g, '').trim();
              }

              // eslint-disable-next-line @typescript-eslint/no-shadow
              const dataObjAll = finalObj.data.filter((objItem: any) =>
                Object.keys(objItem).find(
                  (key) =>
                    !excludedKeys.includes(key.toLowerCase()) &&
                    lineLabel &&
                    key.replace(/\s+/g, '').trim().includes(lineLabel),
                ),
              );

              dataObj =
                // eslint-disable-next-line no-nested-ternary
                dataObjAll && dataObjAll.length > 1
                  ? dataObjAll.find((objItem: any) =>
                      Object.keys(objItem).find(
                        (key) =>
                          !excludedKeys.includes(key.toLowerCase()) &&
                          key
                            .replace(/[^a-zA-Z0-9]/g, '')
                            .replace(/\s+/g, '')
                            .trim() === lineLabel.replace(/[^a-zA-Z0-9]/g, ''),
                      ),
                    )
                  : dataObjAll.length === 1
                    ? dataObjAll[0]
                    : null;
            }
          }
          if (dataObj) {
            // eslint-disable-next-line no-restricted-syntax
            for (const [label, value] of Object.entries(dataObj)) {
              if (
                !formValues.includes(label) &&
                excludedKeys.findIndex(
                  (item) => item === label.toLowerCase(),
                ) === -1
              ) {
                if (value && !dataObj.userFill) {
                  if (
                    currentLine.includes('getByLabel') &&
                    currentLine.includes('button')
                  ) {
                    if (value && value.length > 0) {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      for (let i = 0; i < value?.length; i++) {
                        newScript.push(`await ${currentPage === 1 ? 'page' : 'page1'}
                                .getByRole('option', {
                                  name: '${value[i]}',exact: true 
                                })
                                .click();`);

                        newScript.push(currentLine);
                      }
                    }

                    formValues.push(label);
                    break;
                  } else if (
                    currentLine.includes('option') &&
                    lastline.includes('getByText') &&
                    nextLine.toLowerCase().includes('move')
                  ) {
                    if (value && value.length > 0) {
                      for (let j = 0; j < value?.length; j++) {
                        newScript.push(`await ${currentPage === 1 ? 'page' : 'page1'}
                          .getByRole('option', {
                            name: '${value[j]}',exact: true 
                          })
                          .click();`);
                        newScript.push(nextLine);
                      }
                    }
                    formValues.push(label);
                    break;
                  } else if (currentLine.includes('combobox')) {
                    newScript.push(currentLine);
                    let newValue = value;
                    let occurance = 1;
                    if (value.includes('_')) {
                      const valueSplitArr = value?.split('_');
                      newValue =
                        valueSplitArr && valueSplitArr.length > 0
                          ? valueSplitArr[0]
                          : value;
                      occurance =
                        valueSplitArr && valueSplitArr.length > 0
                          ? valueSplitArr[1]
                          : occurance;
                      newScript.push(
                        `await ${currentPage === 1 ? 'page' : 'page1'}.locator('span').filter({ hasText: /^${newValue}$/ }).nth(${occurance}).click();`,
                      );
                    } else {
                      newScript.push(
                        `await ${currentPage === 1 ? 'page' : 'page1'}.getByRole('option', { name: '${newValue}' , exact: true}).locator('span').nth(${occurance}).click();`,
                      );
                    }

                    formValues.push(label);

                    break;
                  } else if (
                    currentLine.includes('locator') &&
                    currentLine.includes('click') &&
                    (dataObj.type.toLowerCase().includes('select') ||
                      dataObj.type.toLowerCase().includes('drop') ||
                      dataObj.type.toLowerCase().includes('date') ||
                      dataObj.type.toLowerCase().includes('tag') ||
                      dataObj.type.toLowerCase().includes('text') ||
                      dataObj.type.toLowerCase().includes('checkbox'))
                  ) {
                    if (dataObj.type.toLowerCase().includes('checkbox')) {
                      if (value && value.length > 0 && value[0]) {
                        newScript.push(currentLine);
                      }
                    } else {
                      newScript.push(currentLine);

                      if (dataObj.type.toLowerCase().includes('text')) {
                        newScript.push(
                          `await ${currentPage === 1 ? 'page' : 'page1'}.locator('${dataObj.locater}').fill('${value}');`,
                        );
                      } else if (
                        value &&
                        value.length > 0 &&
                        typeof value !== 'string'
                      ) {
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        for (let i = 0; i < value?.length; i++) {
                          newScript.push(
                            `await ${currentPage === 1 ? 'page' : 'page1'}.getByText('${value[i]}').first().click();`,
                          );
                        }
                      } else {
                        newScript.push(
                          `await ${currentPage === 1 ? 'page' : 'page1'}.getByRole('option', { name: '${value}' , exact: true}).locator('span').first().click();;`,
                        );
                      }
                    }

                    formValues.push(label);

                    break;
                  } else if (
                    !label.includes('State') &&
                    !label.includes('Country') &&
                    !dataObj.name &&
                    !dataObj.locater
                  ) {
                    if (
                      currentLine.includes('getByLabel') &&
                      currentLine.includes('exact')
                    ) {
                      newScript.push(
                        `await ${currentPage === 1 ? 'page' : 'page1'}.getByLabel('${dataObj.locater ? dataObj.locater : label}',{ exact: true }).waitFor({ state: 'visible', timeout: 50000 });`,
                      );
                    } else if (currentLine.includes('getByLabel')) {
                      newScript.push(
                        `await ${currentPage === 1 ? 'page' : 'page1'}.getByLabel('${dataObj.locater ? dataObj.locater : exactLineLabel || label}').waitFor({ state: 'visible', timeout: 50000 });`,
                      );
                    }
                  }
                  const data = `
      
                          ${
                            // eslint-disable-next-line no-nested-ternary
                            dataObj.type.toLowerCase().includes('text') ||
                            dataObj.type.toLowerCase().includes('email') ||
                            dataObj.type.toLowerCase().includes('date')
                              ? // eslint-disable-next-line no-nested-ternary
                                dataObj.locater
                                ? `await ${currentPage === 1 ? 'page' : 'page1'}.locator('${dataObj.locater}').fill('${dataObj.type.toLowerCase().includes('date') ? dayjs(value).format(dataObj.dateformat) : value?.replace(/'/g, "\\'")}');
  `
                                : // eslint-disable-next-line no-nested-ternary
                                  dataObj.name
                                  ? `await ${currentPage === 1 ? 'page' : 'page1'}.locator('${dataObj.type.toLowerCase() === 'textarea' ? 'textarea' : 'input'}[name="${dataObj.name}"]').fill('${dataObj.type.toLowerCase().includes('date') ? dayjs(value).format(dataObj.dateformat) : value?.replace(/'/g, "\\'")}');
  `
                                  : // eslint-disable-next-line no-nested-ternary
                                    currentLine.includes('getByLabel') &&
                                      currentLine.includes('exact')
                                    ? `await ${currentPage === 1 ? 'page' : 'page1'}.getByLabel('${dataObj.locater ? dataObj.locater : label}',{ exact: true }).fill('${dataObj.type.toLowerCase().includes('date') ? dayjs(value).format(dataObj.dateformat) : value?.replace(/'/g, "\\'")}');`
                                    : currentLine.includes('getByRole') &&
                                        currentLine.includes('textbox')
                                      ? `await ${currentPage === 1 ? 'page' : 'page1'}.getByRole('textbox', { name: '${exactLineLabel || label}' }).fill('${dataObj.type.toLowerCase().includes('date') ? dayjs(value).format(dataObj.dateformat) : value?.replace(/'/g, "\\'")}',{ force: true });`
                                      : `await ${currentPage === 1 ? 'page' : 'page1'}.getByLabel('${dataObj.locater ? dataObj.locater : exactLineLabel || label}').fill('${dataObj.type.toLowerCase().includes('date') ? dayjs(value).format(dataObj.dateformat) : value?.replace(/'/g, "\\'")}');`
                              : // eslint-disable-next-line no-nested-ternary
                                dataObj.type.toLowerCase().includes('select') ||
                                  dataObj.type.toLowerCase().includes('drop') ||
                                  dataObj.type.toLowerCase().includes('tag')
                                ? // eslint-disable-next-line no-nested-ternary
                                  dataObj.name
                                  ? `await ${currentPage === 1 ? 'page' : 'page1'}.locator('select[name="${dataObj.name}"]').selectOption('${value}');`
                                  : currentLine.includes('selectOption')
                                    ? `${currentLine.split('.selectOption')[0]}
                                        .selectOption('${value}');`
                                    : `await ${currentPage === 1 ? 'page' : 'page1'}.getByLabel('${label}').selectOption('${value}');`
                                : `await ${currentPage === 1 ? 'page' : 'page1'}.getByText('${value}').click();`
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
                    if (countryIndex === -1) {
                      waitingScriptValue = data;
                    } else {
                      newScript.push(data);
                    }
                  } else {
                    if (label.includes('Country')) {
                      newScript.push(
                        `await ${currentPage === 1 ? 'page' : 'page1'}.getByLabel('${label}').waitFor({ state: 'visible', timeout: 50000 });`,
                      );
                    }
                    if (!currentLine.includes('combobox')) {
                      newScript.push(data);
                    }

                    if (label.includes('Country') && waitingScriptValue) {
                      newScript.push(waitingScriptValue);
                    }
                  }

                  formValues.push(label);
                } else {
                  const newLabel = Object.keys(dataObj).find(
                    (key) => !excludedKeys.includes(key.toLowerCase()),
                  );
                  if (dataObj.userFill && newLabel) {
                    const data = `
                              if(!labelFilled.includes('${newLabel}')){
  
                              await ${currentPage === 1 ? 'page' : 'page1'}.evaluate(() => {
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
              <p>${dataObj?.userFillTextValue ? dataObj?.userFillTextValue : `Please Enter ${newLabel}`}.</p>
              <button id="close-popup-${newLabel}">Close</button>
            \`;
              document.body.appendChild(messageDiv);
              document.getElementById("close-popup-${newLabel}").addEventListener('click', () => {
               const existingPopup = document.getElementById('customMessage-${newLabel}');
        if (existingPopup) {
          existingPopup.style.display = 'none';
          existingPopup.setAttribute('data-closed', 'true');
  
        }
              });
            });
        }
  
  
        await ${currentPage === 1 ? 'page' : 'page1'}.waitForFunction(() => {
          const popup = document.getElementById('customMessage-${newLabel}');
          return popup && popup.getAttribute('data-closed') === 'true';
        }, { timeout: 900000 });
  
        console.log('${newLabel} input acknowledged by user.');
      
                            
                             await ${currentPage === 1 ? 'page' : 'page1'}.waitForFunction(async() => {
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
                    formValues.push(label);
                  }
                }
              }
            }
          } else if (
            currentLine.includes('getByLabel') &&
            currentLine.includes('button')
          ) {
            newScript.push(currentLine);
          } else if (
            currentLine.includes('locator') &&
            currentLine.includes('click') &&
            !currentLine.includes('option')
          ) {
            if (currentLine.includes('checkbox')) {
              const checkBoxObj = finalObj.data.find(
                (item) =>
                  item.type.toLowerCase() === 'checkbox' &&
                  item.locater.replace(/[^a-zA-Z0-9]/g, '') === lineName,
              );
              if (checkBoxObj) {
                if (checkBoxObj[''].length > 0) {
                  newScript.push(currentLine);
                }
              }
            } else {
              newScript.push(currentLine);
            }
          }
        } else if (
          !currentLine.toLowerCase().includes('move') &&
          !currentLine.includes('getByLabel') &&
          !currentLine.includes('combobox') &&
          !currentLine.includes('option') &&
          !currentLine.includes('pause()') &&
          !currentLine.includes('fill') &&
          !currentLine.includes('selectOption') &&
          !currentLine.toLowerCase().includes('search') &&
          !currentLine.includes('press') &&
          !(lastline.includes('Code') && currentLine.includes('Verify'))
        ) {
          const loginLinkIndex = newScript.findIndex((item) =>
            item.includes(`const loginLink =`),
          );
          if (currentLine.includes('link') && loginLinkIndex === -1) {
            newScript.push(
              `const loginLink = ${currentLine.replace('.click()', '')};

                await loginLink.waitFor({ state: 'visible', timeout: 5000 });
                await loginLink.scrollIntoViewIfNeeded();
                await page.waitForLoadState('networkidle');

                for (let i = 0; i < 3; i++) {
                  try {
                    await loginLink.click({ force: true });
                    console.log('Login link clicked successfully.');
                    break;
                  } catch (error) {
                    console.warn('Attempt failed');
                    await ${currentPage === 1 ? 'page' : 'page1'}.waitForTimeout(500);
                  }
                }
                `,
            );
          } else if (
            !nextLine.includes('option') &&
            !nextLine.toLowerCase().includes('search')
          ) {
            newScript.push(currentLine);
          }
        }
      }
    }
  }
  const finalArr = newScript;

  const updatedScript = finalArr.join('\n');

  return updatedScript;
};

type Quote = {
  id: number;
  Profitabilities: {adjusted_price: string; file_name: string}[];
  QuoteFiles: {total_page_count: string; file_name: string}[];
  Opportunity: {synced_quote: number};
  customer_id?: string;
  opportunity_id: string;
  quote_amount?: number;
  gross_profit?: number;
  quote_total?: number;
  gross_profit_percentage?: number;
};

type Metrics = {
  vendorQuotes: number;
  totalPages: number;
  totalLineItems: number;
  totalCustomers: number;
  totalRevenue: number;
  grossProfit: number;
  hoursOfTime: string;
  averageRevenue: string;
  averageGrossProfit: string;
  averageProfitMargin: string;
};

export const calculateMetrics = (quoteData: Quote[]): Metrics => {
  // Helper functions
  const getVendorQuotesCount = (): number => quoteData.length;

  const syncQuotes = quoteData?.filter(
    (item) => item?.Opportunity?.synced_quote === item?.id,
  );

  const getTotalPages = (): number => {
    const rowsPerPage = 50;

    // Extract total pages from PDFs
    const pdfPageCounts = quoteData
      ?.flatMap((quote) => quote?.QuoteFiles || []) // Extract all QuoteFiles arrays and flatten them
      ?.filter((file) => file?.file_name?.includes('pdf')) // Keep only PDFs
      ?.reduce((sum, file) => sum + (Number(file?.total_page_count) || 0), 0); // Sum up total_page_count

    // Extract total rows from XLSX files (count the number of XLSX files)
    const xlsxFilesRows = quoteData
      ?.flatMap((quote) => quote.Profitabilities || []) // Extract all Profitabilities arrays and flatten them
      ?.filter((file) => file?.file_name?.includes('xlsx'))?.length; // Keep only XLSX files // Get the total count of XLSX files

    // Calculate pages for XLSX files
    const xlsxFilesPages = Math.ceil(xlsxFilesRows / rowsPerPage);

    return pdfPageCounts + xlsxFilesPages;
  };

  const getTotalLineItems = (): number => {
    let totalLineItems = 0;
    quoteData.forEach((quote) => {
      totalLineItems += quote.Profitabilities.length;
    });
    return totalLineItems;
  };

  const getTotalCustomers = (): number => {
    const uniqueCustomers = new Set<string>();

    quoteData.forEach((quote) => {
      if (quote.customer_id) {
        uniqueCustomers.add(quote.customer_id);
      }
    });
    return uniqueCustomers.size;
  };

  const getTotalRevenue = (): number => {
    if (!syncQuotes || syncQuotes.length === 0) {
      return 0; // Return 0 if syncQuotes is undefined or empty
    }
    return syncQuotes.reduce(
      (sum, quote) => sum + (Number(quote?.quote_total) || 0),
      0,
    );
  };
  const getGrossProfit = (): number => {
    if (!syncQuotes || syncQuotes.length === 0) {
      return 0; // Return 0 if syncQuotes is undefined or empty
    }
    return syncQuotes.reduce(
      (sum, quote) => sum + (Number(quote?.gross_profit) || 0),
      0,
    );
  };

  const getTotalHoursSpent = (): string => {
    const minutesPerUniqueFile = 10;
    // Flatten the QuoteFiles and count the total number of files
    const totalFiles = quoteData.flatMap(
      (quote) => quote?.QuoteFiles || [],
    ).length; // Flatten QuoteFiles array // Get the total number of files

    // Calculate total minutes
    const totalMinutes = totalFiles * minutesPerUniqueFile;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hr ${minutes} min`;
  };

  const getAveragePerQuoteRevenue = (): number => {
    if (!syncQuotes || syncQuotes.length === 0) {
      return 0; // Return 0 if syncQuotes is undefined or empty
    }

    const totalRevenue = syncQuotes.reduce(
      (sum, quote) => sum + (Number(quote?.quote_total) || 0),
      0,
    );
    const totalQuotes = syncQuotes.length;

    return totalRevenue / totalQuotes;
  };

  const getAverageGrossProfit = (): string => {
    if (!syncQuotes || syncQuotes.length === 0) {
      return '0.00'; // Return "0.00" if there are no syncing quotes
    }

    const totalGrossProfit = syncQuotes.reduce(
      (sum, quote) => sum + (Number(quote?.gross_profit) || 0),
      0,
    );
    const averageGrossProfit = totalGrossProfit / syncQuotes.length;

    return averageGrossProfit.toFixed(2);
  };

  const getAverageProfitMargin = (): string => {
    if (!syncQuotes || syncQuotes.length === 0) {
      return '0.00'; // Return "0.00" if there are no syncing quotes
    }

    // Calculate total Gross Profit Percentage
    const totalGrossProfitPercentage = syncQuotes.reduce(
      (sum, quote) => sum + (Number(quote?.gross_profit_percentage) || 0),
      0,
    );

    // Calculate the average Gross Profit Percentage
    const averageProfitMargin = totalGrossProfitPercentage / syncQuotes.length;

    return averageProfitMargin.toFixed(2);
  };

  // Calculate all metrics

  const metrics: any = {
    Converted: {
      vendorQuotes: getVendorQuotesCount(),
      totalPages: getTotalPages(),
      totalLineItems: getTotalLineItems(),
    },
    Quoted: {
      totalCustomers: getTotalCustomers(),
      totalRevenue: getTotalRevenue(),
      grossProfit: getGrossProfit(),
    },
    Earned: {
      hoursOfTime: getTotalHoursSpent(),
      grossProfit: getGrossProfit(),
    },
    AverageQuote: {
      averageRevenue: getAveragePerQuoteRevenue(),
      averageGrossProfit: getAverageGrossProfit(),
      averageProfitMargin: getAverageProfitMargin(),
    },
  };

  return metrics;
};
