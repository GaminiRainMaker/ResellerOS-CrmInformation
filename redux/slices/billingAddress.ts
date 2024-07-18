/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertbillingContact,
  getAllbillingContact,
  updateBillingContact,
  deleteBillingContact,
  getBillingContactBySearch,
  queryContact,
} from '../actions/billingContact';

type BillingContactState = {
  loading: boolean;
  error: string | null;
  data: any;
  billingContact: any;
  filteredData: any;
  billingContactData: any;
};
const initialState: BillingContactState = {
  loading: false,
  error: null,
  data: [],
  billingContact: {},
  filteredData: [],
  billingContactData: {},
};

const billingContactSlice = createSlice({
  name: 'billingcontact',
  initialState,
  reducers: {
    setBillingContact: (state, action) => {
      state.billingContact = action.payload;
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
          state.billingContactData = action.payload;
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
      )
      .addCase(queryContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryContact.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.filteredData = action.payload;
      })
      .addCase(queryContact.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setBillingContact} = billingContactSlice.actions;
export default billingContactSlice?.reducer;
