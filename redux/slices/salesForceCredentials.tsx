import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  addSalesForceCredentials,
  deleteSalesForceCredentials,
  queryAddSalesForceCredentials,
  updateSalesForceCredentialsId,
  updateSalesForceSSOLogin,
} from '../actions/salesForceCredentials';

type SalesForceCredentials = {
  loading: boolean;
  error: string | null;
  data: any;
  salesForceCredentials: any;
};
const initialState: SalesForceCredentials = {
  loading: false,
  error: null,
  data: [],
  salesForceCredentials: [],
};

const SalesForceCredentialsSlice = createSlice({
  name: 'salesForceCredentials',
  initialState,
  reducers: {
    setsalesForceCredentials: (state, action) => {
      state.salesForceCredentials = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addSalesForceCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addSalesForceCredentials.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          //   state.data = action.payload;
        },
      )
      .addCase(
        addSalesForceCredentials.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryAddSalesForceCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryAddSalesForceCredentials.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        queryAddSalesForceCredentials.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      .addCase(deleteSalesForceCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSalesForceCredentials.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteSalesForceCredentials.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateSalesForceCredentialsId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSalesForceCredentialsId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          //   state.data = action.payload;
        },
      )
      .addCase(
        updateSalesForceCredentialsId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateSalesForceSSOLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSalesForceSSOLogin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          //   state.data = action.payload;
        },
      )
      .addCase(
        updateSalesForceSSOLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setsalesForceCredentials} = SalesForceCredentialsSlice.actions;
export default SalesForceCredentialsSlice?.reducer;
