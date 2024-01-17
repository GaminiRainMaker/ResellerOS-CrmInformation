/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getAllDealReg, getDealRegById, insertDealReg} from '../actions/dealReg';

type DealRegState = {
  loading: boolean;
  error: string | null;
  data: any;
  dealReg: any;
};
const initialState: DealRegState = {
  loading: false,
  error: null,
  data: [],
  dealReg: [],
};

const dealRegSlice = createSlice({
  name: 'dealReg',
  initialState,
  reducers: {
    setDealReg: (state, action) => {
      state.dealReg = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertDealReg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDealReg.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertDealReg.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDealRegById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDealRegById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getDealRegById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllDealReg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDealReg.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllDealReg.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setDealReg} = dealRegSlice.actions;
export default dealRegSlice?.reducer;
