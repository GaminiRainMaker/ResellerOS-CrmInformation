/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllCacheFLowProposal,
  getCacheFLowProposalById,
} from '../actions/cacheFlow';

type chacheFlowState = {
  loading: boolean;
  error: string | null;
  data: any;
  cache: {
    isSubscribed: boolean;
    DealRegSeats: number;
    QuoteAISeats: number;
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
      .addCase(getAllCacheFLowProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCacheFLowProposal.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        getAllCacheFLowProposal.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getCacheFLowProposalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCacheFLowProposalById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getCacheFLowProposalById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setCache} = cacheSlice.actions;
export default cacheSlice?.reducer;
