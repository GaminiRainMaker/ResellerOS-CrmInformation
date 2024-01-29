/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {updateDealRegAddressById} from '../actions/dealRegAddress';

type DealRegAddressState = {
  loading: boolean;
  error: string | null;
  data: any;
  dealRegAddress: any;
};
const initialState: DealRegAddressState = {
  loading: false,
  error: null,
  data: [],
  dealRegAddress: {},
};

const dealRegAddressSlice = createSlice({
  name: 'dealRegAddress',
  initialState,
  reducers: {
    setDealRegAddress: (state, action) => {
      state.dealRegAddress = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    //   .addCase(insertDealReg.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(insertDealReg.fulfilled, (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.data = [action.payload];
    //   })
    //   .addCase(insertDealReg.rejected, (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      .addCase(updateDealRegAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDealRegAddressById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateDealRegAddressById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setDealRegAddress} = dealRegAddressSlice.actions;
export default dealRegAddressSlice?.reducer;
