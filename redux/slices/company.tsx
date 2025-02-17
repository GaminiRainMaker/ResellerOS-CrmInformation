/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertCompany,
  getAllCompany,
  updateCompanyById,
  deleteCompany,
  getCompanyByUserId,
} from '../actions/company';

type CompanyState = {
  loading: boolean;
  error: string | null;
  data: any;
  company: any;
};
const initialState: CompanyState = {
  loading: false,
  error: null,
  data: [],
  company: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertCompany.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertCompany.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompany.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCompany.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCompanyById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateCompanyById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCompany.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCompanyByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCompanyByUserId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.company = action.payload;
        },
      )
      .addCase(
        getCompanyByUserId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setCompany} = companySlice.actions;
export default companySlice?.reducer;
