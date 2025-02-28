/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OPPORLINEITEM_API} from '../../services/opportunityLineItem';

export const insertOpportunityLineItem = createAsyncThunk(
  'opportunityLineItem',
  async (data: any, thunkApi) => {
    try {
      const res = await OPPORLINEITEM_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
