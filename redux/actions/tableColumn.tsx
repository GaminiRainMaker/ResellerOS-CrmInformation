/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TABLE_COLUMN_API} from '../../services/tableColumn';

export const getAllTableColumn = createAsyncThunk(
  'TableColumn/getAllTableColumn',
  async (data: any, thunkApi) => {
    try {
      const res = await TABLE_COLUMN_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const updateTableColumnById = createAsyncThunk(
  'TableColumn/updateTableColumnById',
  async (data: any, thunkApi) => {
    try {
      const res = await TABLE_COLUMN_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
