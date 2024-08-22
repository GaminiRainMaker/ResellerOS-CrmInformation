/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FORMULA_API} from '../../services/formulas';

export const insertFormula = createAsyncThunk(
  'contract/insertFormula',
  async (data: any, thunkApi) => {
    try {
      const res = await FORMULA_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllFormulas = createAsyncThunk(
  'contract/getAllFormulas',
  async (data, thunkApi) => {
    try {
      const res = await FORMULA_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteFormula = createAsyncThunk(
  'contract/deleteFormula',
  async (id: any, thunkApi) => {
    try {
      const res = await FORMULA_API.deleteById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
