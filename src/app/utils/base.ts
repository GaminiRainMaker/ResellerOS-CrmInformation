/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react-hooks/rules-of-hooks */

import {InputNumberProps} from 'antd';
import axios from 'axios';
import moment from 'moment';
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
import {setQuoteFileUnverifiedById} from '../../../redux/slices/quoteFile';

export const getResultedValue = () => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('userInfo');
    if (storedData) {
      try {
        const permissions = JSON?.parse(storedData);
        const {QuoteAI, DealReg} = permissions;
        if (QuoteAI && DealReg) {
          return false;
        } else if (QuoteAI) {
          return false;
        } else if (!QuoteAI && DealReg) {
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
      label: 'Label',
      type: 'multiple',
      user_fill: false,
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
      user_fill: false,
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
      user_fill: false,
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
      user_fill: false,
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
      type: newItem,
      required: false,
      user_fill: false,
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
      user_fill: false,
      type: 'Checkbox',
      columnRequired: 1,
      required: false,
      requiredLabel: true,
      filedType: 'Checkbox',
      label: 'Checkbox',
    };
  } else if (newItem === 'Text' || newItem === 'Email') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'text',
      required: false,
      user_fill: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
    };
  } else if (newItem === 'Attachment') {
    newObjAddedon = {
      pdfUrl: null,
      required: false,
      user_fill: false,
      type: 'Attachment',
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

    // await dispatch(getContractInBulkByProductCode(allProductCodes))?.then(
    //   (payload: any) => {
    //     payload?.payload?.map((items: any) => {
    //       allContractWithProductCodeData?.push(items);
    //     });
    //   },
    // );

    for (const item of quoteLineItemData) {
      const obj1: any = {
        quote_id: item.quote_id ?? getQuoteId,
        product_id: item.product_id,
        product_code: item.product_code,
        // line_amount: useRemoveDollarAndCommahook(item?.line_amount),
        list_price: useRemoveDollarAndCommahook(
          item?.MSRP ? item?.MSRP : item?.list_price,
        ),
        description: item.description,
        quantity: useRemoveDollarAndCommahook(item?.quantity),
        adjusted_price: useRemoveDollarAndCommahook(
          item?.cost ? item?.cost : item?.adjusted_price,
        ),
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
        (itemReb: any) => item.product_code === itemReb?.PID,
      );
      if (findRebateIndex !== -1) {
        let newObj = {
          ...obj1,
          quoteline_item_id: item?.id,
          rebate_id: allReabatesWithProductCodeData?.[findRebateIndex]?.id,
          percentage_payout:
            allReabatesWithProductCodeData?.[findRebateIndex]
              ?.percentage_payout,
        };
        rebateDataArray.push(newObj);
      }
      let findContractIndex = allContractWithProductCodeData?.findIndex(
        (itemReb: any) => item.product_code === itemReb.contract_product_name,
      );
      if (findContractIndex !== -1) {
        let newObj = {
          ...obj1,
          quoteline_item_id: item?.id,
          contract_product_id:
            allContractWithProductCodeData?.[findContractIndex]?.payload.id,
        };
        contractProductArray.push(newObj);
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
      let count = 0;

      await dispatch(getAllProfitabilityCount(Number(getQuoteID))).then(
        (payload: any) => {
          count = payload?.payload;
        },
      );

      if (rebateDataArray.length > 0) {
        const newRebateArr: any = [];
        rebateDataArray.forEach((item: any, index: number) => {
          newRebateArr.push({...item, serial_number: index + count + 1});
        });
        if (newRebateArr)
          await dispatch(insertRebateQuoteLineItem(newRebateArr));
      }
      if (contractProductArray.length > 0) {
        const newContractProductArr: any = [];
        contractProductArray.forEach((item: any, index: number) => {
          newContractProductArr.push({
            ...item,
            serial_number: index + count + 1,
          });
        });
        if (newContractProductArr)
          await dispatch(insertValidation(newContractProductArr));
      }
      if (profitabilityArray)
        await dispatch(insertProfitability(profitabilityArray));

      await dispatch(quoteFileVerification({id: fileData?.id})).then(
        (verificationResponse: any) => {
          if (verificationResponse?.payload) {
            dispatch(getQuoteFileByQuoteId(Number(getQuoteID))).then(
              (quoteFileResponse: any) => {
                if (quoteFileResponse?.payload) {
                  dispatch(
                    setQuoteFileUnverifiedById(quoteFileResponse?.payload),
                  );
                }
              },
            );
            dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
            dispatch(getQuoteFileCount(Number(getQuoteID)));
          }
        },
      );
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
  let bundleArrOfObject: any = [];
  let lineItemsArr: any = [];

  // ====================== For LineItems ==================================

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
          let newObj = {
            Id: items?.id,
            line_number: items?.line_number ? items?.line_number : index + 1,
            quantity: items?.quantity,
            product_code: items?.product_code,
            description: items?.description,
            line_amount: items?.line_amount,
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

const filterEmptyValues = (obj: any) => {
  return (
    obj &&
    Object?.fromEntries(
      Object?.entries(obj)?.filter(([_, v]) => v !== '' && v !== undefined),
    )
  );
};

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

export const transformDataKeys = (data: any) => {
  const transformedData: any = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Step 1: Remove 'u_'
      let newKey = key.replace(/^u_/, '');

      // Step 2: Remove digits
      newKey = newKey.replace(/\d+/g, '');

      // Step 3: Replace underscores with spaces and capitalize first letter of each word
      newKey = newKey
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Step 4: Remove the word "Required"
      newKey = newKey.replace(/\bRequired\b/, '').trim();

      // Add the transformed key and original value to the new object
      transformedData[newKey] = data[key];
    }
  }

  return transformedData;
};


export const processScript = (script: any, finalObj: any) => {
  // If the script is an array, join it into a single string
  if (Array.isArray(script)) {
    script = script.join(' ');
  }

  // Escape special characters in labels for use in regular expressions
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Replace the email and password in the script
  let processedScript = script
    .replace(
      /getByLabel\('Username'\)\.fill\(.+?\)/i,
      `getByLabel('Username').fill('${finalObj.email}')`,
    )
    .replace(
      /getByLabel\('Password'\)\.fill\(.+?\)/i,
      `getByLabel('Password').fill('${finalObj.password}')`,
    );

  // Replace other form fields in the script based on the label and finalObj.data
  for (const [label, value] of Object.entries(finalObj.data)) {
    const escapedLabel = escapeRegExp(label);
    const regex = new RegExp(
      `getByLabel\\('${escapedLabel}'\\)\\.fill\\(.+?\\)`,
      'i',
    );
    processedScript = processedScript.replace(
      regex,
      `getByLabel('${label}').fill('${value}')`,
    );
  }

  return processedScript;
};
