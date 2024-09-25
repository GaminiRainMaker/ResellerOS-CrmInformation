/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllDealReg,
  getDealRegById,
  getDealRegByOpportunityId,
  getDealRegByPartnerProgramId,
  insertDealReg,
  updateDealRegById,
  queryDealReg,
  updateDealRegStatus,
  dealRegFormScript,
} from '../actions/dealReg';

type DealRegState = {
  loading: boolean;
  error: string | null;
  data: any;
  dealReg: any;
  dealRegUpdateData: any;
  submitDealRegData: boolean;
  getDealRegForNew: any;
  getDealRegForNewLoading: boolean;
  finalUpdatedDealRegData: any;
  openDealRegDrawer: boolean;
};
const initialState: DealRegState = {
  loading: false,
  error: null,
  data: [],
  dealReg: {},
  dealRegUpdateData: {},
  submitDealRegData: false,
  getDealRegForNew: {},
  getDealRegForNewLoading: false,
  finalUpdatedDealRegData: [],
  openDealRegDrawer: false,
};

const dealRegSlice = createSlice({
  name: 'dealReg',
  initialState,
  reducers: {
    setDealReg: (state, action) => {
      state.dealReg = action.payload;
    },
    setSubmitDealRegData: (state, action) => {
      state.submitDealRegData = action.payload;
    },
    setDealRegUpdateData: (state, action) => {
      state.dealRegUpdateData = action.payload;
    },
    setDealRegForNew: (state, action) => {
      state.getDealRegForNew = action.payload;
    },
    setFinalUpdatedDealRegData: (state, action) => {
      state.finalUpdatedDealRegData = action.payload;
    },
    setOpenDealRegDrawer: (state, action) => {
      state.openDealRegDrawer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertDealReg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDealReg.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(insertDealReg.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDealRegById.pending, (state) => {
        state.getDealRegForNewLoading = true;
        state.error = null;
      })
      .addCase(
        getDealRegById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getDealRegForNewLoading = false;
          state.getDealRegForNew = action.payload;
        },
      )
      .addCase(getDealRegById.rejected, (state, action: PayloadAction<any>) => {
        state.getDealRegForNewLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllDealReg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDealReg.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllDealReg.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(queryDealReg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryDealReg.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(queryDealReg.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDealRegById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDealRegById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        updateDealRegById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getDealRegByOpportunityId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDealRegByOpportunityId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getDealRegByOpportunityId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getDealRegByPartnerProgramId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDealRegByPartnerProgramId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getDealRegByPartnerProgramId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateDealRegStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDealRegStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      )
      .addCase(
        updateDealRegStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(dealRegFormScript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        dealRegFormScript.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      )
      .addCase(
        dealRegFormScript.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {
  setDealReg,
  setDealRegUpdateData,
  setSubmitDealRegData,
  setDealRegForNew,
  setFinalUpdatedDealRegData,
  setOpenDealRegDrawer,
} = dealRegSlice.actions;
export default dealRegSlice?.reducer;
