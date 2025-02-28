/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertDistributor,
  queryDistributor,
  updateDistributor,
  deleteDistributor,
} from '../actions/distributor';

type DistributorState = {
  loading: boolean;
  error: string | null;
  data: any;
  distributor: any;
};
const initialState: DistributorState = {
  loading: false,
  error: null,
  data: [],
  distributor: [],
};

const distributorSlice = createSlice({
  name: 'distributor',
  initialState,
  reducers: {
    setDistributor: (state, action) => {
      state.distributor = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertDistributor.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = [action.payload];
        },
      )
      .addCase(
        insertDistributor.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDistributor.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        updateDistributor.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteDistributor.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        deleteDistributor.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryDistributor.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryDistributor.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setDistributor} = distributorSlice.actions;
export default distributorSlice?.reducer;
