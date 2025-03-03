/* eslint-disable no-continue */
/* eslint-disable prefer-regex-literals */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react-hooks/rules-of-hooks */

import {FormInstance, InputNumberProps} from 'antd';
import axios from 'axios';

import moment from 'moment';


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


export const getResultedValue = () => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('userInfo');
    if (storedData) {
      try {
        const permissions = JSON?.parse(storedData);
        const {QuoteAI, DealReg} = permissions;
        if (QuoteAI && DealReg) {
          return false;
        }
        if (QuoteAI) {
          return false;
        }
        if (!QuoteAI && DealReg) {
          return true;
        }

        return permissions;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return null;
      }
    }

    return null;
  }

  return null;
};

export const calculateProfitabilityData = (
  Qty: number,
  PriceMethod: string,
  Amount: number,
  Cost: number,
  MSRP: number,
) => {
  let unitPrice = 0;
  let exitPrice = 0;
  let grossProfit = 0;
  let grossProfitPercentage = 0;

  if (PriceMethod === 'cost_dollar') {
    unitPrice = Cost + Amount;
    exitPrice = Qty * unitPrice;
    grossProfit = unitPrice * Qty - Cost * Qty;
    grossProfitPercentage = (grossProfit / exitPrice) * 100;
  } else if (PriceMethod === 'cost_percentage') {
    unitPrice = Cost + (Amount / 100) * Cost;
    exitPrice = Qty * unitPrice;
    grossProfit = unitPrice * Qty - Cost * Qty;
    grossProfitPercentage = (grossProfit / exitPrice) * 100;
  } else if (PriceMethod === 'list_percentage') {
    unitPrice = MSRP - (Amount / 100) * MSRP;
    exitPrice = Qty * unitPrice;
    grossProfit = unitPrice * Qty - Cost * Qty;
    grossProfitPercentage = (grossProfit / exitPrice) * 100;
  } else if (PriceMethod === 'list_dollar') {
    unitPrice = MSRP + Amount;
    exitPrice = Qty * unitPrice;
    grossProfit = unitPrice * Qty - Cost * Qty;
    grossProfitPercentage = (grossProfit / exitPrice) * 100;
  } else if (PriceMethod === 'manual') {
    unitPrice = Amount;
    exitPrice = Qty * unitPrice;
    grossProfit = unitPrice * Qty - Cost * Qty;
    grossProfitPercentage = (grossProfit / exitPrice) * 100;
  } else if (PriceMethod === 'gp') {
    unitPrice = Cost / (1 - Amount / 100);
    exitPrice = Qty * unitPrice;
    grossProfit = unitPrice * Qty - Cost * Qty;
    grossProfitPercentage = (grossProfit / exitPrice) * 100;
  }
  return {
    unitPrice,
    exitPrice,
    grossProfit,
    grossProfitPercentage,
  };
};


export const useRemoveDollarAndCommahook = (value: any): number => {
  if (!value) return 0; // Ensure it doesn't return NaN or undefined

  // Remove $ and commas, keep only numbers and decimal points
  const cleanedValue = value
    .toString()
    .replace(/[$,]/g, '') // Remove `$` and `,`
    .replace(/[^0-9.]/g, '') // Keep only digits and `.`
    .replace(/^0+(?=\d)/, ''); // Remove leading zeros but keep "0.00"

  const numberValue = parseFloat(cleanedValue);
  return isNaN(numberValue) ? 0 : numberValue; // Ensure a valid number is returned
};

export const useRemoveDollarAndCommahookDataa = (value: any) => {
  const match = value?.toString().match(/(\d+(\.\d+)?)/);
  if (match) {
    return match[0];
  }
};

export const rebateAmount = (
  cost: number,
  quantity: number,
  percentagePayout: number,
) => cost * quantity * (percentagePayout / 100);

export const totalRevenue = (list_amount: number, quantity: number) =>
  list_amount * quantity;

export const formatDate = (date: Date | string, format = 'MM/DD/YYYY') =>
  moment(date).format(format) ?? '--';
export const formatDateWithTime = (date: Date | string, format = 'HH:MM') =>
  moment(date).format(format) ?? '--';

export const calculateDaysDifference = (startDate: string, endDate: string) => {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  return endMoment.diff(startMoment, 'days');
};

export const formbuildernewObject = (newItem: string) => {
  let newObjAddedon: any;

  if (newItem === 'Table') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',
      label: 'Label',
      required: false,
      user_fill: false,
      noOfRowsData: ['row1', 'row2'],
      noOfRows: 2,
      noOfColumn: 2,
      ColumnsData: [
        {
          title: 'Column 1',
          dataIndex: 'address',
          key: '1',
          type: 'text',
          options: [],
        },
        {
          title: 'Column 2',
          dataIndex: 'address',
          key: '2',
          type: 'text',
          options: [],
        },
      ],
    };
  } else if (newItem === 'Multi-Select' || newItem === 'Drop Down') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      type: 'tag',
      user_fill: false,
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: '',
      options: [],
      dependentFiledArr: [],
      dependentFiled: false,
    };
  } else if (newItem === 'Line Break') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',
    };
  } else if (newItem === 'Time') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      user_fill: false,
      type: 'Time',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: '',
      timeformat: 'HH:mm',
      use12hours: true,
    };
  } else if (newItem === 'Date') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      user_fill: false,
      type: 'Date',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: '',
      dateformat: 'MMM D,YYYY',
      weekStartOn: 'sunday',
      StartDate: '',
      enddate: '',
    };
  } else if (newItem === 'Contact') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      type: 'number',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: '',
      defaultcountry: 'US',
      dataformat: ' (333) 333-3333',
    };
  } else if (newItem === 'Currency') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      user_fill: false,
      type: 'text',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'Hint Value',
      currency: 'USD',
      deciamlHide: false,
    };
  } else if (newItem === 'Radio Button' || newItem === 'Toggle') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      type: 'multiple',
      required: false,
      user_fill: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'Hint Value',
      labelOptions: [],
      dependentFiledArr: [],
      dependentFiled: false,
    };
  } else if (newItem === 'Text Content') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      sectionTitle: 'Section Title',
      Alignemnt: 'left',
      FontSize: 'h2',
    };
  } else if (newItem === 'Checkbox') {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      placeholdertext: 'placeholder text',
      labelOptions: [],
      user_fill: false,
      type: 'multiple',
      columnRequired: 1,
      required: false,
      requiredLabel: true,
      filedType: 'Checkbox',
      label: 'Label',
      dependentFiledArr: [],
      dependentFiled: false,
    };
  } else if (
    newItem === 'Text' ||
    newItem === 'Textarea' ||
    newItem === 'Email'
  ) {
    newObjAddedon = {
      name: newItem,
      customFieldName: '',
      locater: '',

      label: 'Label',
      type: 'text',
      required: false,
      user_fill: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: '',
    };
  } else if (newItem === 'Attachment') {
    newObjAddedon = {
      pdfUrl: null,

      required: false,
      user_fill: false,
      label: 'Label',
      type: 'Attachment',
      name: newItem,
      customFieldName: '',
      locater: '',
    };
  }
  return newObjAddedon;
};

