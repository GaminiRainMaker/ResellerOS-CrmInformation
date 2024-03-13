/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertOpportunity,
  getAllOpportunity,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  getdeleteOpportunity,
  queryOpportunity,
} from '../actions/opportunity';

type OpportunityState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
  deletedCount?: any;
};
const initialState: OpportunityState = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
  deletedCount: null,
};

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  reducers: {
    setOpportunity: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertOpportunity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = [action.payload];
        },
      )
      .addCase(
        insertOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllOpportunity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getOpportunityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOpportunityById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        getOpportunityById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOpportunity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteOpportunity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        deleteOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getdeleteOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getdeleteOpportunity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.deletedCount = action.payload;
        },
      )
      .addCase(
        getdeleteOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryOpportunity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setOpportunity} = opportunitySlice.actions;
export default opportunitySlice?.reducer;
