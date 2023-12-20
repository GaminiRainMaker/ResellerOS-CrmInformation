/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertContract,
  getAllContract,
  updateContractById,
} from '../actions/contract';

type ContractState = {
  loading: boolean;
  error: string | null;
  data: any;
  contract: any;
};
const initialState: ContractState = {
  loading: false,
  error: null,
  data: [],
  contract: [],
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertContract.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(insertContract.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllContract.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getAllContract.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContractById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateContractById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateContractById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setContract} = contractSlice.actions;
export default contractSlice?.reducer;
