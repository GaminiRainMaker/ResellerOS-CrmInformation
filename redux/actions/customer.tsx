/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CUSTOMER_API} from '../../services/customer';

export const insertCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (data: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllCustomer = createAsyncThunk(
  'customer/getAllCustomer',
  async (id: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
