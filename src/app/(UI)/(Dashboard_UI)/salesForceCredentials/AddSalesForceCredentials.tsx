import {Button} from '@/app/components/common/antd/Button';
import {Upload} from '@/app/components/common/antd/Upload';
import {UploadOutlined, CheckCircleOutlined} from '@ant-design/icons';
import {message} from 'antd';
import React, {FC, forwardRef, useState, useImperativeHandle} from 'react';
import Papa from 'papaparse';

export interface AddSalesForceCredentialsRef {
  uploadToDatabase: () => Promise<void>;
}

interface CsvRecord {
  saleforce_org_Id?: string;
  [key: string]: any;
}

const AddSalesForceCredentials: FC<any> =
  forwardRef<AddSalesForceCredentialsRef>((props, ref) => {
    const [csvData, setCsvData] = useState<CsvRecord[]>([]);
    const [uploadSuccess, setUploadSuccess] = useState(false); // New state for tracking upload success

    const handleFileUpload = (file: File) => {
      Papa.parse(file, {
        header: true,
        complete: function (results: Papa.ParseResult<CsvRecord>) {
          // Filter data to include only those records with a valid 'saleforce_org_Id'
          const filteredData = results?.data?.filter(
            (record: CsvRecord) => record?.saleforce_org_Id,
          );

          if (filteredData.length > 0) {
            setCsvData(filteredData); // Store the filtered data in the state
            message.success(`${file.name} file uploaded successfully.`);
            setUploadSuccess(true); // Reset the upload success state
          } else {
            message.warning('No valid records with saleforce_org_Id found.');
          }
        },
        error: function (err) {
          message.error(`Failed to parse CSV file: ${err.message}`);
        },
      });
      return false; // prevent default upload behavior
    };

    const uploadToDatabase = async () => {
      if (csvData.length === 0) {
        message.error('No data to upload.');
        return;
      }
      console.log('csvData', csvData);

      // try {
      //   const response = await fetch('/api/upload-csv', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(csvData),
      //   });

      //   if (response.ok) {
      //     message.success('Data uploaded to database successfully!');
      //     setUploadSuccess(true); // Set upload success state
      //   } else {
      //     message.error('Failed to upload data to database.');
      //   }
      // } catch (error: any) {
      //   message.error(`Error uploading data: ${error.message}`);
      // }
    };

    // Expose the uploadToDatabase function to the parent component
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
  });

export default AddSalesForceCredentials;
