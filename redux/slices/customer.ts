/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteCustomers,
  getAllCustomer,
  getAllDeletedCustomer,
  getCustomerBYId,
  insertCustomer,
  queryCustomer,
  searchCustomer,
  updateCustomer,
  getCustomerProfileById,
} from '../actions/customer';

type CustomerState = {
  loading: boolean;
  error: string | null;
  data: any;
  customer: any;
  filteredData: any;
  customerProfileByIdData: any;
  customerProfile: string;
  customerDataById: any;
};
const initialState: CustomerState = {
  loading: false,
  error: null,
  data: [],
  customer: [],
  filteredData: [],
  customerProfileByIdData: {},
  customerProfile: '',
  customerDataById: {},
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setCustomerProfile: (state, action) => {
      state.customerProfile = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.customer = action.payload;
        },
      )
      .addCase(insertCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getAllCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllDeletedCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDeletedCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllDeletedCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCustomers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteCustomers.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(updateCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(searchCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(queryCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredData = action.payload;
      })
      .addCase(queryCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCustomerBYId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerBYId.fulfilled, (state, action) => {
        state.loading = false;
        state.customerDataById = action.payload;
      })
      .addCase(
        getCustomerBYId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getCustomerProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.customerProfileByIdData = action.payload;
      })
      .addCase(
        getCustomerProfileById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setCustomer, setCustomerProfile} = customerSlice.actions;
export default customerSlice?.reducer;
