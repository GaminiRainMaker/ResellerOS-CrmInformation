import {Button} from '@/app/components/common/antd/Button';
import {Upload} from '@/app/components/common/antd/Upload';
import {UploadOutlined, CheckCircleOutlined} from '@ant-design/icons';
import {message} from 'antd';
import React, {FC, forwardRef, useState, useImperativeHandle, Ref} from 'react';
import Papa from 'papaparse';
import {useAppDispatch} from '../../../../../redux/hook';
import {
  addSalesForceCredentials,
  queryAddSalesForceCredentials,
} from '../../../../../redux/actions/salesForceCredentials';

export interface AddSalesForceCredentialsRef {
  uploadToDatabase: () => Promise<void>;
}

interface CsvRecord {
  saleforce_org_Id?: string;
  [key: string]: any;
}

interface Props {
  setShowAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSalesForceCredentials = forwardRef<AddSalesForceCredentialsRef, Props>(
  (props, ref) => {
    const {setShowAddUserModal} = props;
    const [csvData, setCsvData] = useState<CsvRecord[]>([]);
    const [uploadSuccess, setUploadSuccess] = useState(false); 
    const dispatch = useAppDispatch();

    const handleFileUpload = (file: File) => {
      Papa.parse(file, {
        header: true,
        complete: function (results: Papa.ParseResult<CsvRecord>) {
          const filteredData = results?.data?.filter(
            (record: CsvRecord) => record?.saleforce_org_Id,
          );

          if (filteredData.length > 0) {
            setCsvData(filteredData); 
            message.success(`${file.name} file uploaded successfully.`);
            setUploadSuccess(true); 
          } else {
            message.warning('No valid records with saleforce_org_Id found.');
          }
        },
        error: function (err) {
          message.error(`Failed to parse CSV file: ${err.message}`);
        },
      });
      return false;
    };

    const uploadToDatabase = async () => {
      if (csvData.length === 0) {
        message.error('No data to upload.');
        return;
      }
      try {
        dispatch(addSalesForceCredentials(csvData)).then((res) => {
          if (res?.payload) {
            message.success('Data uploaded to database successfully!');
            setUploadSuccess(true);
            setShowAddUserModal(false);
            dispatch(queryAddSalesForceCredentials(''));
          } else {
            message.error('Failed to upload data to database.');
            setShowAddUserModal(false);
          }
        });
      } catch (error: any) {
        message.error(`Error uploading data: ${error.message}`);
        setShowAddUserModal(false);
      }
    };
    useImperativeHandle(ref, () => ({
      uploadToDatabase,
    }));

    return (
      <div>
        <Upload beforeUpload={handleFileUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Click to Upload CSV</Button>
        </Upload>

        {uploadSuccess && (
          <div style={{marginTop: 16, color: 'green'}}>
            <CheckCircleOutlined style={{marginRight: 8}} />
            Data uploaded successfully!
          </div>
        )}
      </div>
    );
  },
);

export default AddSalesForceCredentials;
