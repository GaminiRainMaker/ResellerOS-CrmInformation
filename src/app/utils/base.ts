/* eslint-disable no-dupe-else-if */
/* eslint-disable no-lonely-if */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-await-in-loop */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import moment from 'moment';
import {ServerStackIcon} from '@heroicons/react/24/outline';
import {getContractProductByProductCode} from '../../../redux/actions/contractProduct';
import {insertProfitability} from '../../../redux/actions/profitability';
import {quoteFileVerification} from '../../../redux/actions/quoteFile';
import {
  DeleteQuoteLineItemById,
  updateQuoteLineItemById,
} from '../../../redux/actions/quotelineitem';
import {getRebatesByProductCode} from '../../../redux/actions/rebate';
import {insertRebateQuoteLineItem} from '../../../redux/actions/rebateQuoteLineitem';
import {insertValidation} from '../../../redux/actions/validation';

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
  const cleanedD = value?.replace(/\$|,/g, '');
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
export const formatDateWithTime = (
  date: Date | string,
  format = 'MM/DD/YYYY  HH:MM',
) => moment(date).format(format) ?? '--';

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
  } else if (newItem == 'Time') {
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
  } else if (newItem == 'Date') {
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
  } else if (newItem == 'Contact') {
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
  } else if (newItem == 'Currency') {
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
  } else if (newItem == 'Radio Button' || newItem == 'Toggle') {
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
  } else if (newItem == 'Text Content') {
    newObjAddedon = {
      name: newItem,
      sectionTitle: 'Section Title',
      Alignemnt: 'left',
      FontSize: 'Heading 2',
    };
  } else if (newItem == 'Checkbox') {
    newObjAddedon = {
      name: newItem,
      placeholdertext: 'placeholder text',
      labelOptions: [],
      columnRequired: 1,
      required: false,
      requiredLabel: true,
      filedType: 'multiple',
    };
  } else if (newItem == 'Text' || newItem == 'Email') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'text',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: 'hint Vlaue',
    };
  } else if (newItem == 'Attachment') {
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
    if (edited) {
      quoteLineItemData?.forEach((item: any) => {
        dispatch(updateQuoteLineItemById(item));
      });
      dispatch(DeleteQuoteLineItemById({Ids: missingId}));
    }

    for (const item of quoteLineItemData) {
      const obj1: any = {
        quote_id: item.quote_id ?? getQuoteId,
        product_id: item.product_id,
        product_code: item.product_code,
        line_amount: item.line_amount,
        list_price: item.list_price,
        description: item.description,
        quantity: item.quantity,
        // adjusted_price: item.adjusted_price,
        line_number: item.line_number,
        organization: userInformation.organization,
        quote_config_id: item.quote_config_id,
        quote_file_id: item.quote_file_id,
        file_name: fileData?.title || fileData?.file_name,
        nanonets_id: item.nanonets_id,
      };

      const RebatesByProductCodData = await dispatch(
        getRebatesByProductCode(obj1.product_code),
      );
      if (RebatesByProductCodData?.payload?.id) {
        rebateDataArray.push({
          ...obj1,
          quote_line_item_id: item?.id,
          rebate_id: RebatesByProductCodData.payload.id,
          percentage_payout: RebatesByProductCodData.payload.percentage_payout,
        });
      }

      const contractProductByProductCode = await dispatch(
        getContractProductByProductCode(obj1.product_code),
      );
      if (contractProductByProductCode?.payload?.id) {
        contractProductArray.push({
          ...obj1,
          quote_line_item_id: item?.id,
          contract_product_id: contractProductByProductCode.payload.id,
        });
      }
      if (item?.id) {
        profitabilityArray.push({
          ...obj1,
          quote_line_item_id: item?.id,
        });
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
      const profitabilityData = genericFun(finalLineItems, profitabilityArray);
      dispatch(insertProfitability(profitabilityData));
      dispatch(quoteFileVerification({id: fileData?.id}));
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
            itemProgram?.user_id === userInformation?.id ||
            itemProgram?.AssignPartnerProgram?.is_approved
          ) {
            superAdminAllApprovedIds?.push(
              itemProgram?.AssignPartnerProgram?.partner_program_id,
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
          }
        }
      });
    }
  });

  let allNotRequestedIds: any = [];
  allNotRequestedIds = aprovedIds?.concat(allRequestedIds);

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
      if (newArrForPrograms?.length > 0 || superAdminSide) {
        const newObj: any = {...item};
        delete newObj.PartnerPrograms;
        if (newArrForPrograms?.length > 0) {
          newObj.PartnerPrograms = newArrForPrograms;
        }
        FilterArrayDataa?.push(newObj);
      }
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

  return FilterArrayDataa;
};