/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ReadNotificationById,
  getAllNewNotification,
  getCountOfNotification,
} from '../actions/notifications';

type NotificationsSetting = {
  loading: boolean;
  error: string | null;
  data: any;
  notificationCount: any;
  product: any;
  filteredData: any;
};
const initialState: NotificationsSetting = {
  loading: false,
  error: null,
  notificationCount: 0,
  data: [],
  product: [],
  filteredData: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setnotification: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(ReadNotificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        ReadNotificationById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        ReadNotificationById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllNewNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllNewNotification.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllNewNotification.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getCountOfNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCountOfNotification.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.notificationCount = action.payload;
        },
      )
      .addCase(
        getCountOfNotification.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setnotification} = notificationSlice.actions;
export default notificationSlice?.reducer;
