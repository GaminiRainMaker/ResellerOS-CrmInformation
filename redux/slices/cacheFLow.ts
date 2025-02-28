/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllCustomerOfCacheFlow,
  getSubsvriptionForCustomer,
  getProposalForSubscription,
} from '../actions/cacheFlow';

type chacheFlowState = {
  loading: boolean;
  error: string | null;
  data: any;
  cacheAvailableSeats: {
    DealRegSeats: number;
    QuoteAISeats: number;
  };
  cacheTotalQuoteSeats: {
    TotalQuoteSeats: number;
  };
  cacheTotalDealRegSeats: {
    TotalDealRegSeats: number;
  };
  isSubscribed: boolean;
};

const initialState: chacheFlowState = {
  loading: false,
  error: null,
  data: [],
  cacheAvailableSeats: {
    DealRegSeats: 0,
    QuoteAISeats: 0,
  },
  cacheTotalQuoteSeats: {
    TotalQuoteSeats: 0,
  },
  cacheTotalDealRegSeats: {
    TotalDealRegSeats: 0,
  },
  isSubscribed: false,
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCacheAvailableSeats: (state, action) => {
      state.cacheAvailableSeats = action.payload;
    },
    setCacheTotalQuoteSeats: (state, action) => {
      state.cacheTotalQuoteSeats = action.payload;
    },
    setCacheTotalDealRegSeats: (state, action) => {
      state.cacheTotalDealRegSeats = action.payload;
    },
    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCustomerOfCacheFlow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCustomerOfCacheFlow.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        getAllCustomerOfCacheFlow.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getSubsvriptionForCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubsvriptionForCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getSubsvriptionForCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getProposalForSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProposalForSubscription.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getProposalForSubscription.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {
  setCacheAvailableSeats,
  setCacheTotalDealRegSeats,
  setCacheTotalQuoteSeats,
  setIsSubscribed,
} = cacheSlice.actions;
export default cacheSlice?.reducer;
