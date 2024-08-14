import {createAsyncThunk} from '@reduxjs/toolkit';

export const lauchPlayWright = createAsyncThunk(
  'playWright/lauchPlayWright',
  async (data: any, thunkApi) => {
    try {
      const response = await fetch('/api/run-playwright', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });

      const result = await response.json();

      if (!response.ok) {
        return thunkApi.rejectWithValue(result.error);
      }

      return result.message;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const lauchSalesPlayWright = createAsyncThunk(
  'playWright/lauchSalesPlayWright',
  async (data: any, thunkApi) => {
    try {
      const response = await fetch('/api/salesforce-paywright', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });

      const result = await response.json();

      if (!response.ok) {
        return thunkApi.rejectWithValue(result.error);
      }

      return result.message;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
