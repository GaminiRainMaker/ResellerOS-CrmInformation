/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BUNDLE_API} from '../../services/bundle';

export const insertBundle = createAsyncThunk(
  'bundle/insertBundle',
  async (data: any, thunkApi) => {
    try {
      const res = await BUNDLE_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllBundle = createAsyncThunk(
  'bundle/getAllBundle',
  async (id: any, thunkApi) => {
    try {
      const res = await BUNDLE_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
