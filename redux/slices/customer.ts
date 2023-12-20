/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getAllCustomer, insertCustomer} from '../actions/customer';

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
      .addCase(insertCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(insertCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getAllCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setProduct} = productSlice.actions;
export default productSlice?.reducer;
