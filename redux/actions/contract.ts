/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CONTRACT_API} from '../../services/contract';

export const insertContract = createAsyncThunk(
  'contract/insertContract',
  async (data: any, thunkApi) => {
    try {
      const res = await CONTRACT_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllContract = createAsyncThunk(
  'contract/getAllContract',
  async (data, thunkApi) => {
    try {
      const res = await CONTRACT_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateContractById = createAsyncThunk(
  'contract/updateContractById',
  async (data: any, thunkApi) => {
    try {
      const res = await CONTRACT_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
