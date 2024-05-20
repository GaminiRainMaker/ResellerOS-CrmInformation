/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PARTNER_PASSWORD_API} from '../../services/partnerPassword';

export const insertPartnerPassword = createAsyncThunk(
  'partnerPassword/insertPartnerPassword',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_PASSWORD_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const queryPartnerPassword = createAsyncThunk(
  'partnerPassword/queryPartnerPassword',
  async (query: any, thunkApi) => {
    try {
      let obj = {
        partner_name: query?.partner_name,
      };
      const res = await PARTNER_PASSWORD_API.query(obj);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deletePartnerPassword = createAsyncThunk(
  'partnerPassword/deletePartnerPassword',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_PASSWORD_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updatePartnerPasswordById = createAsyncThunk(
  'partnerPassword/updatePartnerPasswordById',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_PASSWORD_API.updateById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
