/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_API} from '../../services/auth';

export const signUpAuth = createAsyncThunk(
  'auth',
  async (data: any, thunkApi) => {
    try {
      const res = await AUTH_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (data: any, thunkApi) => {
    try {
      const res: any = await AUTH_API.verify(data);
      if (res?.status) {
        return res.data;
      }
      return res?.message?.response?.data?.message;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
