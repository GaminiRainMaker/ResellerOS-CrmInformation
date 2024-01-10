/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {UPLOAD_API} from '../../services/upload';

export const uploadToAws = createAsyncThunk(
  'upload/uploadDocument',
  async (data: any, thunkApi) => {
    try {
      const res = await UPLOAD_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
