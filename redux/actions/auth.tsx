/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_API} from '../../services/auth';

export const signUpAuth = createAsyncThunk(
  'auth',
  async (data: any, thunkApi) => {
    try {
      const res = await AUTH_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const getSalesForceFileData = createAsyncThunk(
  'auth/getSalesForceDataa',
  async (data: any, thunkApi) => {
    try {
      const res = await AUTH_API.postSalesGet(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getSalesForceDataaForEditAsItIs = createAsyncThunk(
  'auth/getSalesForceDataaForEditAsItIs',
  async (data: any, thunkApi) => {
    try {
      const res = await AUTH_API.getAsItIs(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addSalesForceDataa = createAsyncThunk(
  'auth/addSalesForceDataa',
  async (data: any, thunkApi) => {
    try {
      const res = await AUTH_API.addUpdateSales(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.verify(data);
      if (res?.status) {
        return res.data;
      }
      return res?.message?.response?.data?.message;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const sendNewUserEmail = createAsyncThunk(
  'auth/sendNewUserEmail',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.SendEmail(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const sendPartnerRequestEmail = createAsyncThunk(
  'auth/sendPartnerRequestEmail',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.sendPartnerRequestEmail(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const sendForgotPasswordEmail = createAsyncThunk(
  'auth/sendForgotPasswordEmail',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.SendForgotPasswordEmail(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const contactSales = createAsyncThunk(
  'auth/contactSales',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.ContactSales(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const runSalesForceBot = createAsyncThunk(
  'auth/runSalesForceBot',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.runSalesForceBot(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getSalesForceFields = createAsyncThunk(
  'auth/getSalesForceFields',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.getFields(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const addSalesForceDataaForAccount = createAsyncThunk(
  'auth/addSalesForceDataaForAccount',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.addForAccount(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getExcelData = createAsyncThunk(
  'auth/getExcelData',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.getExcelData(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getPDFFileData = createAsyncThunk(
  'auth/fetchDataWithIntellengenceForPDFFile',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.getPDFFileData(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getPDFFileDataByAzureForSales = createAsyncThunk(
  'auth/fetchDataWithIntellengenceForPDFFileForSalesForceExport',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.getPDFFileDataForSales(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const fetchAndParseExcel = createAsyncThunk(
  'auth/fetchAndParseExcel',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.fetchAndParseExcel(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
