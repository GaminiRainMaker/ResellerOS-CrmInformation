/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CONTRACT_PRODUCT_API} from '../../services/contractProduct';

export const insertContractProduct = createAsyncThunk(
  'contractProduct/insertContractProduct',
  async (data: any, thunkApi) => {
    try {
      const res = await CONTRACT_PRODUCT_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllContractProduct = createAsyncThunk(
  'contractProduct/getAllContractProduct',
  async (data, thunkApi) => {
    try {
      const res = await CONTRACT_PRODUCT_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateContractProductById = createAsyncThunk(
  'contractProduct/updateContractProductById',
  async (data: any, thunkApi) => {
    try {
      const res = await CONTRACT_PRODUCT_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