export const filterDataByColumns = (columns: any, data: any) =>
  data.map((item: any) => {
    const filteredItem: any = {};
    columns?.forEach((column: any) => {
      const {dataIndex, title} = column;
      // eslint-disable-next-line no-prototype-builtins
      if (dataIndex && item.hasOwnProperty(dataIndex)) {
        filteredItem[title] = item[dataIndex];
      }
    });
    return filteredItem;
  });

export const convertDataToText = (columns: any, data: any) => {
  const filteredData = filterDataByColumns(columns, data);

  if (!filteredData?.length) {
    console.error('No data available for conversion.');
    return '';
  }

  const header = Object.keys(filteredData[0]).join('\t');
  // eslint-disable-next-line arrow-body-style
  const textData = filteredData?.map((item: any) => {
    return (
      Object.values(item)
        // eslint-disable-next-line arrow-body-style
        .map((value) => {
          // Ensure that values are strings, and escape tabs
          return typeof value === 'string'
            ? value.replace(/\t/g, '\\t').replace(/\n/g, ' ')
            : value;
        })
        .join('\t')
    );
  });

  return `${header}\n${textData.join('\n')}`;
};

export const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });

const genericFun = (
  finalLineItems: any[],
  dataArray: any[],
): {[key: string]: any}[] =>
  dataArray.map((item) => ({
    ...item,
    quote_line_item_id: finalLineItems?.find(
      (itm) => itm.product_code === item.product_code,
    )?.id,
  }));



export const sendDataToNanonets = async (model_id: string, file: File) => {
  let API_ENDPOINT = '';
  if (file?.type.includes('spreadsheetml')) {
    API_ENDPOINT = `https://app.nanonets.com/api/v2/OCR/Model/0ba764d3-bfd5-4756-bdb1-0e5bc427bdda/LabelFile/`;
  } else {
    API_ENDPOINT = `https://app.nanonets.com/api/v2/OCR/Model/${model_id}/LabelFile/`;
  }
  const API_KEY = '198c15fd-9680-11ed-82f6-7a0abc6e8cc8';
  const formData = new FormData();
  formData?.append('file', file);
  try {
    const response = await axios.post(API_ENDPOINT, formData, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/pdf',
      },
    });
    return response;
  } catch (err) {
    console.log('ERR', err);
    throw err;
  }
};

