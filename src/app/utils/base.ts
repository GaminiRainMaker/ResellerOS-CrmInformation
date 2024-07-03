/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react-hooks/rules-of-hooks */

import {InputNumberProps} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {getContractInBulkByProductCode} from '../../../redux/actions/contractProduct';
import {
  getAllProfitabilityCount,
  getProfitabilityByQuoteId,
  insertProfitability,
} from '../../../redux/actions/profitability';
import {
  getQuoteFileByQuoteId,
  getQuoteFileCount,
  quoteFileVerification,
} from '../../../redux/actions/quoteFile';
import {
  DeleteQuoteLineItemById,
  updateQuoteLineItemById,
} from '../../../redux/actions/quotelineitem';
import {getRebatesInBulkByProductCode} from '../../../redux/actions/rebate';
import {insertRebateQuoteLineItem} from '../../../redux/actions/rebateQuoteLineitem';
import {insertValidation} from '../../../redux/actions/validation';
import {
  setQuoteFileDataCount,
  setQuoteFileUnverifiedById,
} from '../../../redux/slices/quoteFile';

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

export const useRemoveDollarAndCommahook = (value: any) => {
  const cleanedD = value && value?.replace(/\$|,/g, '');
  const numberD = parseFloat(cleanedD);
  return numberD;
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
      label: 'Label',
      required: false,
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
      label: 'Label',
      type: 'multiple',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
      options: [],
    };
  } else if (newItem === 'Line Break') {
    newObjAddedon = {
      name: newItem,
    };
  } else if (newItem === 'Time') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'Time',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
      timeformat: 'HH:mm',
      use12hours: true,
    };
  } else if (newItem === 'Date') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'Date',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
      dateformat: 'mm/dd/yyyy',
      weekStartOn: 'sunday',
      StartDate: '',
      enddate: '',
    };
  } else if (newItem === 'Contact') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'number',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
      defaultcountry: 'US',
      dataformat: '333-333-3333',
    };
  } else if (newItem === 'Currency') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'text',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'Hint Value',
      currency: 'USB',
      deciamlHide: false,
    };
  } else if (newItem === 'Radio Button' || newItem === 'Toggle') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'text',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'Hint Value',
      labelOptions: [],
    };
  } else if (newItem === 'Text Content') {
    newObjAddedon = {
      name: newItem,
      sectionTitle: 'Section Title',
      Alignemnt: 'left',
      FontSize: 'Heading 2',
    };
  } else if (newItem === 'Checkbox') {
    newObjAddedon = {
      name: newItem,
      placeholdertext: 'placeholder text',
      labelOptions: [],
      columnRequired: 1,
      required: false,
      requiredLabel: true,
      filedType: 'multiple',
    };
  } else if (newItem === 'Text' || newItem === 'Email') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'text',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
    };
  } else if (newItem === 'Attachment') {
    newObjAddedon = {
      pdfUrl: null,
      required: false,
      name: newItem,
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

export const updateTables = async (
  getQuoteID: any,
  fileData: any,
  quoteLineItemData: any,
  userInformation: any,
  dispatch: any,
  missingId?: any,
  edited?: boolean,
  getQuoteId?: number,
): Promise<any> => {
  try {
    const rebateDataArray: any[] = [];
    const contractProductArray: any[] = [];
    const profitabilityArray: any[] = [];
    const finalLineItems: any[] = [];
    const allProductCodes: any = [];
    const allReabatesWithProductCodeData: any = [];
    const allContractWithProductCodeData: any = [];
    if (edited) {
      quoteLineItemData?.forEach((item: any) => {
        dispatch(updateQuoteLineItemById(item));
      });
      dispatch(DeleteQuoteLineItemById({Ids: missingId}));
    }
    quoteLineItemData?.map((productItems: any) => {
      allProductCodes?.push(productItems.product_code);
    });

    // allProductCodes
    await dispatch(getRebatesInBulkByProductCode(allProductCodes))?.then(
      (payload: any) => {
        payload?.payload?.map((items: any) => {
          allReabatesWithProductCodeData?.push(items);
        });
      },
    );

    await dispatch(getContractInBulkByProductCode(allProductCodes))?.then(
      (payload: any) => {
        payload?.payload?.map((items: any) => {
          allContractWithProductCodeData?.push(items);
        });
      },
    );
    for (const item of quoteLineItemData) {
      const obj1: any = {
        quote_id: item.quote_id ?? getQuoteId,
        product_id: item.product_id,
        product_code: item.product_code,
        // line_amount: useRemoveDollarAndCommahook(item?.line_amount),
        list_price: useRemoveDollarAndCommahook(item?.list_price),
        description: item.description,
        quantity: useRemoveDollarAndCommahook(item?.quantity),
        adjusted_price: useRemoveDollarAndCommahook(item?.adjusted_price),
        line_number: item.line_number,
        organization: userInformation.organization,
        quote_config_id: item.quote_config_id,
        quote_file_id: item.quote_file_id,
        file_name: fileData?.title || fileData?.file_name,
        nanonets_id: item.nanonets_id,
      };

      // getRebatesInBulkByProductCode
      // getContractInBulkByProductCode
      let findRebateIndex = allReabatesWithProductCodeData?.findIndex(
        (itemReb: any) => item.product_code === itemReb.product_code,
      );
      if (findRebateIndex !== -1) {
        rebateDataArray.push({
          ...obj1,
          quote_line_item_id: item?.id,
          rebate_id: allReabatesWithProductCodeData?.[findRebateIndex]?.id,
          percentage_payout:
            allReabatesWithProductCodeData?.[findRebateIndex]
              ?.percentage_payout,
        });
      }
      let findContractIndex = allContractWithProductCodeData?.findIndex(
        (itemReb: any) => item.product_code === itemReb.product_code,
      );
      if (findContractIndex !== -1) {
        contractProductArray.push({
          ...obj1,
          quote_line_item_id: item?.id,
          contract_product_id:
            allContractWithProductCodeData?.[findContractIndex]?.payload.id,
        });
      }
      let count: any = 0;
      if (item?.id) {
        profitabilityArray.push({
          ...obj1,
          quoteline_item_id: item?.id,
          serial_number: count + 1,
        });
        count = count + 1;
      }
      finalLineItems.push(obj1);
    }
    if (finalLineItems.length > 0) {
      if (rebateDataArray.length > 0) {
        const rebateData = genericFun(finalLineItems, rebateDataArray);
        dispatch(insertRebateQuoteLineItem(rebateData));
      }
      if (contractProductArray.length > 0) {
        const contractProductData = genericFun(
          finalLineItems,
          contractProductArray,
        );
        dispatch(insertValidation(contractProductData));
      }
      let count = 0;
      await dispatch(getAllProfitabilityCount(Number(getQuoteID)))?.then(
        (payload: any) => {
          count = payload?.payload;
        },
      );
      const newArrr: any = [];

      profitabilityArray?.map((items: any, index: number) => {
        newArrr?.push({...items, serial_number: index + count + 1});
      });
      dispatch(insertProfitability(newArrr));
      dispatch(quoteFileVerification({id: fileData?.id})).then((d: any) => {
        if (d?.payload) {
          dispatch(getQuoteFileByQuoteId(Number(getQuoteID))).then((d: any) => {
            if (d?.payload) {
              dispatch(setQuoteFileUnverifiedById(d?.payload));
            }
          });
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
          dispatch(getQuoteFileCount(Number(getQuoteID)));
        }
      });
    }
    return true;
  } catch (err) {
    console.error('Error:', err);
    return false;
  }
};

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
            (itemProgram?.user_id === userInformation?.id &&
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
            if (!allNotRequestedIds?.includes(itemProgramD?.id)) {
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
  let newArrValues: any = [];
  arrayValue.forEach((itemsPro: any) => {
    let checkAlreadyExist: any =
      newArrValues?.length > 0 ? [...newArrValues] : [];

    let finIndexForAlreadyPushed = checkAlreadyExist?.findIndex(
      (checkExistItem: any) =>
        checkExistItem?.product_code?.replace(/\s/g, '') ===
        itemsPro?.product_code?.replace(/\s/g, ''),
    );
    let nulllProductAdded: boolean = false;

    if (finIndexForAlreadyPushed === -1 && !nulllProductAdded) {
      newArrValues?.push({
        ...itemsPro,
        product_code: itemsPro?.product_code
          ? itemsPro?.product_code?.replace(/\s/g, '')
          : 'NEWCODE0123',
      });
    }
    if (!itemsPro?.product_code) {
      nulllProductAdded = true;
    }
  });

  let finalArrr: any = [];

  newArrValues?.map((itemss: any) => {
    let findIndexValues = finalArrr?.findIndex(
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
  let newInsertionData: any = [];
  for (let i = 0; i < lineItem?.length; i++) {
    let allLineItems = lineItem[i];
    let productCode = allLineItems?.product_code
      ? allLineItems?.product_code.replace(/\s/g, '')
      : 'NEWCODE0123';
    let finIndexOfItem = allProductCodeDataa?.findIndex(
      (itemIndex: any) =>
        itemIndex?.product_code?.replace(/\s/g, '') === productCode,
    );
    if (finIndexOfItem === -1) {
      newInsertionData?.push(allLineItems);
    }
  }
  let finalArrr: any = [];

  newInsertionData?.map((itemss: any) => {
    let findIndexValues = finalArrr?.findIndex(
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
  const binaryString = window?.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

// Ensure key is 16 or 32 bytes long
const getKey = (key: string): Uint8Array => {
  let keyBytes = new TextEncoder().encode(key);
  if (keyBytes.length < 16) {
    keyBytes = new Uint8Array([
      ...keyBytes,
      ...new Uint8Array(16 - keyBytes.length),
    ]);
  } else if (keyBytes.length > 16 && keyBytes.length < 32) {
    keyBytes = new Uint8Array([
      ...keyBytes,
      ...new Uint8Array(32 - keyBytes.length),
    ]);
  } else if (keyBytes.length > 32) {
    keyBytes = keyBytes.slice(0, 32);
  }
  return keyBytes;
};

// Encrypt function
export const encrypt = async (
  text: string,
  key: string,
): Promise<{iv: string; data: string}> => {
  const enc = new TextEncoder();
  const encoded = enc.encode(text);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    getKey(key),
    {name: 'AES-GCM'},
    false,
    ['encrypt'],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    {name: 'AES-GCM', iv},
    cryptoKey,
    encoded,
  );
  return {iv: arrayBufferToBase64(iv), data: arrayBufferToBase64(encrypted)};
};

// Decrypt function
export const decrypt = async (
  encrypted: string,
  key: string,
  iv: string,
): Promise<string> => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    getKey(key),
    {name: 'AES-GCM'},
    false,
    ['decrypt'],
  );
  const decrypted = await crypto.subtle.decrypt(
    {name: 'AES-GCM', iv: base64ToArrayBuffer(iv)},
    cryptoKey,
    base64ToArrayBuffer(encrypted),
  );
  const dec = new TextDecoder();
  return dec.decode(decrypted);
};

export const getContractStatus = (
  firstValue: any,
  secondValue: any,
  operator: string,
): string => {
  switch (operator) {
    case '==':
      return firstValue == secondValue ? 'Correct' : 'Reject';
    case '!=':
      return firstValue != secondValue ? 'Correct' : 'Reject';
    case '>':
      return firstValue > secondValue ? 'Correct' : 'Reject';
    case '<':
      return firstValue < secondValue ? 'Correct' : 'Reject';
    case '>=':
      return firstValue >= secondValue ? 'Correct' : 'Reject';
    case '<=':
      return firstValue <= secondValue ? 'Correct' : 'Reject';
    default:
      return 'Invalid operator';
  }
};

export const currencyFormatter: InputNumberProps['formatter'] = (
  f,
  {userTyping},
) => {
  // if (!f) {
  //   return '';
  // }
  // if (!userTyping) {
  //   return `${Number(f)
  //     .toFixed(2)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  // }
  return `${f}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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
  let finArrr: any = [];

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.bundleData?.length > 0
  ) {
    objectForSyncingValues?.bundleData?.map(
      (itemBun: any, indexBun: number) => {
        console.log('itemBun', itemBun);
        let innerLineArr: any = [];
        itemBun?.Profitabilities?.map((items: any, index: number) => {
          let newObj = {
            attributes: {
              type: 'QuoteLineItem',
            },
            Id: items?.id,
            line_number: items?.line_number ? items?.line_number : index + 1,
            quantity: items?.quantity,
            product_code: items?.product_code,
            description: items?.description,
            line_amount: items?.line_amount,
            list_price: items?.list_price,
            organization: items?.organization,
          };
          innerLineArr?.push(newObj);
        });
        let totalExtendedPrice: any = 0;
        innerLineArr?.forEach((items: any) => {
          totalExtendedPrice += Number(items?.list_price);
        });
        let extendedPriceFinal = totalExtendedPrice * Number(itemBun?.quantity);
        let grand_totalFinal =
          extendedPriceFinal +
          Number(objectForSyncingValues?.quote_tax) +
          Number(objectForSyncingValues?.quote_shipping);
        let finalObj = {
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
    let newArrOfOject: any = [];
    objectForSyncingValues?.QuoteLineItems?.map((items: any, index: number) => {
      let newObj = {
        attributes: {
          type: 'QuoteLineItem',
        },
        Id: items?.id,
        line_number: items?.line_number ? items?.line_number : index + 1,
        quantity: items?.quantity,
        product_code: items?.product_code,
        description: items?.description,
        line_amount: items?.line_amount,
        list_price: items?.list_price,
        organization: items?.organization,
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
  let finArrr: any = [];

  if (
    objectForSyncingValues &&
    objectForSyncingValues?.bundleData?.length > 0
  ) {
    objectForSyncingValues?.bundleData?.map(
      (itemBun: any, indexBun: number) => {
        console.log('itemBun', itemBun);
        let innerLineArr: any = [];
        itemBun?.Profitabilities?.map((items: any, index: number) => {
          let newObj = {
            attributes: {
              type: 'QuoteLineItem',
            },
            Id: items?.id,
            line_number: items?.line_number ? items?.line_number : index + 1,
            quantity: items?.quantity,
            product_code: items?.product_code,
            description: items?.description,
            line_amount: items?.line_amount,
            list_price: items?.list_price,
            organization: items?.organization,
          };
          innerLineArr?.push(newObj);
        });
        let totalExtendedPrice: any = 0;
        innerLineArr?.forEach((items: any) => {
          totalExtendedPrice += Number(items?.list_price);
        });
        let extendedPriceFinal = totalExtendedPrice * Number(itemBun?.quantity);
        let grand_totalFinal =
          extendedPriceFinal +
          Number(objectForSyncingValues?.quote_tax) +
          Number(objectForSyncingValues?.quote_shipping);

        let finalObj = {
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
    let extendedPriceFinal = totalExtendedPrice;
    let grand_totalFinal =
      extendedPriceFinal +
      Number(objectForSyncingValues?.quote_tax) +
      Number(objectForSyncingValues?.quote_shipping);
    objectForSyncingValues?.QuoteLineItems?.map((items: any, index: number) => {
      let newObj = {
        attributes: {
          type: 'QuoteLineItem',
        },
        Id: items?.id,
        line_number: items?.line_number ? items?.line_number : index + 1,
        quantity: items?.quantity,
        product_code: items?.product_code,
        description: items?.description,
        line_amount: items?.line_amount,
        list_price: items?.list_price,
        organization: items?.organization,
        extended_price: extendedPriceFinal,
        grand_total: grand_totalFinal,
      };
      finArrr?.push(newObj);
    });
  }

  return finArrr;
};
