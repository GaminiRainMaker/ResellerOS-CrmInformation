/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {S3Client} from '@aws-sdk/client-s3';
import {Upload as Uploader} from '@aws-sdk/lib-storage';
import {UPLOAD_API} from '../../services/upload';

export const uploadToAws = createAsyncThunk(
  'upload/uploadDocument',
  async (data: any, thunkApi) => {
    try {
      const res = await UPLOAD_API.post(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const uploadExcelFileToAws = createAsyncThunk(
  'upload/uploadDocument',
  async (data: any, thunkApi) => {
    try {
      const res = await UPLOAD_API.uploadExcel(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const uploadToAwsForUserImage = createAsyncThunk(
  'upload/uploadImage',
  async (data: any, thunkApi) => {
    const {base64, type, file, userTypes, userIds} = data;
    try {
      if (type === 'video') {
        const config: any = {
          accessKeyId: process.env.ACCESS,
          secretAccessKey: process.env.SECRET,
          region: process.env.REGION,
        };

        const buffer = Buffer.from(
          base64.replace(/^data:video\/\w+;base64,/, ''),
          'base64',
        );

        const target = {
          Bucket: process.env.BUCKET,
          Key: file.name,
          Body: buffer,
        };
        const parallelUploadS3 = new Uploader({
          client: new S3Client({
            region: process.env.REGION,
            credentials: config,
          }),
          params: target,
          leavePartsOnError: false,
        });
        parallelUploadS3.on('httpUploadProgress', (progress: any) => {});
        const data2: any = await parallelUploadS3.done();
        return data2.Location;
      }
      if (type === 'pdf' || type === 'application') {
        const {data: data1} = await UPLOAD_API.post({
          document: base64,
        });
        // // const {data} = await API.BLACKWORKS.post(UPLOAD_DOCUMENT_TO_S3, {
        //   document: base64,
        // });
        return data1.Location;
      }
      if (type === 'image') {
        const obj = {
          image: base64,
          userType: userTypes,
          userId: userIds,
        };
        const {data: data3} = await UPLOAD_API.postIMage(obj);
        return data3.Location;
      }
      // return data.Location;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
