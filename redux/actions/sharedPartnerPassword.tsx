/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SHARED_PARTNER_PASSWORD_API} from '../../services/sharedPartnerPassword';

export const insertSharedPartnerPassword = createAsyncThunk(
  'sharedPartnerPassword/insertSharedPartnerPassword',
  async (data: any, thunkApi) => {
    try {
      const res = await SHARED_PARTNER_PASSWORD_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const querySharedPartnerPassword = createAsyncThunk(
  'sharedPartnerPassword/querySharedPartnerPassword',
  async (query: any, thunkApi) => {
    try {
      let obj = {
        partner_name: query?.partner_name,
      };
      const res = await SHARED_PARTNER_PASSWORD_API.query(obj);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteSharedPartnerPassword = createAsyncThunk(
  'sharedPartnerPassword/deleteSharedPartnerPassword',
  async (data: any, thunkApi) => {
    try {
      const res = await SHARED_PARTNER_PASSWORD_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateSharedPartnerPasswordById = createAsyncThunk(
  'sharedPartnerPassword/updateSharedPartnerPasswordById',
  async (data: any, thunkApi) => {
    try {
      const res = await SHARED_PARTNER_PASSWORD_API.updateById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getSharedPartnerPasswordForOrganization = createAsyncThunk(
  'sharedPartnerPassword/getSharedPartnerPasswordForOrganization',
  async (id: any, thunkApi) => {
    try {
      const res = await SHARED_PARTNER_PASSWORD_API.getByIdfororganization(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
