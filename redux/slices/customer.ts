/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteCustomers,
  getAllCustomer,
  getAllDeletedCustomer,
  insertCustomer,
  searchCustomer,
  updateCustomer,
} from '../actions/customer';

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
      })
      .addCase(getAllDeletedCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDeletedCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        getAllDeletedCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCustomers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteCustomers.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(updateCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(searchCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setProduct} = productSlice.actions;
export default productSlice?.reducer;
