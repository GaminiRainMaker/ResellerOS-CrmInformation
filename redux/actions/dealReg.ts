/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {DEALREG_API} from '../../services/dealReg';

export const insertDealReg = createAsyncThunk(
  'dealReg/insertDealReg',
  async (data: any, thunkApi) => {
    try {
      const res = await DEALREG_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllDealReg = createAsyncThunk(
  'dealReg/getAllDealReg',
  async (data, thunkApi) => {
    try {
      const res = await DEALREG_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getDealRegById = createAsyncThunk(
  'dealReg/getDealRegById',
  async (id: any, thunkApi) => {
    try {
      const res = await DEALREG_API.getDealRegById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateDealRegById = createAsyncThunk(
  'dealReg/updateDealRegById',
  async (data: any, thunkApi) => {
    try {
      const res = await DEALREG_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getDealRegByOpportunityId = createAsyncThunk(
  'dealReg/getDealRegByOpportunityId',
  async (id: number, thunkApi) => {
    try {
      const res = await DEALREG_API.getDealRegByOpportunityId(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getDealRegByPartnerProgramId = createAsyncThunk(
  'dealReg/getDealRegByPartnerProgramId',
  async (id: number, thunkApi) => {
    try {
      const res = await DEALREG_API.getDealRegByPartnerProgramId(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const queryDealReg = createAsyncThunk(
  'dealReg/queryDealReg',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        customer: query?.customer,
      };
      const res = await DEALREG_API.query(obj);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateDealRegStatus = createAsyncThunk(
  'dealReg/updateDealRegStatus',
  async (data: any, thunkApi) => {
    try {
      const res = await DEALREG_API.updateDealRegStatus(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const dealRegFormScript = createAsyncThunk(
  'dealReg/dealRegFormScript',
  async (data: any, thunkApi) => {
    try {
      const res = await DEALREG_API.dealRegFormScript(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
