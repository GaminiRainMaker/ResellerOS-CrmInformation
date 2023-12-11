/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {QUOTEAPI} from '../../services/quote';

export const getQuote = createAsyncThunk(
  'quote/all',
  async (data, thunkApi) => {
    try {
      const res = await QUOTEAPI.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const insertQuote = createAsyncThunk(
  'quote/insertQuote',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTEAPI.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getQuoteById = createAsyncThunk(
  'quote/id',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTEAPI.getById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
