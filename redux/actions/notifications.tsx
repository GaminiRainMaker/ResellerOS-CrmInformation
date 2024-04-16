/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {NOTIFICATIONS_API} from '../../services/notifications';

export const getCountOfNotification = createAsyncThunk(
  'notification/getAllNewNotificationCount',
  async (data: any, thunkApi) => {
    try {
      const res = await NOTIFICATIONS_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllNewNotification = createAsyncThunk(
  'notification/getAllNewNotification',
  async (data: any, thunkApi) => {
    try {
      const res = await NOTIFICATIONS_API.getNEWNotifications();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const ReadNotificationById = createAsyncThunk(
  'notification/deleteNotificationById',
  async (id: any, thunkApi) => {
    try {
      const res = await NOTIFICATIONS_API.delete();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
