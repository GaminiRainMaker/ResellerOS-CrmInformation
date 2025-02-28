/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {COMPANY_API} from '../../services/company';

export const insertCompany = createAsyncThunk(
  'company/insertCompany',
  async (data: any, thunkApi) => {
    try {
      const res = await COMPANY_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllCompany = createAsyncThunk(
  'company/getAllCompany',
  async (data, thunkApi) => {
    try {
      const res = await COMPANY_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getCompanyByUserId = createAsyncThunk(
  'company/getCompanyByUserId',
  async (data: any, thunkApi: any) => {
    try {
      const res = await COMPANY_API.getCompanyByUserId(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateCompanyById = createAsyncThunk(
  'company/updateCompanyById',
  async (data: any, thunkApi: any) => {
    try {
      const res = await COMPANY_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id: any, thunkApi: any) => {
    try {
      const res = await COMPANY_API.deleteById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
