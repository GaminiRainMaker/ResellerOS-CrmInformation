/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {USERAPI} from '../../services/user';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.loginUser(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
