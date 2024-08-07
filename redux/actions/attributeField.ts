/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ATTRIBUTE_FIELD_API} from '../../services/attributeField';

export const insertAttributeField = createAsyncThunk(
  'attributeField/insertAttributeField',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTRIBUTE_FIELD_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteAttributeField = createAsyncThunk(
  'attributeField/deleteAttributeField',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTRIBUTE_FIELD_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateAttributeFieldById = createAsyncThunk(
  'attributeField/updateAttributeFieldById',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTRIBUTE_FIELD_API.updateAttributeFieldById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const queryAttributeField = createAsyncThunk(
  'attributeField/queryAttributeField',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        fieldLabel: query?.fieldLabel,
        sectionName: query?.sectionName,
      };
      const res = await ATTRIBUTE_FIELD_API.query(obj);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const queryAttributeFieldForForm = createAsyncThunk(
  'attributeField/queryAttributeFieldForForm',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        fieldLabel: query?.fieldLabel,
        sectionName: query?.sectionName,
      };
      const res = await ATTRIBUTE_FIELD_API.queryAttributeFieldForForm(obj);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
