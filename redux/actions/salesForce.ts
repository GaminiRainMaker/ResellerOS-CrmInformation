/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SALESFORCE_API} from '../../services/salesforce';

export const createSalesForcePartner = createAsyncThunk(
  'salesforce/createSalesForcePartner',
  async (data: any, thunkApi) => {
    try {
      const res = await SALESFORCE_API.createSalesForcePartner(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const createSalesforcePartnerProgram = createAsyncThunk(
  'salesforce/createSalesForcePartnerProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await SALESFORCE_API.createSalesForcePartnerProgram(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const createSalesforceDealreg = createAsyncThunk(
  'salesforce/createSalesForceDealreg',
  async (data: any, thunkApi) => {
    try {
      const res = await SALESFORCE_API.createSalesForceDealreg(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getSalesForceDealregByOpportunityId = createAsyncThunk(
  'salesforce/getSalesForceDealregByOpportunityId',
  async (data: any, thunkApi) => {
    try {
      const res =
        await SALESFORCE_API.getSalesForceDealregByOpportunityId(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getSalesForceDealregById = createAsyncThunk(
  'salesforce/getSalesForceDealregById',
  async (data: any, thunkApi) => {
    try {
      const res = await SALESFORCE_API.getSalesForceDealregById(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
