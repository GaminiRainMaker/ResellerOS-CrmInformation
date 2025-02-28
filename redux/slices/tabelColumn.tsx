/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getAllTableColumn, updateTableColumnById} from '../actions/tableColumn';

type TableColumnState = {
  loading: boolean;
  error: string | null;
  data: any;
  tableCol: any;
};

const initialState: TableColumnState = {
  loading: false,
  error: null,
  data: [],
  tableCol: [],
};

const tableColumnSlice = createSlice({
  name: 'tableCol',
  initialState,
  reducers: {
    setTableColumn: (state, action) => {
      state.tableCol = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTableColumn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTableColumn.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllTableColumn.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateTableColumnById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTableColumnById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateTableColumnById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setTableColumn} = tableColumnSlice.actions;
export default tableColumnSlice?.reducer;
