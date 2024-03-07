/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {QUOTECONFIGURATION} from '../../services/nanonets';

export const getAllNanonetsModel = createAsyncThunk(
  'nanonetsConfiguration/getAllNanonetsModel',
  async (data, thunkApi) => {
    try {
      const res = await QUOTECONFIGURATION.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const insertQuoteConfiguration = createAsyncThunk(
  'nanonetsConfiguration/addNanonetsModel',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTECONFIGURATION.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteQuoteConfiguration = createAsyncThunk(
  'nanonetsConfiguration/deleteNanonetsModel',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTECONFIGURATION.deleteById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateNanonetsModel = createAsyncThunk(
  'nanonetsConfiguration/updateQuoteDraftById',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTECONFIGURATION.patch(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
