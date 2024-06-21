/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getProfitabilityByQuoteId,
  updateProfitabilityById,
  insertProfitability,
  deleteProfitabilityById,
  updateProfitabilityValueForBulk,
} from '../actions/profitability';

type ProfitabilityState = {
  loading: boolean;
  error: string | null;
  data: any;
  profitability: any;
  profitabilityBulkUpdate: any;
  isProfitabilityCall: boolean;
};
const initialState: ProfitabilityState = {
  loading: false,
  error: null,
  data: [],
  profitabilityBulkUpdate: [],
  profitability: [],
  isProfitabilityCall: false,
};

const profitabilitySlice = createSlice({
  name: 'profitability',
  initialState,
  reducers: {
    setProfitability: (state, action) => {
      state.profitability = action.payload;
    },
    setIsProfitabilityCall: (state, action) => {
      state.isProfitabilityCall = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertProfitability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertProfitability.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertProfitability.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getProfitabilityByQuoteId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfitabilityByQuoteId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getProfitabilityByQuoteId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateProfitabilityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfitabilityById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateProfitabilityById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteProfitabilityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProfitabilityById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteProfitabilityById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateProfitabilityValueForBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfitabilityValueForBulk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.profitabilityBulkUpdate = action.payload;
        },
      )
      .addCase(
        updateProfitabilityValueForBulk.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setProfitability, setIsProfitabilityCall} =
  profitabilitySlice.actions;
export default profitabilitySlice?.reducer;
