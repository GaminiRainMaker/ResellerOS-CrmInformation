/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PROFITABILITY_API} from '../../services/profitability';

export const getProfitabilityByQuoteId = createAsyncThunk(
  'profitability/getProfitabilityByQuoteId',
  async (id: number, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getAllProfitabilityCount = createAsyncThunk(
  'profitability/getAllProfitabilityCount',
  async (id: number, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.getCountById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const insertProfitability = createAsyncThunk(
  'profitability/insertProfitability',
  async (data: any, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateProfitabilityById = createAsyncThunk(
  'profitability/updateProfitabilityById',
  async (data: any, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteProfitabilityById = createAsyncThunk(
  'profitability/deleteProfitabilityById',
  async (Ids: any, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.deleteById(Ids);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const removeBundleLineItems = createAsyncThunk(
  'profitability/removeBundleLineItems',
  async (Ids: any, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.removeBundleById(Ids);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const updateProfitabilityValueForBulk = createAsyncThunk(
  'profitability/updateProfitabilityValueForBulk',
  async (data: any, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.updateProfitabilityValueForBulk(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateProfitabilitySelectValues = createAsyncThunk(
  'profitability/updateProfitabilitySelectValues',
  async (data: any, thunkApi) => {
    try {
      const res = await PROFITABILITY_API.updateProfitabilitySelectValues(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
