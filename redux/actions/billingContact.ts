/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BILLINGADDRESS_API} from '../../services/billingContact';

export const insertbillingContact = createAsyncThunk(
  'billingContact/addBillingContact',
  async (data: any, thunkApi) => {
    try {
      const res = await BILLINGADDRESS_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllbillingContact = createAsyncThunk(
  'billingContact/getAllBillingContact',
  async (id: any, thunkApi) => {
    try {
      const res = await BILLINGADDRESS_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const updateBillingContact = createAsyncThunk(
  'billingContact/updateBillingContact',
  async (data: any, thunkApi) => {
    try {
      const res = await BILLINGADDRESS_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteBillingContact = createAsyncThunk(
  'billingContact/deleteBillingContact',
  async (data: any, thunkApi) => {
    try {
      const res = await BILLINGADDRESS_API.delete(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
