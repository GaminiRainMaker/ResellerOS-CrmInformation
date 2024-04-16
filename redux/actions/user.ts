/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {USERAPI} from '../../services/user';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.loginUser(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const createUser = createAsyncThunk(
  'user/addUser',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.addUser(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateUserById = createAsyncThunk(
  'user/updateUserById',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.updateUserById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getUserByOrganization = createAsyncThunk(
  'user/getUserByOrganization',
  async (organization: string, thunkApi) => {
    try {
      const res = await USERAPI.get();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getUserByTokenAccess = createAsyncThunk(
  'user/getUserByToken',
  async (organization: string, thunkApi) => {
    try {
      const res = await USERAPI.getByToken();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getUserByIdLogin = createAsyncThunk(
  'user/getUserById',
  async (id: any, thunkApi) => {
    try {
      const res = await USERAPI.getByIdDetail(id);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const queryAllUsers = createAsyncThunk(
  'user/queryAllUsers',
  async (organization: any, thunkApi) => {
    try {
      const res = await USERAPI.query(organization);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getAdminUserOfAllOrganization = createAsyncThunk(
  'user/getAdminUserOfAllOrganization',
  async (data: any, thunkApi) => {
    try {
      const res = await USERAPI.getAdminUserOfAllOrganization();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const getGloabalySearchDataa = createAsyncThunk(
  'user/globalSearchApi',
  async (query: any, thunkApi) => {
    try {
      const res = await USERAPI.getForGlobalSearch(query);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
