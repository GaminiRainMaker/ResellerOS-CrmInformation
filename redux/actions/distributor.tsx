/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {DISTRIBUTOR_API} from '../../services/distributor';

export const insertDistributor = createAsyncThunk(
  'distributor/addDistributor',
  async (data: any, thunkApi) => {
    try {
      const res = await DISTRIBUTOR_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const queryDistributor = createAsyncThunk(
  'distributor/query',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        distributor: query?.distributor,
      };
      const res = await DISTRIBUTOR_API.query(obj);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateDistributor = createAsyncThunk(
  'distributor/updateDistributor',
  async (data: any, thunkApi) => {
    try {
      const res = await DISTRIBUTOR_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteDistributor = createAsyncThunk(
  'distributor/deleteDistributor',
  async (data: any, thunkApi) => {
    try {
      const res = await DISTRIBUTOR_API.delete(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
