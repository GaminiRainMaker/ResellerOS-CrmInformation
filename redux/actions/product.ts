/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PRODUCT_API} from '../../services/product';

export const insertProduct = createAsyncThunk(
  'product/insertProduct',
  async (data: any, thunkApi) => {
    try {
      const res = await PRODUCT_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllProduct = createAsyncThunk(
  'product/getAllProduct',
  async (data, thunkApi) => {
    try {
      const res = await PRODUCT_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getProductByPartNo = createAsyncThunk(
  'product/getProductByPartNo',
  async (part_no: any, thunkApi) => {
    try {
      const res = await PRODUCT_API.getProductByPartNo(part_no);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
