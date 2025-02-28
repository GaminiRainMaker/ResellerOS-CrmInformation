import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteSharedPartnerPassword,
  getSharedPartnerPasswordForOrganization,
  insertSharedPartnerPassword,
  querySharedPartnerPassword,
  updateSharedPartnerPasswordById,
} from '../actions/sharedPartnerPassword';

type SharedPartnerPasswordState = {
  loading: boolean;
  error: string | null;
  data: any;
  sharedPartnerPassword: any;
};
const initialState: SharedPartnerPasswordState = {
  loading: false,
  error: null,
  data: [],
  sharedPartnerPassword: [],
};

const sharedPartnerPasswordSlice = createSlice({
  name: 'sharedPartnerPassword',
  initialState,
  reducers: {
    setSharedPartnerPassword: (state, action) => {
      state.sharedPartnerPassword = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertSharedPartnerPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertSharedPartnerPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        insertSharedPartnerPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(querySharedPartnerPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        querySharedPartnerPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        querySharedPartnerPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      .addCase(deleteSharedPartnerPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSharedPartnerPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteSharedPartnerPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateSharedPartnerPasswordById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSharedPartnerPasswordById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateSharedPartnerPasswordById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getSharedPartnerPasswordForOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSharedPartnerPasswordForOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getSharedPartnerPasswordForOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setSharedPartnerPassword} = sharedPartnerPasswordSlice.actions;
export default sharedPartnerPasswordSlice?.reducer;
