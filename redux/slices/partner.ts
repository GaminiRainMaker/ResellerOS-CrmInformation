/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deletePartner,
  getAllPartnerTemp,
  insertPartner,
  updatePartnerById,
  getAllPartner,
  getAllPartnerandProgram,
} from '../actions/partner';

type PartnerState = {
  loading: boolean;
  insertPartnerLoading: boolean;
  error: string | null;
  data: any;
  partner: any;
  partnerRequestData: any;
};
const initialState: PartnerState = {
  loading: false,
  insertPartnerLoading: false,
  error: null,
  data: [],
  partner: [],
  partnerRequestData: {},
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartner: (state, action) => {
      state.partner = action.payload;
    },
    setPartnerRequestData: (state, action) => {
      state.partnerRequestData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertPartner.pending, (state) => {
        state.insertPartnerLoading = true;
        state.error = null;
      })
      .addCase(insertPartner.fulfilled, (state, action: PayloadAction<any>) => {
        state.insertPartnerLoading = false;
        state.data = [action.payload];
      })
      .addCase(insertPartner.rejected, (state, action: PayloadAction<any>) => {
        state.insertPartnerLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPartner.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPartnerTemp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartnerTemp.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllPartnerTemp.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePartner.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deletePartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePartnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePartnerById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updatePartnerById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllPartnerandProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartnerandProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setPartner, setPartnerRequestData} = partnerSlice.actions;
export default partnerSlice?.reducer;
