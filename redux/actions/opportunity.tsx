/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OPPORTUNITY_API} from '../../services/opportunity';

export const insertOpportunity = createAsyncThunk(
  'opportunity/addOpportunity',
  async (data: any, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllOpportunity = createAsyncThunk(
  'opportunity',
  async (data, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getOpportunityById = createAsyncThunk(
  'opportunity',
  async (id: any, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.getById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const updateOpportunity = createAsyncThunk(
  'opportunity',
  async (data: any, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const deleteOpportunity = createAsyncThunk(
  'opportunity',
  async (id: any, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.delete(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
