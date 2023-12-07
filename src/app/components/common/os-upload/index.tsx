import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Checkbox} from '../antd/Checkbox';
import {Space} from '../antd/Space';
import {UploadProps} from '../antd/Upload';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {OSDraggerStyle} from './styled-components';
import UploadCard from './UploadCard';

const OsUpload: React.FC<any> = ({
  beforeUpload,
  uploadFileData,
  localUploadFileData,
}) => {
  const [token] = useThemeToken();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const newrrr: any = [...fileList];
    if (uploadFileData && uploadFileData?.length > 0) {
      newrrr?.push({nsss: uploadFileData?.data?.result?.[0]?.input});
    }
    setFileList(newrrr);
  }, [uploadFileData]);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const files = [...info.fileList];

      const {status} = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }

      const names = files.map((file) => file?.name);
      console.log('names', info.fileList[0]?.name);

      setFileList(names as any);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  console.log(
    'fileListfileList',
    fileList,
    'uploadFileData123',
    localUploadFileData,
  );
  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Space size={8} direction="horizontal">
        <Checkbox />
        <Typography name="Body 3/Regular">Add in existing quote</Typography>
      </Space>

      <OSDraggerStyle
        {...props}
        beforeUpload={beforeUpload}
        showUploadList={false}
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
      <UploadCard fileList={fileList} />
    </Space>
  );
};
export default OsUpload;
