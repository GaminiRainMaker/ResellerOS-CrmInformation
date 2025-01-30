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
  getAllPartnerandProgramFilterData,
  getAllPartnerandProgramFilterDataForAdmin,
  getAllPartnerandProgramApprovedForOrganization,
  getPartnerCanAddedToOrganization,
  getAllPartnerandProgramFilterDataForOrganizationOnly,
  upadteRequestForOrgNewPartnerApproval,
  getAllPartnerandProgramApprovedForOrganizationSalesForce,
  getAllPartnerById,
  getAllApprovedPartnerForQuoteConfiq,
  getAllPartnerandProgramApprovedDataSalesForce,
  createOrUpdateMasterPartner,
} from '../actions/partner';

type PartnerState = {
  loading: boolean;
  insertPartnerLoading: boolean;
  insertPartnerData: any;
  error: string | null;
  data: any;
  setGetAllPartnerandProgramFilterDataForAdmin: any;
  partner: any;
  partnerRequestData: any;
  AllPartnerandProgramFilterData: any;
  allPartnersById: any;
};
const initialState: PartnerState = {
  loading: false,
  insertPartnerLoading: false,
  insertPartnerData: {},
  error: null,
  data: [],
  setGetAllPartnerandProgramFilterDataForAdmin: [],
  partner: [],
  partnerRequestData: {},
  AllPartnerandProgramFilterData: [],
  allPartnersById: [],
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
        state.insertPartnerData = action.payload;
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
      )
      .addCase(getAllPartnerandProgramFilterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartnerandProgramFilterData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramFilterData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllPartnerandProgramFilterDataForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartnerandProgramFilterDataForAdmin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.setGetAllPartnerandProgramFilterDataForAdmin = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramFilterDataForAdmin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedForOrganization.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedForOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedForOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedForOrganizationSalesForce.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedForOrganizationSalesForce.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedForOrganizationSalesForce.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getPartnerCanAddedToOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPartnerCanAddedToOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getPartnerCanAddedToOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramFilterDataForOrganizationOnly.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addCase(
        getAllPartnerandProgramFilterDataForOrganizationOnly.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.AllPartnerandProgramFilterData = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramFilterDataForOrganizationOnly.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(upadteRequestForOrgNewPartnerApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        upadteRequestForOrgNewPartnerApproval.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.AllPartnerandProgramFilterData = action.payload;
        },
      )
      .addCase(
        upadteRequestForOrgNewPartnerApproval.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllPartnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartnerById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.allPartnersById = action.payload;
        },
      )
      .addCase(
        getAllPartnerById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllApprovedPartnerForQuoteConfiq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllApprovedPartnerForQuoteConfiq.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.allPartnersById = action.payload;
        },
      )
      .addCase(
        getAllApprovedPartnerForQuoteConfiq.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedDataSalesForce.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedDataSalesForce.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.allPartnersById = action.payload;
        },
      )
      .addCase(
        getAllPartnerandProgramApprovedDataSalesForce.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(createOrUpdateMasterPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrUpdateMasterPartner.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.allPartnersById = action.payload;
        },
      )
      .addCase(
        createOrUpdateMasterPartner.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setPartner, setPartnerRequestData} = partnerSlice.actions;
export default partnerSlice?.reducer;
