/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {insertBundle, getAllBundle} from '../actions/bundle';

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
      .addCase(insertBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertBundle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertBundle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBundle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllBundle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setProduct} = productSlice.actions;
export default productSlice?.reducer;
