/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {QUOTE_CONFIGURATION_API} from '../../services/quoteConfiguration';

export const insertQuoteConfiguration = createAsyncThunk(
  'quoteConfiguration/addQuoteConfiguration',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_CONFIGURATION_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const queryQuoteConfiguration = createAsyncThunk(
  'quoteConfiguration/query',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        quoteConfiguration: query?.quoteConfiguration,
      };
      const res = await QUOTE_CONFIGURATION_API.query(obj);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateQuoteConfiguration = createAsyncThunk(
  'quoteConfiguration/updateQuoteConfiguration',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_CONFIGURATION_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteQuoteConfiguration = createAsyncThunk(
  'quoteConfiguration/deleteQuoteConfiguration',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_CONFIGURATION_API.delete(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
