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
    const {id, quantity} = data;
    console.log('dfffff', id, quantity);
    try {
      const res = await QUOTE_LINE_ITEM_API.updateQuoteLineItemQuantityById(
        id,
        quantity,
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const DeleteQuoteLineItemQuantityById = createAsyncThunk(
  'quoteLineItem/DeleteQuoteLineItemQuantityById',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTE_LINE_ITEM_API.deleteQuoteLineItemQuantityById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
