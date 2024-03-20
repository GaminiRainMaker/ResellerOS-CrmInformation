/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  DeleteQuoteLineItemById,
  UpdateQuoteLineItemQuantityById,
  getQuoteLineItem,
  getQuoteLineItemById,
  getQuoteLineItemByQuoteId,
  getQuoteLineItemByQuoteIdandBundleIdNull,
  insertQuoteLineItem,
  updateQuoteLineItemForBundleId,
  updateQuoteLineItemById,
} from '../actions/quotelineitem';

type QuoteLineItemState = {
  loading: boolean;
  error: string | null;
  data: any;
  quoteLineItem: any;
  quoteLineItemByQuoteID: any;
  concernQuoteLineItemData: any;
};
const initialState: QuoteLineItemState = {
  loading: false,
  error: null,
  data: [],
  quoteLineItem: [],
  quoteLineItemByQuoteID: [],
  concernQuoteLineItemData: [],
};

const quoteLineItemSlice = createSlice({
  name: 'quoteLineItems',
  initialState,
  reducers: {
    setQuoteLineItem: (state, action) => {
      state.quoteLineItem = action.payload;
    },
    setConcernQuoteLineItemData: (state, action) => {
      state.concernQuoteLineItemData = action.payload;
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
      .addCase(DeleteQuoteLineItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        DeleteQuoteLineItemById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        DeleteQuoteLineItemById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteLineItemByQuoteId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteLineItemByQuoteId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.quoteLineItemByQuoteID = action.payload;
        },
      )
      .addCase(
        getQuoteLineItemByQuoteId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteLineItemForBundleId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteLineItemForBundleId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.quoteLineItemByQuoteID = action.payload;
        },
      )
      .addCase(
        updateQuoteLineItemForBundleId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteLineItemByQuoteIdandBundleIdNull.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteLineItemByQuoteIdandBundleIdNull.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        getQuoteLineItemByQuoteIdandBundleIdNull.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteLineItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteLineItemById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateQuoteLineItemById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setQuoteLineItem, setConcernQuoteLineItemData} =
  quoteLineItemSlice.actions;
export default quoteLineItemSlice?.reducer;
