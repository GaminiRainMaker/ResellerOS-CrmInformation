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
export const getRecentNotifications = createAsyncThunk(
  'notification/getRecentNotifications',
  async (id: any, thunkApi) => {
    try {
      const res = await NOTIFICATIONS_API.getRecentNotifications();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const getEarlierNotifications = createAsyncThunk(
  'notification/getEarlierNotifications',
  async (id: any, thunkApi) => {
    try {
      const res = await NOTIFICATIONS_API.getEarlierNotifications();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
