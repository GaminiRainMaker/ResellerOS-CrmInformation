/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {VALIDATION_API} from '../../services/validation';

export const insertValidation = createAsyncThunk(
  'validation/insertValidation',
  async (data: any, thunkApi) => {
    try {
      const res = await VALIDATION_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllValidationByQuoteId = createAsyncThunk(
  'validation/getAllValidationByQuoteId',
  async (id: number, thunkApi) => {
    try {
      const res = await VALIDATION_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateValidationById = createAsyncThunk(
  'validation/updateValidationById',
  async (data: any, thunkApi) => {
    try {
      const res = await VALIDATION_API.patch(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
