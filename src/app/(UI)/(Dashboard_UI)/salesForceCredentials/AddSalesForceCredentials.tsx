import {Button} from '@/app/components/common/antd/Button';
import {Card} from '@/app/components/common/antd/Card';
import {Upload} from '@/app/components/common/antd/Upload';
import {FileTextOutlined, UploadOutlined} from '@ant-design/icons';
import {message} from 'antd';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Papa from 'papaparse';
import {useAppDispatch} from '../../../../../redux/hook';
import {
  addSalesForceCredentials,
  queryAddSalesForceCredentials,
} from '../../../../../redux/actions/salesForceCredentials';
import {convertFileToBase64} from '@/app/utils/base';
import {uploadExcelFileToAws} from '../../../../../redux/actions/upload';
import {masterPartnerFetchAndParseExcel} from '../../../../../redux/actions/auth';
import {createOrUpdateMasterPartner} from '../../../../../redux/actions/partner';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';

export interface AddSalesForceCredentialsRef {
  uploadToDatabase: () => Promise<void>;
}

interface CsvRecord {
  saleforce_org_Id?: string;
  [key: string]: any;
}

interface Props {
  setShowAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMasterPartnerUpload?: boolean;
}

const AddSalesForceCredentials = forwardRef<AddSalesForceCredentialsRef, Props>(
  (props, ref) => {
    const [token] = useThemeToken();
    const {setShowAddUserModal, isMasterPartnerUpload} = props;
    const [fileData, setFileData] = useState<CsvRecord[]>([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const dispatch = useAppDispatch();
    const [dataUploadLoading, setDataUploadLoading] = useState<boolean>(false);

    const handleFileUpload = async (file: File) => {
      setDataUploadLoading(true);
      // Validate file type based on isMasterPartnerUpload
      if (!file.name.endsWith('.csv')) {
        message.error(
          'Only .csv files are accepted for salesforce credentials upload.',
        );
        setDataUploadLoading(false);
        return false; // Prevent file upload
      }

      setFileName(file.name); // Store the file name

      // if (!isMasterPartnerUpload) {
      //   try {
      //     const base64String = await convertFileToBase64(file);
      //     if (!base64String)
      //       throw new Error('Failed to convert file to base64');

      //     const response = await dispatch(
      //       uploadExcelFileToAws({document: base64String}),
      //     );
      //     const fileUrl = response?.payload; // Extract the file URL from the dispatched action

      //     if (!fileUrl)
      //       throw new Error('File upload failed or URL not returned');

      //     const masterDataResponse = await dispatch(
      //       masterPartnerFetchAndParseExcel({Url: fileUrl?.data}),
      //     );
      //     const finalMasterData = masterDataResponse?.payload; // Extract parsed data

      //     setFileData(finalMasterData);
      //     message.success(
      //       `${file.name} file uploaded and processed successfully.`,
      //     );
      //     setDataUploadLoading(false);
      //   } catch (error: any) {
      //     setDataUploadLoading(false);
      //     console.error(
      //       'Error processing master partner upload:',
      //       error.message,
      //     );
      //     message.error(`Error processing file: ${error.message}`);
      //   }
      // } else {

      Papa.parse(file, {
        header: true,
        complete: function (results: Papa.ParseResult<CsvRecord>) {
          if (isMasterPartnerUpload) {
            if (results?.data.length > 0) {
              setFileData(results?.data);
              message.success(`${file.name} file uploaded successfully.`);
              setUploadSuccess(true);
            } else {
              message.warning('No valid records with saleforce_org_Id found.');
            }
          } else {
            const filteredData = results?.data?.filter(
              (record: CsvRecord) => record?.saleforce_org_Id,
            );
            if (filteredData.length > 0) {
              setFileData(filteredData);

              message.success(`${file.name} file uploaded successfully.`);
              setUploadSuccess(true);
            } else {
              message.warning('No valid records with saleforce_org_Id found.');
            }
          }
          setDataUploadLoading(false);
        },
        error: function (err) {
          setDataUploadLoading(false);
          message.error(`Failed to parse CSV file: ${err.message}`);
        },
      });
      // }
      return false; // Prevent default upload behavior
    };

    const uploadToDatabase = async () => {
      if (fileData?.length === 0) {
        message.error('No data to upload.');
        return;
      }

      try {
        if (isMasterPartnerUpload) {
          // Handle master partner upload
          await dispatch(createOrUpdateMasterPartner(fileData));
        } else {
          // Handle sales force credentials upload
          const res = await dispatch(addSalesForceCredentials(fileData));
          if (res?.payload) {
            message.success('Data uploaded to database successfully!');
            dispatch(queryAddSalesForceCredentials('')); // Clear query if needed
          } else {
            throw new Error('Failed to upload data to database.');
          }
        }

        // Common success actions
        setUploadSuccess(true);
        setShowAddUserModal(false);
      } catch (error: any) {
        // Handle errors
        message.error(`Error uploading data: ${error.message}`);
        setShowAddUserModal(false);
      }
    };

    useImperativeHandle(ref, () => ({
      uploadToDatabase,
    }));

    return (
      <div>
        <br />
        <Upload
          beforeUpload={handleFileUpload}
          showUploadList={false}
          disabled={fileData.length > 0} // Disable upload if data exists
          openFileDialogOnClick={fileData.length === 0} // Prevent opening file dialog if data exists
        >
          <Button
            icon={<UploadOutlined />}
            loading={dataUploadLoading}
            type="primary"
            style={{
              backgroundColor:
                fileData.length > 0
                  ? token.colorTextDisabled
                  : token.colorPrimary, // Disabled color when data exists
              borderRadius: '15px',
              fontWeight: '500',
              padding: '20px',
              cursor: fileData.length > 0 ? 'not-allowed' : 'pointer', // Change cursor when disabled
            }}
          >
            Click to Upload {isMasterPartnerUpload ? 'Xlsx' : 'CSV'}
          </Button>
        </Upload>

        {fileName && (
          <Card
            style={{
              marginTop: 16,
              border: '1px solid #f0f0f0',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center'}}>
              <FileTextOutlined style={{marginRight: 8, color: '#1890ff'}} />
              <span style={{fontWeight: '500'}}>{fileName}</span>
            </div>
          </Card>
        )}
      </div>
    );
  },
);

export default AddSalesForceCredentials;
