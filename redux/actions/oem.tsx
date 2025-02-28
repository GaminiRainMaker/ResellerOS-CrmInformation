/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OEM_API} from '../../services/oem';

export const insertOEM = createAsyncThunk(
  'oem/addOEM',
  async (data: any, thunkApi) => {
    try {
      const res = await OEM_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const queryOEM = createAsyncThunk(
  'oem/query',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        oem: query?.oem,
      };
      const res = await OEM_API.query(obj);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateOEM = createAsyncThunk(
  'oem/updateOEM',
  async (data: any, thunkApi) => {
    try {
      const res = await OEM_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteOEM = createAsyncThunk(
  'oem/deleteOEM',
  async (data: any, thunkApi) => {
    try {
      const res = await OEM_API.delete(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
