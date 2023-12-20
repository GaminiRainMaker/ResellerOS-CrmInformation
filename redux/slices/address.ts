/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {insertAddAddress, getAllAddress} from '../actions/address';

type ProductState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
};
const initialState: ProductState = {
  loading: false,
  error: null,
  data: [],
  product: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
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
      });
  },
});

export const {setProduct} = productSlice.actions;
export default productSlice?.reducer;
