/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertUpdateContractSetting,
  getAllContractSetting,
} from '../actions/contractSetting';

type ContractSettingState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
};
const initialState: ContractSettingState = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
};

const ContractSettingSlice = createSlice({
  name: 'contractSetting',
  initialState,
  reducers: {
    setGeneralSetting: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertUpdateContractSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertUpdateContractSetting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertUpdateContractSetting.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllContractSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllContractSetting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllContractSetting.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setGeneralSetting} = ContractSettingSlice.actions;
export default ContractSettingSlice?.reducer;
