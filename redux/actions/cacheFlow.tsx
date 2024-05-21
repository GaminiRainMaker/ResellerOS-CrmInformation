/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CACHE_FLOW} from '../../services/cacheFlow';

export const getAllCustomerOfCacheFlow = createAsyncThunk(
  'chacheFlow',
  async (data: any, thunkApi) => {
    try {
      const res = await CACHE_FLOW.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getSubsvriptionForCustomer = createAsyncThunk(
  'chacheFlow/getProposalDataById',
  async (id: any, thunkApi) => {
    try {
      const res = await CACHE_FLOW.getByCusId(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getProposalForSubscription = createAsyncThunk(
  'cacheFlow/getProposalForSubscription',
  async (id: any, thunkApi) => {
    try {
      const res = await CACHE_FLOW.getProposalBySub(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
