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
  'user/addUser',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.addUser(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateUserById = createAsyncThunk(
  'user/updateUserById',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.updateUserById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getUserByOrganization = createAsyncThunk(
  'user/getUserByOrganization',
  async (organization: string, thunkApi) => {
    console.log('organization', organization);
    try {
      const res = await USERAPI.get();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
