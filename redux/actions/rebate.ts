/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {REBATE_API} from '../../services/rebate';

export const getRebateById = createAsyncThunk(
  'rebate/getRebateById',
  async (id: number, thunkApi) => {
    try {
      const res = await REBATE_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const insertRebate = createAsyncThunk(
  'rebate/insertRebate',
  async (data: any, thunkApi) => {
    try {
      const res = await REBATE_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getRebatesByProductCode = createAsyncThunk(
  'rebate/getRebatesByProductCode',
  async (product_code: string, thunkApi) => {
    try {
      const res = await REBATE_API.getRebatesByProductCode(product_code);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getRebatesInBulkByProductCode = createAsyncThunk(
  'rebate/getRebatesInBulkByProductCode',
  async (data: string, thunkApi) => {
    try {
      const res = await REBATE_API.getRebatesInBulk(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
