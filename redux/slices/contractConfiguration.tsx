/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getContractConfiguartion,
  insertUpdateContractConfiguartion,
} from '../actions/contractConfiguration';

type ContractConfigurationState = {
  loading: boolean;
  error: string | null;
  data: any;
  contractConfiguration: any;
};
const initialState: ContractConfigurationState = {
  loading: false,
  error: null,
  data: [],
  contractConfiguration: [],
};

const ContractConfigurationSlice = createSlice({
  name: 'contractConfiguration',
  initialState,
  reducers: {
    setContractConfiguration: (state, action) => {
      state.contractConfiguration = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertUpdateContractConfiguartion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertUpdateContractConfiguartion.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        insertUpdateContractConfiguartion.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getContractConfiguartion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getContractConfiguartion.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getContractConfiguartion.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setContractConfiguration} = ContractConfigurationSlice.actions;
export default ContractConfigurationSlice?.reducer;
