/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {LINEITEM_SYNCING_API} from '../../services/LineItemSyncing';

export const insertLineItemSyncing = createAsyncThunk(
  'lineItemSyncing/addLineItemSyncing',
  async (data: any, thunkApi) => {
    try {
      const res = await LINEITEM_SYNCING_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const insertLineItemSyncingForSalesForce = createAsyncThunk(
  'lineItemSyncing/addLineItemSyncingForSalesForce',
  async (data: any, thunkApi) => {
    try {
      const res = await LINEITEM_SYNCING_API.SalesForceAdd(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateLineItemSyncing = createAsyncThunk(
  'lineItemSyncing/updateLineItemSyncing',
  async (data: any, thunkApi) => {
    try {
      const res = await LINEITEM_SYNCING_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getLineItemSyncingBYId = createAsyncThunk(
  'lineItemSyncing/getAllLineItemSyncingById',
  async (id: any, thunkApi) => {
    try {
      const res = await LINEITEM_SYNCING_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteLineItemSyncings = createAsyncThunk(
  'lineItemSyncing/deleteLineItemSyncings',
  async (data: any, thunkApi) => {
    try {
      const res = await LINEITEM_SYNCING_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const queryLineItemSyncing = createAsyncThunk(
  'lineItemSyncing/query',
  async (query: any, thunkApi) => {
    try {
      //   const obj = {
      //     pdf_header: query?.pdf_header,
      //     quote_header: query?.quote_header,
      //   };
      const res = await LINEITEM_SYNCING_API.query(query);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const queryLineItemSyncingForSalesForce = createAsyncThunk(
  'lineItemSyncing/queryLineItemSyncinForSalesFOrce',
  async (query: any, thunkApi) => {
    try {
      //   const obj = {
      //     pdf_header: query?.pdf_header,
      //     quote_header: query?.quote_header,
      //   };
      const res = await LINEITEM_SYNCING_API.SalesForceGet(query);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
