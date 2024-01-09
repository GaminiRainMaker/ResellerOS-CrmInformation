/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SYNCTABLE_API} from '../../services/syncTable';

export const insertUpdateSyncTable = createAsyncThunk(
  'syncTable/addAndUpdate',
  async (data: any, thunkApi) => {
    try {
      const res = await SYNCTABLE_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllSyncTable = createAsyncThunk(
  'syncTable/getAllSyncTable',
  async (name: any, thunkApi) => {
    try {
      const res = await SYNCTABLE_API.get(name);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteSyncTableRow = createAsyncThunk(
  'syncTable/deleteTableRow',
  async (id: any, thunkApi) => {
    try {
      const res = await SYNCTABLE_API.delete(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
