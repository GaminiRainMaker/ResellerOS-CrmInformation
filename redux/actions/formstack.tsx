/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FORMSTACK} from '../../services/formStack';

export const getAllDocuments = createAsyncThunk(
  'formStack',
  async (data: any, thunkApi) => {
    try {
      const res = await FORMSTACK.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
