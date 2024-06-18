/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllQuotesWithCompletedAndDraft,
  getQuoteById,
  queryAllManualQuotes,
  getQuotesByDateFilter,
  insertQuote,
  updateQuoteById,
  updateQuoteByQuery,
  updateQuoteConcern,
  updateQuoteDraftById,
  updateQuoteWithNewlineItemAddByID,
  getAllQuotesByOrganization,
  getQuotesByExistingQuoteFilter,
} from '../actions/quote';

type QuoteState = {
  loading: boolean;
  quoteByIdLoading: boolean;
  error: string | null;
  data: any;
  quote: any;
  filteredByDate: any;
  quoteById: any;
  getAllQuotesDataByOrganization: any;
  getExistingQuoteFilterData: any;
};
const initialState: QuoteState = {
  loading: false,
  quoteByIdLoading: false,
  error: null,
  data: [],
  quote: [],
  quoteById: {},
  filteredByDate: [],
  getAllQuotesDataByOrganization: [],
  getExistingQuoteFilterData: [],
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
      .addCase(insertQuote.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertQuote.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllQuotesWithCompletedAndDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllQuotesWithCompletedAndDraft.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllQuotesWithCompletedAndDraft.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteById.pending, (state) => {
        state.quoteByIdLoading = true;
        state.error = null;
      })
      .addCase(getQuoteById.fulfilled, (state, action: PayloadAction<any>) => {
        state.quoteByIdLoading = false;
        state.quoteById = action.payload;
      })
      .addCase(getQuoteById.rejected, (state, action: PayloadAction<any>) => {
        state.quoteByIdLoading = false;
        state.error = action.payload;
      })
      .addCase(updateQuoteDraftById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteDraftById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateQuoteDraftById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteByQuery.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateQuoteByQuery.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteWithNewlineItemAddByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteWithNewlineItemAddByID.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        updateQuoteWithNewlineItemAddByID.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateQuoteById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuotesByDateFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuotesByDateFilter.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.filteredByDate = action.payload;
        },
      )
      .addCase(
        getQuotesByDateFilter.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryAllManualQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryAllManualQuotes.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryAllManualQuotes.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateQuoteConcern.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuoteConcern.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateQuoteConcern.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllQuotesByOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllQuotesByOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.getAllQuotesDataByOrganization = action.payload;
        },
      )
      .addCase(
        getAllQuotesByOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuotesByExistingQuoteFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuotesByExistingQuoteFilter.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.getExistingQuoteFilterData = action.payload;
        },
      )
      .addCase(
        getQuotesByExistingQuoteFilter.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setQuote} = quoteSlice.actions;
export default quoteSlice?.reducer;
