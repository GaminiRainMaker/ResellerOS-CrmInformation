/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {QUOTE_LINE_ITEM_API} from '../../services/quotelineitem';

export const getQuoteLineItem = createAsyncThunk(
  'quoteLineItem/all',
  async (data, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const insertQuoteLineItem = createAsyncThunk(
  'quoteLineItem/insertQuote',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getQuoteLineItemById = createAsyncThunk(
  'quoteLineItem/id',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.getById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const UpdateQuoteLineItemQuantityById = createAsyncThunk(
  'quoteLineItem/UpdateQuoteLineItemQuantityById',
  async (data: any, thunkApi) => {
    try {
      const res =
        await QUOTE_LINE_ITEM_API.updateQuoteLineItemQuantityById(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const DeleteQuoteLineItemById = createAsyncThunk(
  'quoteLineItem/deleteQuoteLineItemById',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.deleteQuoteLineItemById(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getQuoteLineItemByQuoteId = createAsyncThunk(
  'quoteLineItem/getQuoteLineItemByQuoteId/:id',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.getQuoteLineItemByQuoteId(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const updateQuoteLineItemForBundleId = createAsyncThunk(
  'quoteLineItem/getQuoteLineItemForBundleId',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getQuoteLineItemByQuoteIdandBundleIdNull = createAsyncThunk(
  'quoteLineItem/getQuoteLineItemByQuoteIdandBundleIdNull',
  async (id: number, thunkApi) => {
    try {
      const res =
        await QUOTE_LINE_ITEM_API.getQuoteLineItemByQuoteIdandBundleIdNull(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateQuoteLineItemById = createAsyncThunk(
  'quoteLineItem/updateQuoteLineItemById',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.updateQuoteLineItemById(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const updateQuoteLineItemConcern = createAsyncThunk(
  'quoteLineItem/updateQuoteLineItemConcern',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.updateQuoteLineItemConcern(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateQuoteLineItemVerified = createAsyncThunk(
  'quoteLineItem/updateQuoteLineItemVerified',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.updateQuoteLineItemVerified(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteQuoteLineItemsByQuoteId = createAsyncThunk(
  'quoteLineItem/deleteQuoteLineItemByQuoteId',
  async (id: any, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.deleteQuoteLineByQuoteID(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
