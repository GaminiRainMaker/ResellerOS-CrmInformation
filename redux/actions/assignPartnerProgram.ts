/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASSIGN_PARTNER_PROGRAM_API} from '../../services/assignPartnerProgram';

export const insertAssignPartnerProgram = createAsyncThunk(
  'assignPartnerProgram/insertAssignPartnerProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await ASSIGN_PARTNER_PROGRAM_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAssignPartnerProgramByOrganization = createAsyncThunk(
  'assignPartnerProgram/getAssignPartnerProgramByOrganization',
  async (organization: any, thunkApi) => {
    try {
      const res = await ASSIGN_PARTNER_PROGRAM_API.query(organization);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);


export const getAllAssignPartnerProgram = createAsyncThunk(
  'assignPartnerProgram/getAllAssignPartnerProgram',
  async (organization: any, thunkApi) => {
    try {
      const res = await ASSIGN_PARTNER_PROGRAM_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteAssignPartnerProgram = createAsyncThunk(
  'assignPartnerProgram/deleteAssignPartnerProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await ASSIGN_PARTNER_PROGRAM_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateAssignPartnerProgramById = createAsyncThunk(
  'assignPartnerProgram/updateAssignPartnerProgramById',
  async (data: any, thunkApi) => {
    try {
      const res =
        await ASSIGN_PARTNER_PROGRAM_API.updateAssignPartnerProgramById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
