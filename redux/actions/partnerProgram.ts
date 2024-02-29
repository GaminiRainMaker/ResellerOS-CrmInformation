/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PARTNER_PROGRAM_API} from '../../services/partnerProgram';

export const insertPartnerProgram = createAsyncThunk(
  'partnerProgram/insertPartnerProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_PROGRAM_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllPartnerProgram = createAsyncThunk(
  'partnerProgram/getAllPartnerProgram',
  async (data, thunkApi) => {
    try {
      const res = await PARTNER_PROGRAM_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deletePartnerProgram = createAsyncThunk(
  'partnerProgram/deletePartnerProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_PROGRAM_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updatePartnerProgramById = createAsyncThunk(
  'partnerProgram/updatePartnerProgramById',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_PROGRAM_API.updatePartnerProgramById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getPartnerProgramById = createAsyncThunk(
  'partnerProgram/getPartnerProgramById',
  async (id: number, thunkApi) => {
    try {
      const res = await PARTNER_PROGRAM_API.getPartnerProgramById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const deletePartnerProgramFormData = createAsyncThunk(
  'partnerProgram/deletePartnerProgramFormData',
  async (id: any, thunkApi) => {
    try {
      const res = await PARTNER_PROGRAM_API.deleteFormData(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
