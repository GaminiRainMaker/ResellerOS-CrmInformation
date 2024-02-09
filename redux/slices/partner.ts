/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deletePartner,
  getAllPartner,
  insertPartner,
  updatePartnerById,
} from '../actions/partner';

type PartnerState = {
  loading: boolean;
  error: string | null;
  data: any;
  partner: any;
};
const initialState: PartnerState = {
  loading: false,
  error: null,
  data: [],
  partner: [],
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartner: (state, action) => {
      state.partner = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPartner.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertPartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
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
      );
  },
});

export const {setPartner} = partnerSlice.actions;
export default partnerSlice?.reducer;
