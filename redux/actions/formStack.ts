/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FORMSTACK_API} from '../../services/formStack';

export const insertFormStack = createAsyncThunk(
  'formStackTable/addSyncingForFormStack',
  async (data: any, thunkApi) => {
    try {
      const res = await FORMSTACK_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllFormStack = createAsyncThunk(
  'formStackTable/getAllFormStack',
  async (id: any, thunkApi) => {
    try {
      const res = await FORMSTACK_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getFormStackByDocId = createAsyncThunk(
  'formStackTable/getFormStackByDocId',
  async (id: any, thunkApi) => {
    try {
      const res = await FORMSTACK_API.getByDocId(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
