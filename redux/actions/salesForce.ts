import {createAsyncThunk} from '@reduxjs/toolkit';

export const createSalesforcePartner = createAsyncThunk(
  'salesforce/createSalesforcePartner',
  async (
    {baseURL, key, finalData}: {baseURL: any; key: any; finalData: any},
    thunkApi,
  ) => {
    // Construct the dynamic URL
    const url = `${baseURL}/services/data/v62.0/sobjects/rosstarter__Partner__c/`;
    const authToken = `Bearer ${key}`;

    console.log('Keyssss', baseURL, key, finalData);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      // Check if the response is not OK
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(errorData);
      }

      // Parse and return response data if successful
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const createSalesforcePartnerProgram = createAsyncThunk(
  'salesforce/createSalesforcePartnerProgram',
  async (
    {baseURL, key, finalData}: {baseURL: any; key: any; finalData: any},
    thunkApi,
  ) => {
    // Construct the dynamic URL
    const url = `${baseURL}/services/data/v62.0/sobjects/rosdealregai__Partner_Program__c/`;
    const authToken = `Bearer ${key}`;

    console.log('Keyssss', baseURL, key, finalData);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      // Check if the response is not OK
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(errorData);
      }

      // Parse and return response data if successful
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const createSalesforceDealreg = createAsyncThunk(
  'salesforce/createSalesforceDealreg',
  async (
    {baseURL, key, finalData}: {baseURL: any; key: any; finalData: any},
    thunkApi,
  ) => {
    // Construct the dynamic URL
    const url = `${baseURL}/services/data/v62.0/sobjects/rosdealregai__Partner_Program__c/`;
    const authToken = `Bearer ${key}`;

    console.log('Keyssss', baseURL, key, finalData);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      // Check if the response is not OK
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(errorData);
      }

      // Parse and return response data if successful
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
