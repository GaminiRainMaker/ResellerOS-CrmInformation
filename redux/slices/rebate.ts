/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getRebateById,
  getRebatesByProductCode,
  insertRebate,
} from '../actions/rebate';

type RebateState = {
  loading: boolean;
  error: string | null;
  data: any;
  rebate: any;
};
const initialState: RebateState = {
  loading: false,
  error: null,
  data: [],
  rebate: [],
};

const rebateSlice = createSlice({
  name: 'rebate',
  initialState,
  reducers: {
    setRebate: (state, action) => {
      state.rebate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertRebate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertRebate.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertRebate.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRebatesByProductCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRebatesByProductCode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getRebatesByProductCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getRebateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRebateById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRebateById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setRebate} = rebateSlice.actions;
export default rebateSlice?.reducer;
