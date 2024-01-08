/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertUpdateGeneralSetting,
  getAllGeneralSetting,
} from '../actions/generalSetting';

type GeneralSettingState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
};
const initialState: GeneralSettingState = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
};

const genralSettingSlice = createSlice({
  name: 'generalSetting',
  initialState,
  reducers: {
    setGeneralSetting: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertUpdateGeneralSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertUpdateGeneralSetting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertUpdateGeneralSetting.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllGeneralSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllGeneralSetting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllGeneralSetting.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setGeneralSetting} = genralSettingSlice.actions;
export default genralSettingSlice?.reducer;
