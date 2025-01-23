/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  addAndUpdateScriptTimer,
  getAllGeneralSetting,
  getScriptTimer,
  insertUpdateGeneralSetting,
} from '../actions/generalSetting';

type GeneralSettingState = {
  loading: boolean;
  error: string | null;
  data: any;
  generalSetting: any;
  insertSetting: any;
};
const initialState: GeneralSettingState = {
  loading: false,
  error: null,
  data: [],
  generalSetting: [],
  insertSetting: [],
};

const genralSettingSlice = createSlice({
  name: 'generalSetting',
  initialState,
  reducers: {
    setGeneralSetting: (state, action) => {
      state.generalSetting = action.payload;
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
          state.insertSetting = action.payload;
        },
      )
      .addCase(
        insertUpdateGeneralSetting.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(addAndUpdateScriptTimer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAndUpdateScriptTimer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.insertSetting = action.payload;
        },
      )
      .addCase(
        addAndUpdateScriptTimer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getScriptTimer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getScriptTimer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.insertSetting = action.payload;
        },
      )
      .addCase(getScriptTimer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
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
