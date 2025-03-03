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
export const getAllDeletedCustomer = createAsyncThunk(
  'customer/getAllDeletedCustomer',
  async (id: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.getAllDeleted();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const deleteCustomers = createAsyncThunk(
  'customer/deleteCustomers',
  async (data: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (data: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.updateCustomerDetails(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const searchCustomer = createAsyncThunk(
  'customer/getCustomerBySearch',
  async (data: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.seacrh(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const queryCustomer = createAsyncThunk(
  'customer/query',
  async (query: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.query(query);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getCustomerBYId = createAsyncThunk(
  'customer/getAllCustomerById',
  async (id: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.getCsutomerById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getCustomerProfileById = createAsyncThunk(
  'customer/getCustomerProfileById',
  async (data: any, thunkApi) => {
    try {
      const res = await CUSTOMER_API.getCustomerProfileById(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
