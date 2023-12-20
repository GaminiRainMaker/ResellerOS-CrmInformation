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

export const getContractProductByProductCode = createAsyncThunk(
  'contractProduct/getContractProductByProductCode',
  async (product_code: string, thunkApi) => {
    try {
      const res =
        await CONTRACT_PRODUCT_API.getContractProductByProductCode(
          product_code,
        );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
