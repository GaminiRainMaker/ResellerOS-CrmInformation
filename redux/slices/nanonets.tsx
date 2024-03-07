/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteQuoteConfiguration,
  getAllNanonetsModel,
  insertQuoteConfiguration,
  updateNanonetsModel,
} from '../actions/nanonets';

type QuoteConfiguration = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
};
const initialState: QuoteConfiguration = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
};

const quoteConfigurationSetting = createSlice({
  name: 'quoteCOnfiguration',
  initialState,
  reducers: {
    setQuoteConfiguration: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteQuoteConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteQuoteConfiguration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        deleteQuoteConfiguration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllNanonetsModel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllNanonetsModel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllNanonetsModel.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(insertQuoteConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertQuoteConfiguration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertQuoteConfiguration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateNanonetsModel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateNanonetsModel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateNanonetsModel.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setQuoteConfiguration} = quoteConfigurationSetting.actions;
export default quoteConfigurationSetting?.reducer;
