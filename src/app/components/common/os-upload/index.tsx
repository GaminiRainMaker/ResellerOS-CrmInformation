import React from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {message, Upload, UploadFile, UploadProps} from 'antd';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {OSUploadStyle} from './styled-components';
import Typography from '../typography';
import useThemeToken from '../hooks/useThemeToken';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import {Checkbox} from '../antd/Checkbox';

const {Dragger} = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const fileList: UploadFile[] = [
  {
    uid: '0',
    name: 'xxx.png',
    status: 'uploading',
    percent: 33,
  },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'error',
  },
];
const OsUpload: React.FC = () => {
  const [token] = useThemeToken();
  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Space size={8} direction="horizontal">
        <Checkbox />
        <Typography name="Body 3/Regular">Add in existing quote</Typography>
      </Space>
      <OSUploadStyle {...props}>
        <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />

        <>
          <Typography
            name="Body 4/Medium"
            color={token?.colorPrimaryText}
            as="div"
          >
            or Drag and Drop
          </Typography>
          <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
            XLS, PDF, DOC, PNG and JPG
          </Typography>
        </>
      </OSUploadStyle>

      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        defaultFileList={[...fileList]}
        className="upload-list-inline"
      />
    </Space>
  );
};
export default OsUpload;
