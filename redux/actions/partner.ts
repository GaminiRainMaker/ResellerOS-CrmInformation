/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PARTNER_API} from '../../services/partner';

export const insertPartner = createAsyncThunk(
  'partner/insertPartner',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllPartner = createAsyncThunk(
  'partner/getAllPartner',
  async (data, thunkApi) => {
    try {
      const res = await PARTNER_API.get();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getAllPartnerTemp = createAsyncThunk(
  'partner/getAllPartnerTemp',
  async (data, thunkApi) => {
    try {
      const res = await PARTNER_API.getAllPartnerTemp();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const deletePartner = createAsyncThunk(
  'partner/deletePartner',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.deleteById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const updatePartnerById = createAsyncThunk(
  'partner/updatePartnerById',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.updatePartnerById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getAllPartnerandProgram = createAsyncThunk(
  'partner/getAllPartnerandProgram',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.getAllPartnerandProgram();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerandProgramFilterData = createAsyncThunk(
  'partner/getAllPartnerandProgramFilterData',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.filterData(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerandProgramFilterDataForAdmin = createAsyncThunk(
  'partner/getAllPartnerandProgramFilterDataForAdmin',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.filterDataAdmin(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerandProgramApprovedForOrganization = createAsyncThunk(
  'partner/getAllPartnerandProgramApprovedForOrganization',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.approvedForOrg(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerandProgramApprovedForOrganizationSalesForce =
  createAsyncThunk(
    'partner/getAllPartnerandProgramApprovedForOrganizationSalesForce',
    async (data: any, thunkApi) => {
      try {
        const res = await PARTNER_API.ApprovedForOrgSalesForce(data);
        return res.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error?.message);
      }
    },
  );
export const getPartnerCanAddedToOrganization = createAsyncThunk(
  'partner/getPartnerCanAddedToOrganization',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.CanAddedToOrg(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerandProgramFilterDataForOrganizationOnly =
  createAsyncThunk(
    'partner/getAllPartnerandProgramFilterDataForOrganizationOnly',
    async (data: any, thunkApi) => {
      try {
        const res =
          await PARTNER_API.getAllPartnerandProgramFilterDataForOrganizationOnly(
            data,
          );
        return res.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error?.message);
      }
    },
  );
export const upadteRequestForOrgNewPartnerApproval = createAsyncThunk(
  'partner/upadteRequestForOrgNewPartnerApproval',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.upadteRequestForOrgNewPartnerApproval(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerById = createAsyncThunk(
  'partner/getAllPartnerById',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.getAllPartnerById(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
export const getAllPartnerandProgramApprovedDataSalesForce = createAsyncThunk(
  'partner/getAllPartnerandProgramApprovedDataSalesForce',
  async (data: any, thunkApi) => {
    try {
      const res =
        await PARTNER_API.getAllPartnerandProgramApprovedDataSalesForce();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const getAllApprovedPartnerForQuoteConfiq = createAsyncThunk(
  'partner/getAllApprovedPartnerForQuoteConfiq',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.getAllApprovedPartnerForQuoteConfiq(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);

export const createOrUpdateMasterPartner = createAsyncThunk(
  'partner/createOrUpdateMasterPartner',
  async (data: any, thunkApi) => {
    try {
      const res = await PARTNER_API.createOrUpdateMasterPartner(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
