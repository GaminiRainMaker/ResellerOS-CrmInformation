/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getRebateQuoteLineItemByQuoteId,
  insertRebateQuoteLineItem,
  updateRebateQuoteLineItemById,
} from '../actions/rebateQuoteLineitem';

type RebateQuoteLineItemState = {
  loading: boolean;
  error: string | null;
  data: any;
  rebateQuoteLine: any;
};
const initialState: RebateQuoteLineItemState = {
  loading: false,
  error: null,
  data: [],
  rebateQuoteLine: [],
};

const rebateQuoteLineItemSlice = createSlice({
  name: 'rebateQuoteLineItem',
  initialState,
  reducers: {
    setRebateQuoteLineItem: (state, action) => {
      state.rebateQuoteLine = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertRebateQuoteLineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertRebateQuoteLineItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertRebateQuoteLineItem.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getRebateQuoteLineItemByQuoteId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRebateQuoteLineItemByQuoteId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getRebateQuoteLineItemByQuoteId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateRebateQuoteLineItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateRebateQuoteLineItemById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateRebateQuoteLineItemById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setRebateQuoteLineItem} = rebateQuoteLineItemSlice.actions;
export default rebateQuoteLineItemSlice?.reducer;
