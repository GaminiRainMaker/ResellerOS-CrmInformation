import {createAsyncThunk} from '@reduxjs/toolkit';
/* eslint-disable import/no-extraneous-dependencies */
import {QUOTE_FILE_API} from '../../services/quoteFile';

export const getAllQuoteFile = createAsyncThunk(
  'quoteFile/getAllQuoteFile',
  async (data, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const insertQuoteFile = createAsyncThunk(
  'quoteFile/insertQuoteFile',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const UpdateQuoteFileById = createAsyncThunk(
  'quoteFile/updateQuoteFileById',
  async (id: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.updateQuoteFileById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const quoteFileVerification = createAsyncThunk(
  'quoteFile/quoteFileVerification',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.quoteFileVerification(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getfileByQuoteIdWithManual = createAsyncThunk(
  'quoteFile/getfileByQuoteIdWithManual',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.getfileByQuoteIdWithManualadd(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteQuoteFileById = createAsyncThunk(
  'quoteFile/delete',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.delete(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getQuoteFileByQuoteId = createAsyncThunk(
  'quoteFile/getQuoteFileByQuoteId',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.getQuoteFileByQuoteId(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getQuoteFileCount = createAsyncThunk(
  'quoteFile/getQuoteFileCount',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.getQuoteFileCount(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getQuoteFileById = createAsyncThunk(
  'quoteFile/getQuoteFileById',
  async (id: number, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.getQuoteFileById(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getQuoteFileByQuoteIdAll = createAsyncThunk(
  'quoteFile/getQuoteFileByQuoteIdAll',
  async (id: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.getQuoteFileByQuoteIdAll(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getQuoteFileByIdForFormulas = createAsyncThunk(
  'quoteFile/getQuoteFileByIdForFormulas',
  async (id: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.getQuoteFileByIdForFormulas(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const updateFileForQuoteJson = createAsyncThunk(
  'quoteFile/updateQuoteFileByIdForQuoteJson',
  async (data: any, thunkApi) => {
    try {
      const res = await QUOTE_FILE_API.postJson(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const queryQuoteFile = createAsyncThunk(
  'quoteFile/queryQuoteFile',
  async (query: any, thunkApi) => {
    try {
      const obj = {
        organizationName: query?.organizationName,
        createdBy: query?.createdBy,
      };
      const res = await QUOTE_FILE_API.query(obj);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
