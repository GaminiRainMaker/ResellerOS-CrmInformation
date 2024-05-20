/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CACHE_FLOW} from '../../services/cacheFlow';

export const getAllCacheFLowProposal = createAsyncThunk(
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

export const getCacheFLowProposalById = createAsyncThunk(
  'chacheFlow/getProposalDataById',
  async (id: any, thunkApi) => {
    try {
      const res = await CACHE_FLOW.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
