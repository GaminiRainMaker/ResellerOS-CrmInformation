/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllContractProduct,
  insertContractProduct,
  getContractProductByProductCode,
  deleteContractProduct,getContractProductByContractVehicle
} from '../actions/contractProduct';

type ContractProductState = {
  loading: boolean;
  error: string | null;
  data: any;
  contractProduct: any;
};
const initialState: ContractProductState = {
  loading: false,
  error: null,
  data: [],
  contractProduct: [],
};

const contractProductSlice = createSlice({
  name: 'contractProduct',
  initialState,
  reducers: {
    setContractProduct: (state, action) => {
      state.contractProduct = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertContractProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertContractProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertContractProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllContractProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllContractProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllContractProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getContractProductByProductCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getContractProductByProductCode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getContractProductByProductCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteContractProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteContractProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteContractProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getContractProductByContractVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getContractProductByContractVehicle.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getContractProductByContractVehicle.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setContractProduct} = contractProductSlice.actions;
export default contractProductSlice?.reducer;
