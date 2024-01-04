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
  'opportunity/getAllOpportunity',
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
  'opportunity/getOpportunityById',
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
  'opportunity/updateOpportunity',
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
  'opportunity/deleteOpportunity',
  async (Ids: any, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.delete(Ids);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getdeleteOpportunity = createAsyncThunk(
  'opportunity/getdeleteOpportunity',
  async (Ids: any, thunkApi) => {
    try {
      const res = await OPPORTUNITY_API.getdeleted();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const queryOpportunity = createAsyncThunk(
  'opportunity/query',
  async (query: string, thunkApi) => {
    try {
      const obj = {
        title: query,
      };
      const res = await OPPORTUNITY_API.query(query);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
