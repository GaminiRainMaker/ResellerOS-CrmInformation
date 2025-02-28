/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ADDRESS_API} from '../../services/address';

export const insertAddAddress = createAsyncThunk(
  'address/addAddress',
  async (data: any, thunkApi) => {
    try {
      const res = await ADDRESS_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllAddress = createAsyncThunk(
  'address/getAllAddress',
  async (id: any, thunkApi) => {
    try {
      const res = await ADDRESS_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAddressByCustomerId = createAsyncThunk(
  'address/getAddressByCustomerId',
  async (id: any, thunkApi) => {
    try {
      const res = await ADDRESS_API.getAddressByCustomerId(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async (data: any, thunkApi) => {
    try {
      const res = await ADDRESS_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (data: any, thunkApi) => {
    try {
      const res = await ADDRESS_API.deleteAddress(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
