/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {REBATE_QUOTE_LINE_ITEM_API} from '../../services/rebateQuoteLineItem';

export const getRebateQuoteLineItemByQuoteId = createAsyncThunk(
  'rebateQuoteLineItem/getRebateQuoteLineItemByQuoteId',
  async (id: number, thunkApi) => {
    try {
      const res = await REBATE_QUOTE_LINE_ITEM_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const insertRebateQuoteLineItem = createAsyncThunk(
  'rebateQuoteLineItem/insertRebateQuoteLineItem',
  async (data: any, thunkApi) => {
    try {
      const res = await REBATE_QUOTE_LINE_ITEM_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateRebateQuoteLineItemById = createAsyncThunk(
  'rebateQuoteLineItem/updateRebateQuoteLineItemById',
  async (data: any, thunkApi) => {
    try {
      const res = await REBATE_QUOTE_LINE_ITEM_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
