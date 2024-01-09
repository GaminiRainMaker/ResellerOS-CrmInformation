import {RcFile} from 'antd/es/upload';
import {Upload as Uploader} from '@aws-sdk/lib-storage';
import {S3Client, S3} from '@aws-sdk/client-s3';
import {UPLOAD_API} from '../../../services/upload';

const getBase64 = async (file: RcFile): Promise<string> =>
  // eslint-disable-next-line consistent-return
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      // eslint-disable-next-line no-promise-executor-return, no-return-assign
      return (reader.onload = () => resolve(reader.result as string));
    }
    reader.onerror = (error) => reject(error);
  });

// eslint-disable-next-line consistent-return
const uploadImage = async (base64: any, type: any, file: any) => {
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
      const data: any = await parallelUploadS3.done();
      return data.Location;
    }
    if (type === 'pdf' || type === 'application') {
      const {data} = await UPLOAD_API.post({
        document: base64,
      });
      console.log('4354354', data);
      // // const {data} = await API.BLACKWORKS.post(UPLOAD_DOCUMENT_TO_S3, {
      //   document: base64,
      // });
      return data.Location;
    }

    // return data.Location;
  } catch (error) {
    console.log(error);
  }
};

export {getBase64, uploadImage};
