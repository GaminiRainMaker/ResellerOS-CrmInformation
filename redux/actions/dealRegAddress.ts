/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {DEALREG_ADDRESS_API} from '../../services/dealRegAddress';

export const insertDealRegAddress = createAsyncThunk(
  'dealRegAddress/insertDealRegAddress',
  async (data: any, thunkApi) => {
    try {
      const res = await DEALREG_ADDRESS_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateDealRegAddressById = createAsyncThunk(
  'dealRegAddress/updateDealRegAddressById',
  async (data: any, thunkApi) => {
    try {
      const res = await DEALREG_ADDRESS_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getDealRegAddressById = createAsyncThunk(
  'dealRegAddress/getDealRegAddressById',
  async (id: number, thunkApi) => {
    try {
      const res = await DEALREG_ADDRESS_API.getById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
