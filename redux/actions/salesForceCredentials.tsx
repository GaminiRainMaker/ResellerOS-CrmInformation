/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SALESFORCE_CREDENTIALS_API} from '../../services/salesForceCredentials';

export const addSalesForceCredentials = createAsyncThunk(
  'salesforceCredentials/addSalesForceCredentials',
  async (data: any, thunkApi) => {
    try {
      const res =
        await SALESFORCE_CREDENTIALS_API.addSalesForceCredentials(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const queryAddSalesForceCredentials = createAsyncThunk(
  'salesforceCredentials/queryAddSalesForceCredentials',
  async (data: any, thunkApi) => {
    try {
      const res =
        await SALESFORCE_CREDENTIALS_API.queryAddSalesForceCredentials({});
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateSalesForceCredentialsId = createAsyncThunk(
  'salesforceCredentials/updatesalesForceCredentialsId',
  async (data: any, thunkApi) => {
    try {
      const res =
        await SALESFORCE_CREDENTIALS_API.updatesalesForceCredentialsId(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteSalesForceCredentials = createAsyncThunk(
  'salesforceCredentials/deleteSalesForceCredentials',
  async (data: any, thunkApi) => {
    try {
      const res =
        await SALESFORCE_CREDENTIALS_API.deleteSalesForceCredentials(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
