/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CONTRACT_CONFIGURATION_API} from '../../services/contractConfiguration';

export const insertUpdateContractConfiguartion = createAsyncThunk(
  'ContractConfiguartion/insertAndUpdate',
  async (data: any, thunkApi) => {
    try {
      const res = await CONTRACT_CONFIGURATION_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllContractConfiguartion = createAsyncThunk(
  'ContractConfiguartion/getContractConfiguartion',
  async (id: any, thunkApi) => {
    try {
      const res = await CONTRACT_CONFIGURATION_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
