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
