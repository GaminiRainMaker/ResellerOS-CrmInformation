/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PARTNER_API} from '../../services/partner';

export const insertPartner = createAsyncThunk(
  'partner/insertPartner',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllPartner = createAsyncThunk(
  'partner/getAllPartner',
  async (data, thunkApi) => {
    try {
      const res = await PARTNER_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getAllPartnerTemp = createAsyncThunk(
  'partner/getAllPartnerTemp',
  async (data, thunkApi) => {
    try {
      const res = await PARTNER_API.getAllPartnerTemp();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deletePartner = createAsyncThunk(
  'partner/deletePartner',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updatePartnerById = createAsyncThunk(
  'partner/updatePartnerById',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.updatePartnerById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getAllPartnerandProgram = createAsyncThunk(
  'partner/getAllPartnerandProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.getAllPartnerandProgram();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
