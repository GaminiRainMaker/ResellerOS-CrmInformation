/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertOEM,
  queryOEM,
  updateOEM,
  deleteOEM,
} from '../actions/oem';

type OemState = {
  loading: boolean;
  error: string | null;
  data: any;
  oem: any;
};
const initialState: OemState = {
  loading: false,
  error: null,
  data: [],
  oem: [],
};

const oemSlice = createSlice({
  name: 'oem',
  initialState,
  reducers: {
    setOEM: (state, action) => {
      state.oem = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertOEM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertOEM.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        insertOEM.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateOEM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOEM.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateOEM.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteOEM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteOEM.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteOEM.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryOEM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryOEM.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryOEM.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setOEM} = oemSlice.actions;
export default oemSlice?.reducer;
