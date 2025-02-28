import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {insertAttributeField} from '../actions/attributeField';
import {SignedRequest} from '../../types/salesforce';

type CanvasState = {
  loading: boolean;
  error: string | null;
  data: any;
  isCanvas: boolean;
  signedRequest: any;
  isDecryptedRecord: SignedRequest | null;
  navigationKey: string;
};
const initialState: CanvasState = {
  loading: false,
  isCanvas: false,
  error: null,
  data: {},
  signedRequest: {},
  isDecryptedRecord: null,
  navigationKey: '',
};

const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action) => {
      state.data = action.payload;
    },
    setIsCanvas: (state, action) => {
      state.isCanvas = action.payload;
    },
    setNewSignedRequest: (state, action) => {
      state.signedRequest = action.payload;
    },
    setDecryptedData: (state, action) => {
      state.isDecryptedRecord = action.payload;
    },
    setSalesforceNavigationKey: (state, action) => {
      state.navigationKey = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAttributeField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertAttributeField.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        insertAttributeField.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {
  setCanvas,
  setIsCanvas,
  setNewSignedRequest,
  setDecryptedData,
  setSalesforceNavigationKey,
} = CanvasSlice.actions;
export default CanvasSlice?.reducer;
