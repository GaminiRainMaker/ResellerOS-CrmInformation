/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {QUOTEAPI} from '../../services/quote';

export const getAllQuotesWithCompletedAndDraft = createAsyncThunk(
  'quote/getAllQuotesWithCompletedAndDraft',
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
  'quote/getQuoteById',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTEAPI.getQuoteByID(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateQuoteDraftById = createAsyncThunk(
  'quote/updateQuoteDraftById',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTEAPI.updateQuoteDraftById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateQuoteByQuery = createAsyncThunk(
  'quote/updateQuoteByQuery',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTEAPI.updateQuoteByQuery(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const deleteQuoteById = createAsyncThunk(
  'quote/delete',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTEAPI.deleteById(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const updateQuoteWithNewlineItemAddByID = createAsyncThunk(
  'quote/updateQuoteWithNewlineItemAdd',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTEAPI.updateQuoteWithNewlineItemAdd(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateQuoteById = createAsyncThunk(
  'quote/updateQuoteById',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTEAPI.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getQuotesByDateFilter = createAsyncThunk(
  'quote/getQuotesByDateFilter',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTEAPI.getQuotesByDateFilter(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getQuoteByManualUpdated = createAsyncThunk(
  'quote/getQuoteByManualUpdated',
  async (data, thunkApi) => {
    try {
      console.log('ssssssss');
      const res = await QUOTEAPI.getQuoteByManual();
      // return res.data;
      return '';
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
