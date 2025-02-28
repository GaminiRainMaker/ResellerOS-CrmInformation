/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertUpdateSyncTable,
  getAllSyncTable,
  deleteSyncTableRow,
} from '../actions/syncTable';

type SyncState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
};
const initialState: SyncState = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
};

const syncTableSlice = createSlice({
  name: 'syncTable',
  initialState,
  reducers: {
    setSyncTable: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertUpdateSyncTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertUpdateSyncTable.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertUpdateSyncTable.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllSyncTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSyncTable.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllSyncTable.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteSyncTableRow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSyncTableRow.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteSyncTableRow.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setSyncTable} = syncTableSlice.actions;
export default syncTableSlice?.reducer;
