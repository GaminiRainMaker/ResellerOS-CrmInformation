/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GENERALSETTING_API} from '../../services/genralSetting';

export const insertUpdateGeneralSetting = createAsyncThunk(
  'GeneralSetting/addAndUpdate',
  async (data: any, thunkApi) => {
    try {
      const res = await GENERALSETTING_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllGeneralSetting = createAsyncThunk(
  'GeneralSetting/getAllSetting',
  async (id: any, thunkApi) => {
    try {
      const res = await GENERALSETTING_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
