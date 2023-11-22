/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {createSlice} from '@reduxjs/toolkit';
import {insertQuote, getQuoteById, getQuote} from '../actions/quote';

type QuoteState = {
  loading: boolean;
  error: string | null | any;
  data: any;
  quote: any;
};
const initialState: QuoteState = {
  loading: false,
  error: null,
  data: [],
  quote: [],
};

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(insertQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getQuoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getQuoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setQuote} = quoteSlice.actions;
export default quoteSlice?.reducer;
