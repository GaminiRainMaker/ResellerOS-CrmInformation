/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllCacheFLowProposal,
  getCacheFLowProposalById,
  getSubscriptionDetails,
} from '../actions/cacheFlow';

type chacheFlowState = {
  loading: boolean;
  error: string | null;
  data: any;
  cache: any;
};

const initialState: chacheFlowState = {
  loading: false,
  error: null,
  data: [],
  cache: [],
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
      )
      .addCase(getSubscriptionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubscriptionDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getSubscriptionDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setCache} = cacheSlice.actions;
export default cacheSlice?.reducer;
