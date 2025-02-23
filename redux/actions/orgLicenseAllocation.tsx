/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ORG_LICENSE_API} from '../../services/orgLicenseAllocation';

export const allocateLicensesToOrg = createAsyncThunk(
  'orgLicenseAllocation/allocateLicensesToOrg',
  async (data: any, thunkApi) => {
    try {
      const res = await ORG_LICENSE_API.allocateLicensesToOrg(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const checkAvailableLicenses = createAsyncThunk(
  'orgLicenseAllocation/checkAvailableLicenses',
  async (data: any, thunkApi) => {
    try {
      const res = await ORG_LICENSE_API.checkAvailableLicenses(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
