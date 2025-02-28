/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertAttachmentDocument,
  getAllAttachmentDocument,
  deleteAttachDocumentById,
} from '../actions/attachmentDocument';

type AttachmentDocumentState = {
  loading: boolean;
  error: string | null;
  data: any;
  attachmentDocument: any;
  attachment: any;
};
const initialState: AttachmentDocumentState = {
  loading: false,
  error: null,
  data: [],
  attachmentDocument: [],
  attachment: [],
};

const attachmentDocumentSlice = createSlice({
  name: 'attachmentDocument',
  initialState,
  reducers: {
    setAttachmentDocument: (state, action) => {
      state.attachment = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAttachmentDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertAttachmentDocument.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.attachmentDocument = action.payload;
        },
      )
      .addCase(
        insertAttachmentDocument.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllAttachmentDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAttachmentDocument.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllAttachmentDocument.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteAttachDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAttachDocumentById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.attachmentDocument = action.payload;
        },
      )
      .addCase(
        deleteAttachDocumentById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setAttachmentDocument} = attachmentDocumentSlice.actions;
export default attachmentDocumentSlice?.reducer;
