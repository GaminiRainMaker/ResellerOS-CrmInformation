/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {MAPPED_OPTIONS_API} from '../../services/mappedOptions';

export const insertMappedOptions = createAsyncThunk(
  'MappedOptions/addMappedOptions',
  async (data: any, thunkApi) => {
    try {
      const res = await MAPPED_OPTIONS_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateMappedOptions = createAsyncThunk(
  'MappedOptions/updateMappedOptions',
  async (data: any, thunkApi) => {
    try {
      const res = await MAPPED_OPTIONS_API.patch(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getMappedOptionsBYId = createAsyncThunk(
  'MappedOptions/getAllMappedOptionsById',
  async (id: any, thunkApi) => {
    try {
      const res = await MAPPED_OPTIONS_API.getById(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getALlMappedOptions = createAsyncThunk(
  'MappedOptions/getAllMappedOptionsById',
  async (data: any, thunkApi) => {
    try {
      const res = await MAPPED_OPTIONS_API.query(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deleteMappedOptionss = createAsyncThunk(
  'MappedOptions/deleteMappedOption',
  async (data: any, thunkApi) => {
    try {
      const res = await MAPPED_OPTIONS_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
