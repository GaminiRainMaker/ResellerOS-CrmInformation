import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deletePartnerPassword,
  insertPartnerPassword,
  queryPartnerPassword,
  updatePartnerPasswordById,
} from '../actions/partnerPassword';

type PartnerPasswordState = {
  loading: boolean;
  error: string | null;
  data: any;
  partnerPassword: any;
  createPartnerPasswordData: any;
};
const initialState: PartnerPasswordState = {
  loading: false,
  error: null,
  data: [],
  partnerPassword: [],
  createPartnerPasswordData: {},
};

const partnerPasswordSlice = createSlice({
  name: 'partnerPassword',
  initialState,
  reducers: {
    setPartnerPassword: (state, action) => {
      state.partnerPassword = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertPartnerPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertPartnerPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.createPartnerPasswordData = action.payload;
        },
      )
      .addCase(
        insertPartnerPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryPartnerPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryPartnerPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryPartnerPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      .addCase(deletePartnerPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deletePartnerPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deletePartnerPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updatePartnerPasswordById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePartnerPasswordById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updatePartnerPasswordById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setPartnerPassword} = partnerPasswordSlice.actions;
export default partnerPasswordSlice?.reducer;
