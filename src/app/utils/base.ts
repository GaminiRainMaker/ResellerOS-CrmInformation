/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import {
  AmazonPartnerProgramOptions,
  CiscoPartnerProgramOptions,
  DellPartnerProgramOptions,
} from './CONSTANTS';

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

export const calculateDaysDifference = (startDate: string, endDate: string) => {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  return endMoment.diff(startMoment, 'days');
};

export const getProgramOptions = (value: string) => {
  if (value === 'CISCO') {
    return CiscoPartnerProgramOptions;
  }
  if (value === 'DELL') {
    return DellPartnerProgramOptions;
  }
  if (value === 'AMAZON') {
    return AmazonPartnerProgramOptions;
  }
};

export const formbuildernewObject = (newItem: string, column: any) => {
  let newObjAddedon: any;
  const cutomizedTables = [
    {
      filed: 'Filed Name',
      typeOfFiled: 'text',
    },
    {
      filed: 'Quote',
      typeOfFiled: 'number',
    },
  ];

  if (newItem === 'Table') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      required: false,
      requiredLabel: true,
      noOfRows: 2,
      noOfColumn: 2,
      cutomizedTable: cutomizedTables,
      tableKey: column?.length,
      ColumnsData: [
        {title: 'Column 1', dataIndex: 'address', key: '1'},
        {title: 'Column 2', dataIndex: 'address', key: '2'},
      ],
      RowsData: [
        {'Filed Name1': 'text', 'Filed Name2': 'text'},
        {'Filed Name1': 'text', 'Filed Name2': 'text'},
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
      hintTextValue :"hint Vlaue",
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
      hintTextValue :"hint Vlaue",
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
      hintTextValue :"hint Vlaue",
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
      hintTextValue :"hint Vlaue",
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
      hintTextValue :"hint Vlaue",
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
      hintTextValue :"hint Vlaue",
    };
  } else if (newItem == 'T text Content') {
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
  } else if (newItem == 'T Text' || newItem == 'Email') {
    newObjAddedon = {
      name: newItem,
      label: 'Label',
      type: 'text',
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue :"hint Vlaue",
    };
  }
  return newObjAddedon;
};
