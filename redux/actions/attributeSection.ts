/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ATTRIBUTE_SECTION_API} from '../../services/attributeSection';

export const insertAttributeSection = createAsyncThunk(
  'attributeSection/insertAttributeSection',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTRIBUTE_SECTION_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);


export const deleteAttributeSection = createAsyncThunk(
  'attributeSection/deleteAttributeSection',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTRIBUTE_SECTION_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updateAttributeSectionById = createAsyncThunk(
  'attributeSection/updateAttributeSectionById',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTRIBUTE_SECTION_API.updateAttributeSectionById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const queryAttributeSection = createAsyncThunk(
  'attributeSection/queryAttributeSection',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        sectionName: query?.sectionName,
      };
      const res = await ATTRIBUTE_SECTION_API.query(obj);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
