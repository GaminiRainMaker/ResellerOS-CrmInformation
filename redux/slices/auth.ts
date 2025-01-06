/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  addSalesForceDataa,
  addSalesForceDataaForAccount,
  contactSales,
  fetchAndParseExcel,
  getExcelData,
  getPDFFileData,
  getPDFFileDataByAzureForSales,
  getSalesForceDataaForEditAsItIs,
  getSalesForceFields,
  getSalesForceFileData,
  runSalesForceBot,
  sendForgotPasswordEmail,
  sendNewUserEmail,
  sendPartnerRequestEmail,
  signUpAuth,
  verifyAuth,
} from '../actions/auth';

type AuthState = {
  loading: boolean;
  error: string | null;
  data: any;
  address: any;
};
const initialState: AuthState = {
  loading: false,
  error: null,
  data: [],
  address: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.address = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(signUpAuth.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendNewUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendNewUserEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        sendNewUserEmail.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(sendPartnerRequestEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendPartnerRequestEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        sendPartnerRequestEmail.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendForgotPasswordEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        sendForgotPasswordEmail.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(contactSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactSales.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(contactSales.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSalesForceFileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSalesForceFileData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        getSalesForceFileData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getSalesForceDataaForEditAsItIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSalesForceDataaForEditAsItIs.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        getSalesForceDataaForEditAsItIs.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(addSalesForceDataa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addSalesForceDataa.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        addSalesForceDataa.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(runSalesForceBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        runSalesForceBot.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        runSalesForceBot.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getSalesForceFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSalesForceFields.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        getSalesForceFields.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(addSalesForceDataaForAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addSalesForceDataaForAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        addSalesForceDataaForAccount.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getExcelData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExcelData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(getExcelData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPDFFileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPDFFileData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(getPDFFileData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAndParseExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAndParseExcel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        fetchAndParseExcel.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getPDFFileDataByAzureForSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPDFFileDataByAzureForSales.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        getPDFFileDataByAzureForSales.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setAuth} = authSlice.actions;
export default authSlice?.reducer;
