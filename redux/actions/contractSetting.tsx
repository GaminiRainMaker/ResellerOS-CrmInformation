/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CONTRACTSETTING_API} from '../../services/contractSetting';

export const insertUpdateContractSetting = createAsyncThunk(
  'ContractSetting/addAndUpdate',
  async (data: any, thunkApi) => {
    try {
      const res = await CONTRACTSETTING_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllContractSetting = createAsyncThunk(
  'ContractSetting/getAllSetting',
  async (id: any, thunkApi) => {
    try {
      const res = await CONTRACTSETTING_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