export const partnerProgramFilter = (
  typeOfLogin: string,
  userInformation: any,
  allPartnerData: any,
  activeTab: number,
  superAdminSide?: boolean,
) => {
  const FilterArrayDataa: any = [];
  // Used for case of User
  const aprovedIds: any = [];
  const allRequestedIds: any = [];

  // Used for case of super admin

  const superAdminAllApprovedIds: any = [];
  const requestIdsForSuperAdmin: any = [];
  const rejectedIdsForSuperAdmin: any = [];

  allPartnerData?.map((itemPartner: any) => {
    if (
      itemPartner?.PartnerPrograms &&
      itemPartner?.PartnerPrograms?.length > 0
    ) {
      itemPartner?.PartnerPrograms?.filter((itemProgram: any) => {
        if (typeOfLogin === 'user') {
          // Approved for organization
          if (
            itemProgram?.AssignPartnerProgram?.organization ===
              userInformation?.organization &&
            itemProgram?.AssignPartnerProgram?.is_approved
          ) {
            aprovedIds?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id,
            );
          } else if (
            // Requested but not approved or decliend
            itemProgram?.AssignPartnerProgram?.organization ===
              userInformation?.organization &&
            itemProgram?.AssignPartnerProgram?.is_approved === null
          ) {
            allRequestedIds?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id,
            );
          }
        } else {
          // Approved for organization
          if (
            (itemProgram?.organization === 'rainmakercloud' &&
              !itemProgram?.AssignPartnerProgram) ||
            itemProgram?.AssignPartnerProgram?.is_approved
          ) {
            superAdminAllApprovedIds?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id ??
                itemProgram?.id,
            );
          } else if (
            // Requested but not approved or decliend
            itemProgram?.AssignPartnerProgram?.is_approved === null
          ) {
            requestIdsForSuperAdmin?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id,
            );
          } else if (!itemProgram?.AssignPartnerProgram?.is_approved) {
            rejectedIdsForSuperAdmin?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id,
            );
          } else if (
            (itemProgram?.user_id === userInformation?.id &&
              itemProgram?.AssignPartnerProgram) ||
            itemProgram?.AssignPartnerProgram?.is_approved
          ) {
            superAdminAllApprovedIds?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id ??
                itemProgram?.id,
            );
          }
        }
      });
    }
  });

  let allNotRequestedIds: any = [];
  allNotRequestedIds = aprovedIds?.concat(allRequestedIds);

  // Case for User active only
  const userActivePartner: any = [];

  allPartnerData?.map((item: any) => {
    item?.PartnerPrograms?.filter((itemProgramD: any) => {
      if (!allNotRequestedIds?.includes(itemProgramD?.id)) {
        userActivePartner?.push(itemProgramD?.id);
      }
    });
  });

  if (activeTab === 1) {
    allPartnerData?.map((item: any) => {
      const newArrForPrograms: any = [];
      if (item?.PartnerPrograms) {
        if (typeOfLogin === 'user' || superAdminSide) {
          item?.PartnerPrograms?.filter((itemProgramD: any) => {
            if (
              !allNotRequestedIds?.includes(itemProgramD?.id) &&
              (!itemProgramD?.AssignPartnerProgram ||
                itemProgramD?.AssignPartnerProgram?.is_approved ||
                itemProgramD?.organization === 'rainmakercloud')
            ) {
              newArrForPrograms?.push(itemProgramD);
            }
          });
        } else {
          item?.PartnerPrograms?.filter((itemProgramD: any) => {
            if (superAdminAllApprovedIds?.includes(itemProgramD?.id)) {
              newArrForPrograms?.push(itemProgramD);
            }
          });
        }
      }
      // if (newArrForPrograms?.length > 0 || superAdminSide) {
      const newObj: any = {...item};
      delete newObj.PartnerPrograms;
      if (newArrForPrograms?.length > 0) {
        newObj.PartnerPrograms = newArrForPrograms;
      }
      FilterArrayDataa?.push(newObj);
      // }
    });
  } else if (activeTab === 2) {
    allPartnerData?.map((item: any) => {
      const newArrForPrograms: any = [];
      if (item?.PartnerPrograms) {
        if (typeOfLogin === 'user') {
          item?.PartnerPrograms?.filter((itemProgramD: any) => {
            if (aprovedIds?.includes(itemProgramD?.id)) {
              newArrForPrograms?.push(itemProgramD);
            }
          });
        } else {
          item?.PartnerPrograms?.filter((itemProgramD: any) => {
            if (requestIdsForSuperAdmin?.includes(itemProgramD?.id)) {
              newArrForPrograms?.push(itemProgramD);
            }
          });
        }
      }
      if (newArrForPrograms?.length > 0) {
        const newObj: any = {...item};
        delete newObj.PartnerPrograms;
        if (newArrForPrograms?.length > 0) {
          newObj.PartnerPrograms = newArrForPrograms;
        }
        FilterArrayDataa?.push(newObj);
      }
    });
  } else if (activeTab === 3) {
    allPartnerData?.map((item: any) => {
      const newArrForPrograms: any = [];
      if (item?.PartnerPrograms) {
        if (typeOfLogin === 'user') {
          item?.PartnerPrograms?.filter((itemProgramD: any) => {
            if (allRequestedIds?.includes(itemProgramD?.id)) {
              newArrForPrograms?.push(itemProgramD);
            }
          });
        } else {
          item?.PartnerPrograms?.filter((itemProgramD: any) => {
            if (rejectedIdsForSuperAdmin?.includes(itemProgramD?.id)) {
              newArrForPrograms?.push(itemProgramD);
            }
          });
        }
      }
      if (newArrForPrograms?.length > 0) {
        const newObj: any = {...item};
        delete newObj.PartnerPrograms;
        if (newArrForPrograms?.length > 0) {
          newObj.PartnerPrograms = newArrForPrograms;
        }
        FilterArrayDataa?.push(newObj);
      }
    });
  }

  return {
    filterData: FilterArrayDataa,
    superRequestedPartner: requestIdsForSuperAdmin?.length,
    superRejectedPartner: rejectedIdsForSuperAdmin?.length,
    superAllPartner: superAdminAllApprovedIds?.length,
    userActivePartner: aprovedIds?.length,
    userRequestedPartner: allRequestedIds?.length,
    userAllPartner: userActivePartner?.length,
  };
  // return FilterArrayDataa;
};

export const formatStatus = (str: string) => {
  // if (str === 'inprogress') {
  //   return 'In Progress';
  // }
  // if (str === 'ro_closed') {
  //   return 'RO Closed';
  // }
  // if (str === 'require_customer_authorization') {
  //   return 'Requires Customer Authorization';
  // }
  const frags = str?.toString()?.split('_');
  const fragLength = frags?.length;
  for (let i = 0; i < fragLength; i++) {
    frags[i] = frags[i]?.charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags?.join(' ');
};

export const getLineItemsWithNonRepitive = (arrayValue: any) => {
  const newArrValues: any = [];
  arrayValue.forEach((itemsPro: any) => {
    const checkAlreadyExist: any =
      newArrValues?.length > 0 ? [...newArrValues] : [];

    const finIndexForAlreadyPushed = checkAlreadyExist?.findIndex(
      (checkExistItem: any) =>
        itemsPro?.product_code &&
        itemsPro?.product_code !== null &&
        itemsPro?.product_code !== undefined &&
        checkExistItem?.product_code?.toString()?.replace(/\s/g, '') ===
          itemsPro?.product_code?.toString()?.replace(/\s/g, ''),
    );
    let nulllProductAdded: boolean = false;

    if (finIndexForAlreadyPushed === -1 && !nulllProductAdded) {
      newArrValues?.push({
        ...itemsPro,
        product_code:
          itemsPro?.product_code &&
          itemsPro?.product_code !== null &&
          itemsPro?.product_code !== undefined
            ? itemsPro?.product_code?.toString()?.replace(/\s/g, '')
            : 'NEWCODE0123',
      });
    }
    if (!itemsPro?.product_code) {
      nulllProductAdded = true;
    }
  });

  const finalArrr: any = [];

  newArrValues?.map((itemss: any) => {
    const findIndexValues = finalArrr?.findIndex(
      (itemsInner: any) => itemsInner?.product_code === itemss?.product_code,
    );
    if (findIndexValues === -1 && itemss?.product_code) {
      finalArrr?.push(itemss);
    }
  });

  return finalArrr;
};

export const getValuesOFLineItemsThoseNotAddedBefore = (
  lineItem: any,
  allProductCodeDataa: any,
) => {
  const newInsertionData: any = [];
  for (let i = 0; i < lineItem?.length; i++) {
    const allLineItems = lineItem[i];
    const productCode = allLineItems?.product_code
      ? allLineItems?.product_code &&
        allLineItems?.product_code !== null &&
        allLineItems?.product_code !== undefined &&
        allLineItems?.product_code?.toString()?.replace(/\s/g, '')
      : 'NEWCODE0123';
    const finIndexOfItem = allProductCodeDataa?.findIndex(
      (itemIndex: any) =>
        itemIndex?.product_code &&
        itemIndex?.product_code !== null &&
        itemIndex?.product_code !== undefined &&
        itemIndex?.product_code?.toString()?.replace(/\s/g, '') === productCode,
    );
    if (finIndexOfItem === -1) {
      newInsertionData?.push(allLineItems);
    }
  }
  const finalArrr: any = [];

  newInsertionData?.map((itemss: any) => {
    const findIndexValues = finalArrr?.findIndex(
      (itemsInner: any) => itemsInner?.product_code === itemss?.product_code,
    );
    if (findIndexValues === -1 && itemss?.product_code) {
      finalArrr?.push(itemss);
    }
  });

  return finalArrr;
};

// Helper functions to encode/decode base64
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = window.atob(base64); // Decode base64
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer); // Convert ArrayBuffer to Uint8Array
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary); // Encode to base64
};

