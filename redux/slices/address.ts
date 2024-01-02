/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertAddAddress,
  getAllAddress,
  updateAddress,
} from '../actions/address';

type AddressState = {
  loading: boolean;
  error: string | null;
  data: any;
  address: any;
};
const initialState: AddressState = {
  loading: false,
  error: null,
  data: [],
  address: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAddAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertAddAddress.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertAddAddress.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllAddress.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setAddress} = addressSlice.actions;
export default addressSlice?.reducer;
