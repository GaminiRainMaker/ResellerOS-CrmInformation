import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteLineItemSyncings,
  getLineItemSyncingBYId,
  insertLineItemSyncing,
  insertLineItemSyncingForSalesForce,
  queryLineItemSyncing,
  queryLineItemSyncingForSalesForce,
  updateLineItemSyncing,
} from '../actions/LineItemSyncing';

type LineItemSyncing = {
  loading: boolean;
  error: string | null;
  data: any;
  lineItemSyncing: any;
};

const initialState: LineItemSyncing = {
  loading: false,
  error: null,
  data: [],
  lineItemSyncing: {},
};

const LineItemSyncingSlice = createSlice({
  name: 'LineItemSyncing',
  initialState,
  reducers: {
    setLineItemSyncing: (state, action) => {
      state.lineItemSyncing = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertLineItemSyncing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertLineItemSyncing.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lineItemSyncing = action.payload;
        },
      )
      .addCase(
        insertLineItemSyncing.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getLineItemSyncingBYId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getLineItemSyncingBYId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lineItemSyncing = action.payload;
        },
      )
      .addCase(
        getLineItemSyncingBYId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateLineItemSyncing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateLineItemSyncing.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lineItemSyncing = action.payload;
        },
      )
      .addCase(
        updateLineItemSyncing.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryLineItemSyncing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryLineItemSyncing.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryLineItemSyncing.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteLineItemSyncings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteLineItemSyncings.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lineItemSyncing = action.payload;
        },
      )
      .addCase(
        deleteLineItemSyncings.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryLineItemSyncingForSalesForce.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryLineItemSyncingForSalesForce.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lineItemSyncing = action.payload;
        },
      )
      .addCase(
        queryLineItemSyncingForSalesForce.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(insertLineItemSyncingForSalesForce.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertLineItemSyncingForSalesForce.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.lineItemSyncing = action.payload;
        },
      )
      .addCase(
        insertLineItemSyncingForSalesForce.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setLineItemSyncing} = LineItemSyncingSlice.actions;
export default LineItemSyncingSlice?.reducer;
