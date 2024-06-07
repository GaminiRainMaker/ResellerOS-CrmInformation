/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ATTACHMENTDOCUMENT_API} from '../../services/attachmentDocument';

export const insertAttachmentDocument = createAsyncThunk(
  'AttachmentDocument',
  async (data: any, thunkApi) => {
    try {
      const res = await ATTACHMENTDOCUMENT_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getAllAttachmentDocument = createAsyncThunk(
  'AttachmentDocument/getAllAttachmentDocument',
  async (id: any, thunkApi) => {
    try {
      const res = await ATTACHMENTDOCUMENT_API.get(id);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  },
);
