/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertbillingContact,
  getAllbillingContact,
  updateBillingContact,
  deleteBillingContact,
  getBillingContactBySearch,
} from '../actions/billingContact';

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
      .addCase(insertbillingContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertbillingContact.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertbillingContact.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllbillingContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllbillingContact.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllbillingContact.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateBillingContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateBillingContact.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateBillingContact.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteBillingContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteBillingContact.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteBillingContact.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getBillingContactBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBillingContactBySearch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getBillingContactBySearch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setProduct} = productSlice.actions;
export default productSlice?.reducer;
