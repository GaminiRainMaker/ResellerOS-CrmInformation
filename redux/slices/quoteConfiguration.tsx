/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertQuoteConfiguration,
  queryQuoteConfiguration,
  updateQuoteConfiguration,
  deleteQuoteConfiguration,
} from '../actions/quoteConfiguration';

type QuoteConfigurationState = {
  loading: boolean;
  error: string | null;
  data: any;
  quoteConfiguration: any;
};
const initialState: QuoteConfigurationState = {
  loading: false,
  error: null,
  data: [],
  quoteConfiguration: [],
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
      );
  },
});

export const {setQuoteConfiguration} = quoteConfigurationSlice.actions;
export default quoteConfigurationSlice?.reducer;
