/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {LICENSE_API} from '../../services/license';

export const assignLicense = createAsyncThunk(
  'license/assignLicense',
  async (data: any, thunkApi) => {
    try {
      const res = await LICENSE_API.assignLicense(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const revokeLicense = createAsyncThunk(
  'license/revokeLicense',
  async (data: any, thunkApi) => {
    try {
      const res = await LICENSE_API.revokeLicense(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getLicense = createAsyncThunk(
  'license/getLicense',
  async (data: any, thunkApi) => {
    try {
      const res = await LICENSE_API.getLicenseCount(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
