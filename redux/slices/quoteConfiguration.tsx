/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertQuoteConfiguration,
  queryQuoteConfiguration,
  updateQuoteConfiguration,
  deleteQuoteConfiguration,getDistributorByOemId,getOemByDistributorId
} from '../actions/quoteConfiguration';

type QuoteConfigurationState = {
  loading: boolean;
  error: string | null;
  data: any;
  quoteConfiguration: any;
  distributorDataByOemId: any;
  oemDatByDistributorId: any;
};
const initialState: QuoteConfigurationState = {
  loading: false,
  error: null,
  data: [],
  quoteConfiguration: [],
  distributorDataByOemId: [],
  oemDatByDistributorId: [],
};

const quoteConfigurationSlice = createSlice({
  name: 'quoteConfiguration',
  initialState,
  reducers: {
    setQuoteConfiguration: (state, action) => {
      state.quoteConfiguration = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertQuoteConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertQuoteConfiguration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        insertQuoteConfiguration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteConfiguration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateQuoteConfiguration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteQuoteConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteQuoteConfiguration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteQuoteConfiguration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryQuoteConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryQuoteConfiguration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryQuoteConfiguration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getOemByDistributorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOemByDistributorId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.oemDatByDistributorId = action.payload;
        },
      )
      .addCase(
        getOemByDistributorId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getDistributorByOemId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDistributorByOemId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.distributorDataByOemId = action.payload;
        },
      )
      .addCase(
        getDistributorByOemId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
  },
});

export const {setQuoteConfiguration} = quoteConfigurationSlice.actions;
export default quoteConfigurationSlice?.reducer;
