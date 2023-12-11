/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  DeleteQuoteLineItemQuantityById,
  UpdateQuoteLineItemQuantityById,
  getQuoteLineItem,
  getQuoteLineItemById,
  insertQuoteLineItem,
} from '../actions/quotelineitem';

type QuoteLineItemState = {
  loading: boolean;
  error: string | null;
  data: any;
  quoteLineItem: any;
};
const initialState: QuoteLineItemState = {
  loading: false,
  error: null,
  data: [],
  quoteLineItem: [],
};

const quoteLineItemSlice = createSlice({
  name: 'quoteLineItems',
  initialState,
  reducers: {
    setQuoteLineItem: (state, action) => {
      state.quoteLineItem = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertQuoteLineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertQuoteLineItem.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertQuoteLineItem.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteLineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteLineItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getQuoteLineItem.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteLineItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteLineItemById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getQuoteLineItemById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(UpdateQuoteLineItemQuantityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        UpdateQuoteLineItemQuantityById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        UpdateQuoteLineItemQuantityById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(DeleteQuoteLineItemQuantityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        DeleteQuoteLineItemQuantityById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        DeleteQuoteLineItemQuantityById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setQuoteLineItem} = quoteLineItemSlice.actions;
export default quoteLineItemSlice?.reducer;