// Ensure key is 16 or 32 bytes long for AES-GCM
const getKey = (key: string): Uint8Array => {
  // Ensure consistent input formatting
  const sanitizedKey = key.replace(/^"|"$/g, '').replace(/;$/, ''); // Remove quotes and trailing semicolon
  const keyBytes = new TextEncoder().encode(sanitizedKey);
  if (keyBytes.length === 16 || keyBytes.length === 32) return keyBytes; // Valid key length
  if (keyBytes.length < 16) {
    return new Uint8Array([
      ...keyBytes,
      ...new Uint8Array(16 - keyBytes.length),
    ]); // Pad to 16 bytes
  }
  if (keyBytes.length < 32) {
    return new Uint8Array([
      ...keyBytes,
      ...new Uint8Array(32 - keyBytes.length),
    ]); // Pad to 32 bytes
  }
  return keyBytes.slice(0, 32); // Trim to 32 bytes
};

// Encrypt function
export const encrypt = async (
  text: string,
  key: string,
): Promise<{iv: string; data: string}> => {
  try {
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(text); // Encode plain text
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      getKey(key),
      {name: 'AES-GCM'},
      false,
      ['encrypt'],
    );

    const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM requires a 12-byte IV
    const encrypted = await crypto.subtle.encrypt(
      {name: 'AES-GCM', iv},
      cryptoKey,
      encodedText,
    );

    return {
      iv: arrayBufferToBase64(iv.buffer), // Pass the `ArrayBuffer` from the `Uint8Array`
      data: arrayBufferToBase64(encrypted), // `encrypted` is already an `ArrayBuffer`
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

// Decrypt function
export const decrypt = async (
  encrypted: string,
  key: string,
  iv: string,
): Promise<string> => {
  try {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      getKey(key),
      {name: 'AES-GCM'},
      false,
      ['decrypt'],
    );
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: base64ToArrayBuffer(iv), // Decode base64 IV
      },
      cryptoKey,
      base64ToArrayBuffer(encrypted), // Decode base64 encrypted data
    );
    return new TextDecoder().decode(decrypted); // Decode decrypted text
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

export const getContractStatus = (
  firstValue: any,
  secondValue: any,
  operator: string,
): string => {
  switch (operator) {
    case '==':
      return Number(firstValue) == Number(secondValue) ? 'Correct' : 'Reject';
    case '!=':
      return Number(firstValue) != Number(secondValue) ? 'Correct' : 'Reject';
    case '>':
      return Number(firstValue) > Number(secondValue) ? 'Correct' : 'Reject';
    case '<':
      return Number(firstValue) < Number(secondValue) ? 'Correct' : 'Reject';
    case '>=':
      return Number(firstValue) >= Number(secondValue) ? 'Correct' : 'Reject';
    case '<=':
      return Number(firstValue) <= Number(secondValue) ? 'Correct' : 'Reject';
    default:
      return 'Invalid operator';
  }
};

export const currencyFormatter: InputNumberProps['formatter'] = (
  f,
  {userTyping},
) => 
  // if (!f) {
  //   return '';
  // }
  // if (!userTyping) {
  //   return `${Number(f)
  //     .toFixed(2)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  // }
   `${f}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
;

export const currencyAmountFormatter: InputNumberProps['formatter'] = (
  f,
  {userTyping},
) => {
  if (!f) {
    return '';
  }
  if (!userTyping) {
    return `${Number(f)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  return `${f}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFormattedValuesForBundlesOnly = (
  objectForSyncingValues: any,
) => {
  const finArrr: any = [];

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.bundleData?.length > 0
  ) {
    objectForSyncingValues?.bundleData?.map(
      (itemBun: any, indexBun: number) => {
        console.log('itemBun', itemBun);
        const innerLineArr: any = [];
        itemBun?.Profitabilities?.map((items: any, index: number) => {
          const newObj = {
            attributes: {
              type: 'QuoteLineItem',
            },
            Id: items?.id,
            line_number: items?.line_number ? items?.line_number : index + 1,
            quantity: items?.quantity,
            product_code: items?.product_code,
            description: items?.description,
            line_amount: items?.unit_price,
            list_price: items?.list_price,
            organization: objectForSyncingValues?.distributor_name
              ? objectForSyncingValues?.distributor_name
              : objectForSyncingValues?.oem_name
                ? objectForSyncingValues?.oem_name
                : items?.organization,
          };
          innerLineArr?.push(newObj);
        });
        let totalExtendedPrice: any = 0;
        innerLineArr?.forEach((items: any) => {
          totalExtendedPrice += Number(items?.list_price);
        });
        const extendedPriceFinal =
          totalExtendedPrice * Number(itemBun?.quantity);
        const grand_totalFinal =
          extendedPriceFinal +
          Number(objectForSyncingValues?.quote_tax) +
          Number(objectForSyncingValues?.quote_shipping);
        const finalObj = {
          attributes: {
            type: 'QuoteLineItem',
          },
          Id: '1',
          bundle_name: itemBun?.name,
          extended_price: totalExtendedPrice * Number(itemBun?.quantity),
          bundle_grand_total: grand_totalFinal,
          quote_line_items: {
            records: innerLineArr,
          },
        };

        finArrr?.push(finalObj);
      },
    );
  }

  return finArrr;
};

export const getFormattedValuesForLineItems = (objectForSyncingValues: any) => {
  let finArrr: any = [];

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.QuoteLineItems?.length > 0
  ) {
    const newArrOfOject: any = [];
    objectForSyncingValues?.QuoteLineItems?.map((items: any, index: number) => {
      const newObj = {
        attributes: {
          type: 'QuoteLineItem',
        },
        Id: items?.id,
        line_number: items?.line_number ? items?.line_number : index + 1,
        quantity: items?.quantity,
        product_code: items?.product_code,
        description: items?.description,
        line_amount: items?.unit_price,
        list_price: items?.list_price,
        organization: objectForSyncingValues?.distributor_name
          ? objectForSyncingValues?.distributor_name
          : objectForSyncingValues?.oem_name
            ? objectForSyncingValues?.oem_name
            : items?.organization,
      };
      newArrOfOject?.push(newObj);
    });

    finArrr = newArrOfOject;
  }

  return finArrr;
};

export const getFormattedValuesForWithAndWithoutBundles = (
  objectForSyncingValues: any,
) => {
  const finArrr: any = [];

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.bundleData?.length > 0
  ) {
    objectForSyncingValues?.bundleData?.map(
      (itemBun: any, indexBun: number) => {
        console.log('itemBun', itemBun);
        const innerLineArr: any = [];
        itemBun?.Profitabilities?.map((items: any, index: number) => {
          const newObj = {
            attributes: {
              type: 'QuoteLineItem',
            },
            Id: items?.id,
            line_number: items?.line_number ? items?.line_number : index + 1,
            quantity: items?.quantity,
            product_code: items?.product_code,
            description: items?.description,
            line_amount: items?.unit_price,
            list_price: items?.list_price,
            organization: objectForSyncingValues?.distributor_name
              ? objectForSyncingValues?.distributor_name
              : objectForSyncingValues?.oem_name
                ? objectForSyncingValues?.oem_name
                : items?.organization,
          };
          innerLineArr?.push(newObj);
        });
        let totalExtendedPrice: any = 0;
        innerLineArr?.forEach((items: any) => {
          totalExtendedPrice += Number(items?.list_price);
        });
        const extendedPriceFinal =
          totalExtendedPrice * Number(itemBun?.quantity);
        const grand_totalFinal =
          extendedPriceFinal +
          Number(objectForSyncingValues?.quote_tax) +
          Number(objectForSyncingValues?.quote_shipping);

        const finalObj = {
          attributes: {
            type: 'QuoteLineItem',
          },
          Id: '1',
          bundle_name: itemBun?.name,
          extended_price: extendedPriceFinal,
          grand_total: grand_totalFinal,
          quote_line_items: {
            records: innerLineArr,
          },
        };

        finArrr?.push(finalObj);
      },
    );
  }

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.QuoteLineItems?.length > 0
  ) {
    let totalExtendedPrice: any = 0;
    objectForSyncingValues?.QuoteLineItems?.forEach((items: any) => {
      totalExtendedPrice += Number(items?.list_price);
    });
    const extendedPriceFinal = totalExtendedPrice;
    const grand_totalFinal =
      extendedPriceFinal +
      Number(objectForSyncingValues?.quote_tax) +
      Number(objectForSyncingValues?.quote_shipping);
    objectForSyncingValues?.QuoteLineItems?.map((items: any, index: number) => {
      const newObj = {
        attributes: {
          type: 'QuoteLineItem',
        },
        Id: items?.id,
        line_number: items?.line_number ? items?.line_number : index + 1,
        quantity: items?.quantity,
        product_code: items?.product_code,
        description: items?.description,
        line_amount: items?.unit_price,
        list_price: items?.list_price,
        organization: objectForSyncingValues?.distributor_name
          ? objectForSyncingValues?.distributor_name
          : objectForSyncingValues?.oem_name
            ? objectForSyncingValues?.oem_name
            : items?.organization,
        extended_price: extendedPriceFinal,
        grand_total: grand_totalFinal,
      };
      finArrr?.push(newObj);
    });
  }

  return finArrr;
};
export const getFormattedValuesForWithAndWithoutBundlesForExcelFile = (
  objectForSyncingValues: any,
) => {
  const bundleArrOfObject: any = [];
  const lineItemsArr: any = [];

  // ====================== For LineItems ==================================

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.QuoteLineItems?.length > 0
  ) {
    let totalExtendedPrice: any = 0;
    objectForSyncingValues?.QuoteLineItems?.forEach((items: any) => {
      totalExtendedPrice += Number(items?.list_price);
    });
    const extendedPriceFinal = totalExtendedPrice;
    const grand_totalFinal =
      extendedPriceFinal +
      Number(objectForSyncingValues?.quote_tax) +
      Number(objectForSyncingValues?.quote_shipping);
    objectForSyncingValues?.QuoteLineItems?.map((items: any, index: number) => {
      const newObj = {
        attributes: {
          type: 'QuoteLineItem',
        },
        Id: items?.id,
        line_number: items?.line_number ? items?.line_number : index + 1,
        quantity: items?.quantity,
        product_code: items?.product_code,
        description: items?.description,
        line_amount: items?.unit_price,
        list_price: items?.list_price,
        // eslint-disable-next-line no-nested-ternary
        organization: objectForSyncingValues?.distributor_name
          ? objectForSyncingValues?.distributor_name
          : objectForSyncingValues?.oem_name
            ? objectForSyncingValues?.oem_name
            : items?.organization,
        extended_price: extendedPriceFinal,
        grand_total: grand_totalFinal,
      };
      lineItemsArr?.push(newObj);
    });
  }

  // ====================== For Bundles ==================================
  if (
    objectForSyncingValues &&
    objectForSyncingValues?.bundleData?.length > 0
  ) {
    objectForSyncingValues?.bundleData?.map(
      (itemBun: any, indexBun: number) => {
        if (itemBun?.name) {
          bundleArrOfObject?.push({
            rowType: 'header',
            Id: indexBun + 1,
            ProductGroup: itemBun?.name,
          });
        }
        itemBun?.Profitabilities?.map((items: any, index: number) => {
          const newObj = {
            Id: items?.id,
            line_number: items?.line_number ? items?.line_number : index + 1,
            quantity: items?.quantity,
            product_code: items?.product_code,
            description: items?.description,
            line_amount: items?.unit_price,
            list_price: items?.list_price,
            organization: objectForSyncingValues?.distributor_name
              ? objectForSyncingValues?.distributor_name
              : objectForSyncingValues?.oem_name
                ? objectForSyncingValues?.oem_name
                : items?.organization,
          };
          bundleArrOfObject?.push(newObj);
        });

        // finArrr?.push(finalObj);
      },
    );
  }

  return {lineItemss: lineItemsArr, bundleData: bundleArrOfObject};
};

export const AlphabetsRegex = /^[A-Za-z\s]+$/;
export const AlphabetsRegexWithSpecialChr =
  /^[A-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i;
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const filterRequiredAndNonEmptyValues = (obj: any) => {
  if (!obj) return {};

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) =>
        key.includes('_required') && value !== '' && value !== undefined,
    ),
  );
};

export const calculateTabBarPercentage = (
  PartnerProgram: any,
  AttributeFieldData: any,
  UniqueFormData: any,
  CommonFormData: any,
  parseForms: boolean = false,
  type: string,
) => {
  const allContent =
    type !== 'self_registered' &&
    PartnerProgram?.length > 0 &&
    PartnerProgram?.[0] &&
    JSON?.parse(PartnerProgram?.[0])
      .flatMap((section: any) => section?.content)
      .filter((item: any) => item?.required);

  const filteAttributeFieldData = AttributeFieldData?.filter(
    (AttributeFieldItem: any) => AttributeFieldItem?.is_required,
  );

  const totalCount = [filteAttributeFieldData, allContent]
    .filter((array) => array !== undefined && array !== null && array !== false)
    .flatMap((array) => array);

  // const uniqueFormData = parseForms
  //   ? UniqueFormData
  //     ? UniqueFormData && JSON?.parse(UniqueFormData)
  //     : {}
  //   : UniqueFormData || {};

  const uniqueFormData =
    parseForms && type !== 'self_registered'
      ? UniqueFormData
        ? UniqueFormData && JSON?.parse(UniqueFormData)
        : {}
      : UniqueFormData || {};

  const commonFormData = parseForms
    ? CommonFormData
      ? CommonFormData && JSON?.parse(CommonFormData)
      : {}
    : CommonFormData || {};

  const filteredObj1 = filterRequiredAndNonEmptyValues(uniqueFormData);
  const filteredObj2 = filterRequiredAndNonEmptyValues(commonFormData);

  const mergedObj = {...filteredObj1, ...filteredObj2};
  if (Object.keys(mergedObj).length === 0) {
    return 100;
  }
  const filledValueLength = Object.keys(mergedObj).length;
  const fillupPercentage = (filledValueLength / totalCount?.length) * 100;
  return Math.round(fillupPercentage);
};

// export const FormatJsonForSalesForce = (formData: any) => {
//   let uniqueformdata = formData?.unique_form_data;
//   let uniquetemplate = formData?.unique_template;

//   let newArrr :any = [];
//   uniquetemplate?.map((items:any)=>{
//     let newArrForContent:any=[]
//     if(items?.name !== "Text Content"){
//       let findIndex = uniqueformdata?.find((itemIn:any)=> Object.keys(itemIn) )
//     }
//   })

//   console.log('43543543543', uniqueformdata, uniquetemplate);
// };

const isEmptyObject = (obj: any) => Object.keys(obj)?.length === 0;

export const mergeArrayWithObject = (arr1: any, obj2: any) => {
  const safeArray1 = Array.isArray(arr1) ? arr1 : [];
  const safeObject2 =
    obj2 &&
    typeof obj2 === 'object' &&
    !Array.isArray(obj2) &&
    !isEmptyObject(obj2)
      ? obj2
      : null;
  return safeObject2 ? [...safeArray1, safeObject2] : safeArray1;
};

export const processFormData = (template: any[], finalUniqueData: any) => {
  // Extract labels with user_fill set to true from the template
  const labelsWithUserFillTrue = template
    .filter((item: any) => item.user_fill === true)
    .map((item: any) => item.label);

  // Transform data keys
  const transformedData: any[] = [];

  for (const key in finalUniqueData) {
    if (finalUniqueData.hasOwnProperty(key)) {
      // Step 1: Remove 'u_'
      let newKey = key.replace(/^u_/, '');

      // Step 2: Remove digits
      newKey = newKey.replace(/\d+/g, '');

      // Step 3: Handle '/' for capitalization
      if (newKey.includes('/')) {
        newKey = newKey
          .split('/')
          .map((part, index) => {
            if (index === 0) {
              return part.replace(/_/g, ' ').toUpperCase();
            }
            return part
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase());
          })
          .join('/');
      } else {
        newKey = newKey
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }

      // Step 4: Remove the word "Required"
      newKey = newKey.replace(/\bRequired\b/i, '').trim();

      // Determine userFill
      const userFill = !!labelsWithUserFillTrue.includes(newKey);

      // Add the transformed key and original value to the new object
      transformedData.push({
        [newKey]: finalUniqueData[key],
        userFill,
      });
    }
  }

  // Include keys from labelsWithUserFillTrue that are not in finalUniqueData
  labelsWithUserFillTrue.forEach((item) => {
    const transformedKey = item;
    if (!transformedData.some((d) => Object.keys(d)[0] === transformedKey)) {
      transformedData.push({
        [transformedKey]: '',
        userFill: true,
      });
    }
  });

  return transformedData;
};

interface FinalObj {
  script: any;
  email?: string;
  password?: string;
  data?: any;
}

export const processScript1 = (finalObj: FinalObj) => {
  // Escape special characters in labels for use in regular expressions
  const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Join the script array into a single string
  let processedScript = finalObj.script.join('\n');

  // Replace the email and password in the script
  processedScript = processedScript
    .replace(
      /getByLabel\('Username'\)\.fill\(.+?\)/i,
      `getByLabel('Username').fill('${finalObj.email}')`,
    )
    .replace(
      /getByLabel\('Password'\)\.fill\(.+?\)/i,
      `getByLabel('Password').fill('${finalObj.password}')`,
    );

  // Iterate over the data array
  for (const dataObj of finalObj.data) {
    for (const [label, value] of Object.entries(dataObj)) {
      console.log('dataObj', dataObj);
      // Skip the 'userFill' key as it's not used for replacements
      if (label === 'userFill') continue;
      const escapedLabel = escapeRegExp(label);
      // Handle `fill` actions
      const fillRegex = new RegExp(
        `getByLabel\\('${escapedLabel}'\\)\\.fill\\(.+?\\)`,
        'i',
      );
      processedScript = processedScript.replace(
        fillRegex,
        `getByLabel('${label}').fill('${value}')`,
      );

      // Handle `selectOption` actions
      const selectOptionRegex = new RegExp(
        `getByLabel\\('${escapedLabel}'\\)\\.selectOption\\(.+?\\)`,
        'i',
      );
      processedScript = processedScript.replace(
        selectOptionRegex,
        `getByLabel('${label}').selectOption('${value}')`,
      );

      // Handle `click` actions for radio buttons when the label contains 'Radio'
      if (label.includes('Radio')) {
        const radioButtonRegex = new RegExp(
          `getByText\\(''\\)\\.click\\(\\)`,
          'i',
        );
        processedScript = processedScript.replace(
          radioButtonRegex,
          `getByText('${value}').click()`,
        );
      }

      // Handle `click` actions for checkboxes where value is 'on'
      if (value === 'on') {
        const checkboxRegex = new RegExp(
          `getByLabel\\('${escapedLabel}'\\)\\.click\\(\\)`,
          'i',
        );
        processedScript = processedScript.replace(
          checkboxRegex,
          `getByText('${label}').click()`,
        );
      }
    }
  }

  return processedScript;
};

export function extractFunctionName(formula: any) {
  // Extract the function name from the formula (e.g., 'SUM' from '=SUM(A1:A0)')
  const match = formula.match(/^=(\w+)\(/);
  return match ? match[1] : null;
}

export function containsFunctionFormula(formula: any, functionName: any) {
  // Check if the formula contains the specified function
  const regex = new RegExp(`=${functionName}\\(`, 'i');
  return regex.test(formula);
}

export function checkFunctionInArray(arr: any, formulaToCheck: any) {
  // Extract the function name from formulaToCheck
  const functionName = extractFunctionName(formulaToCheck);

  if (!functionName) {
    // If no function name is found, return false
    return false;
  }

  // Check if the array contains any formula with the specified function and if formulaToCheck contains it
  return (
    arr?.some((formula: any) =>
      containsFunctionFormula(formula, functionName),
    ) && containsFunctionFormula(formulaToCheck, functionName)
  );
}
export function concatenateAfterFirstWithSpace(inputString: any) {
  const colonIndex = inputString.indexOf(':');

  // Check if colon exists in the string
  if (colonIndex !== -1) {
    // Extract the part after the colon and trim any extra spaces
    const result = inputString.substring(colonIndex + 1).trim();
    return result;
  }
  // Return the original string if no colon is found
  return inputString;
}

export const convertToSnakeCase = (input: string): string => {
  // Match any punctuation marks at the end of the string (e.g., "?" or ".")
  const punctuation = /[.?]$/;

  // Safely check for a match and get the punctuation (if any)
  const endingPunctuation = input?.match(punctuation)?.[0] ?? '';

  // Check if there's a space before the punctuation (if it's a question mark)
  const spaceBeforePunctuation =
    endingPunctuation === '?' && input.endsWith(' ?');

  // Remove punctuation from the input temporarily
  const cleanInput = input?.replace(punctuation, '');

  // Convert to snake case
  let result = cleanInput
    ?.replace(/([a-z])([A-Z0-9])/g, '$1_$2') // Add underscores between lowercase letters and uppercase/numbers
    ?.replace(/([A-Z])([A-Z][a-z])/g, '$1_$2') // Handle transitions within abbreviations like "P2P"
    ?.replace(/\s+/g, '_') // Replace spaces with underscores
    ?.replace(/_+/g, '_') // Remove multiple consecutive underscores
    ?.replace(/^_+|_+$/g, ''); // Remove leading and trailing underscores

  result = result?.replace(/NGF_Ws/g, 'NGFWs'); // Ensure a direct replacement for "NGF_Ws"

  // Add punctuation back, with a space if necessary
  return endingPunctuation
    ? result + (spaceBeforePunctuation ? ' ' : '') + endingPunctuation
    : result;
};

export const radioValidator = (data: any, value: any, form: FormInstance) => {
  data?.forEach((element: any) => {
    const userfill = element?.user_fill;
    const finalName =
      `u_${ 
      convertToSnakeCase(element) 
      }_radio${ 
      userfill ? '_userfill' : ''}`;
    if (element !== value.name) {
      form.setFieldsValue({
        [finalName]: false,
      });
    } else {
      form.setFieldsValue({
        [finalName]: true,
      });
    }
  });
};

export const filterRadioData = (data: any) => {
  const filteredData: any = {};

  for (const key in data) {
    // Check if the key contains '_radio'
    if (key.includes('_radio')) {
      // Include only keys with a truthy value
      if (data[key]) {
        filteredData[key] = data[key];
      }
    } else {
      // Keep all other fields intact
      filteredData[key] = data[key];
    }
  }

  return filteredData;
};

interface PayloadItem {
  partner_id: string;
  partner_program_id: string;
  [key: string]: any;
}

interface Partner {
  id: string;
  [key: string]: any;
}

interface PartnerProgram {
  id: string;
  [key: string]: any;
}
export async function fetchAndDecryptRecords(
  encryptedRecords: Array<{
    id: string;
    opportunity_id: string;
    opportunity_name: string;
    partner_id: string;
    partner_program_id: string;
    unique_form_data: string | null;
    common_form_data: string | null;
    percentage: string;
  }>,
  SECRET_KEY: string,
) {
  try {
    // Decrypt each record
    const decryptedRecords = await Promise.all(
      encryptedRecords?.map(async (record) => {
        try {
          const updatedRecord = {...record};
          // Decrypt `unique_form_data` if it exists
          if (record && record?.unique_form_data) {
            const uniqueDataRaw = record?.unique_form_data?.replace(
              /^"|"$/g,
              '',
            ); // Remove leading and trailing quotes
            if (uniqueDataRaw.includes(':')) {
              const [uniqueIv, uniqueEncryptedData] = uniqueDataRaw?.split(':');
              const uniqueDecryptedString = await decrypt(
                uniqueEncryptedData,
                SECRET_KEY,
                uniqueIv,
              );
              updatedRecord.unique_form_data = JSON.parse(
                uniqueDecryptedString,
              );
            } else {
              console.warn(
                `Invalid format for unique_form_data in record with id: ${record?.id}`,
              );
            }
          }

          // Decrypt `common_form_data` if it exists
          if (record && record?.common_form_data) {
            const commonDataRaw = record?.common_form_data?.replace(
              /^"|"$/g,
              '',
            ); // Remove leading and trailing quotes
            if (commonDataRaw.includes(':')) {
              const [commonIv, commonEncryptedData] = commonDataRaw.split(':');
              const commonDecryptedString = await decrypt(
                commonEncryptedData,
                SECRET_KEY,
                commonIv,
              );
              updatedRecord.common_form_data = JSON.parse(
                commonDecryptedString,
              );
            } else {
              console.warn(
                `Invalid format for common_form_data in record with id: ${record.id}`,
              );
            }
          }

          return updatedRecord; // Return the updated record with decrypted data
        } catch (error) {
          console.error(
            `Failed to decrypt data for record with id: ${record.id}`,
            error,
          );

          // Return the record as-is in case of decryption failure
          return record;
        }
      }),
    );
    return decryptedRecords;
  } catch (error) {
    console.error('Failed to decrypt records:', error);
    throw error; // Re-throw the error to handle it further up the chain
  }
}

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Generic date utility function for handling UTC and user timezone conversions
 * @param {string | Date | null} date - The date to handle. Pass `null` to get the current date in UTC.
 * @param {boolean} toUserTimezone - Set `true` to convert UTC date to user's local timezone.
 * @param {string} format - Optional date format for display. Defaults to 'MM/DD/YYYY | HH:mm' if not provided.
 * @returns {string} Formatted date in UTC or user's timezone.
 */
export const handleDate = (
  date: string | Date | null = null,
  toUserTimezone: boolean = false,
  format: string = 'MM/DD/YYYY | HH:mm',
): string => {
  const userTimeZone = dayjs.tz.guess();

  if (toUserTimezone) {
    // Convert stored UTC date to user's timezone with specified format
    return dayjs.utc(date).tz(userTimeZone).format(format);
  }
  // Save the current date or provided date in UTC with specified format
  return dayjs(date || new Date())
    .utc()
    .format();
};

export function convertToNumber(variable: any) {
  const num = variable;
  return isNaN(num) ? 0 : num;
}

export const base64ToArrayBuffer1 = function (base64: any) {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

// Helper function to append two ArrayBuffers
export const appendBuffer = function (buffer1: any, buffer2: any) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0); // Set buffer1 content
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength); // Append buffer2 content
  return tmp.buffer; // Return combined ArrayBuffer
};

// Helper function to convert ArrayBuffer to Base64
export const arrayBufferToBase641 = function (arrayBuffer: any) {
  return btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''),
  );
};


export const formatMailString = (input: string) => 
   input
    .split('_') // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' ') // Join the words with spaces
;
export const convertToBoolean = function (value: any) {
  if (!value) {
    return null;
  }
  if (value && typeof value === 'boolean') {
    return value; // If it's already a boolean, return as is
  }
  if (value && typeof value === 'string') {
    // Convert string "true" (case insensitive) to boolean true
    if (value && value.trim().toLowerCase() === 'true') {
      return true;
    } 
      return false;
    
  }
  return false; // Default case if it's neither boolean nor string
};

export const transformAddressData = (addressData: any) => {
  const addresses: any[] = [];

  // Check if shipping address is filled (only check Address Line)
  const isShippingFilled = Boolean(addressData.shiping_address_line?.trim());

  // Check if billing address is filled (only check Address Line)
  const isBillingFilled = Boolean(addressData.billing_address_line?.trim());

  if (isShippingFilled && addressData.is_same_shipping_address) {
    // If shipping is filled and same as billing, return one record with "Both"
    addresses.push({
      shiping_address_line: addressData.shiping_address_line,
      shiping_city: addressData.shiping_city,
      shiping_state: addressData.shiping_state,
      shiping_pin_code: addressData.shiping_pin_code,
      shiping_country: addressData.shiping_country,
      primary_shipping: addressData.primary_shipping,
      primary_billing: addressData.primary_billing,
      address_type: 'Both',
    });
  } else {
    // If shipping is filled, add shipping address
    if (isShippingFilled) {
      addresses.push({
        shiping_address_line: addressData.shiping_address_line,
        shiping_city: addressData.shiping_city,
        shiping_state: addressData.shiping_state,
        shiping_pin_code: addressData.shiping_pin_code,
        shiping_country: addressData.shiping_country,
        primary_shipping: addressData.primary_shipping,
        address_type: 'Shipping',
      });
    }

    // If billing is filled, add billing address
    if (isBillingFilled) {
      addresses.push({
        shiping_address_line: addressData.billing_address_line,
        shiping_city: addressData.billing_city,
        shiping_state: addressData.billing_state,
        shiping_pin_code: addressData.billing_pin_code,
        shiping_country: addressData.billing_country,
        primary_billing: addressData.primary_billing,
        address_type: 'Billing',
      });
    }
  }

  return addresses;
};

export const transformExistAddressData = (
  addressData: any,
  recordData: any,
) => {
  const isBilling = recordData?.address_type === 'Billing';

  return [
    {
      shiping_address_line: isBilling
        ? addressData.billing_address_line
        : addressData.shiping_address_line,
      shiping_city: isBilling
        ? addressData.billing_city
        : addressData.shiping_city,
      shiping_state: isBilling
        ? addressData.billing_state
        : addressData.shiping_state,
      shiping_pin_code: isBilling
        ? addressData.billing_pin_code
        : addressData.shiping_pin_code,
      shiping_country: isBilling
        ? addressData.billing_country
        : addressData.shiping_country,
      primary_billing: addressData.primary_billing,
      primary_shipping: addressData.primary_shipping,
      address_type: recordData?.address_type,
    },
  ];
};
