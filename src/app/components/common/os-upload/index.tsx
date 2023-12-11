/* eslint-disable react-hooks/exhaustive-deps */
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import React, {useEffect, useState} from 'react';
import {Checkbox} from '../antd/Checkbox';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import EmptyContainer from '../os-empty-container';
import Typography from '../typography';
import UploadCard from './UploadCard';
import {OSDraggerStyle} from './styled-components';

const OsUpload: React.FC<any> = ({
  beforeUpload,
  uploadFileData,
  setUploadFileData,
}) => {
  const [token] = useThemeToken();
  const [fileList, setFileList] = useState([]);
  // const {quote} = useAppSelector((state) => state.quote);

  useEffect(() => {
    const newrrr: any = [...fileList];
    if (uploadFileData && uploadFileData?.length > 0) {
      newrrr?.push({nsss: uploadFileData?.data?.result?.[0]?.input});
    }
    setFileList(newrrr);
  }, [uploadFileData]);

  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Space size={8} direction="horizontal">
        <Checkbox />
        <Typography name="Body 3/Regular">Add in existing quote</Typography>
      </Space>

      <OSDraggerStyle
        beforeUpload={beforeUpload}
        showUploadList={false}
        multiple
      >
        <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
        <Typography
          name="Body 4/Medium"
          color={token?.colorPrimaryText}
          as="div"
        >
          <Typography
            name="Body 4/Medium"
            style={{textDecoration: 'underline', cursor: 'pointer'}}
            color={token?.colorPrimary}
          >
            Click to Upload
          </Typography>{' '}
          or Drag and Drop
        </Typography>
        <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
          XLS, PDF, DOC, PNG and JPG
        </Typography>
      </OSDraggerStyle>

      <UploadCard
        uploadFileData={uploadFileData}
        setUploadFileData={setUploadFileData}
      />
    </Space>
  );
};
export default OsUpload;
