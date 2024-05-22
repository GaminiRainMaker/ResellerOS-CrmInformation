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
  cache: {
    isSubscribed: boolean;
    DealRegSeats: number;
    QuoteAISeats: number;
    TotalDealRegSeats: number;
    TotalQuoteSeats: number;
  };
};

const initialState: chacheFlowState = {
  loading: false,
  error: null,
  data: [],
  cache: {
    isSubscribed: false,
    DealRegSeats: 0,
    QuoteAISeats: 0,
    TotalDealRegSeats: 0,
    TotalQuoteSeats: 0,
  },
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCache: (state, action) => {
      state.cache = action.payload;
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

export const {setCache} = cacheSlice.actions;
export default cacheSlice?.reducer;
