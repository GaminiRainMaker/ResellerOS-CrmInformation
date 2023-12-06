import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {message} from 'antd';
import React from 'react';
import {Checkbox} from '../antd/Checkbox';
import {Space} from '../antd/Space';
import {UploadFile, UploadProps} from '../antd/Upload';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {OSDraggerStyle, OSUploadStyle} from './styled-components';

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
    name: '123.png',
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
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'done',
  },
  {
    uid: '-2',
    name: 'zzz.pdf',
    status: 'done',
  },
  {
    uid: '-2',
    name: 'zzz.doc',
    status: 'done',
  },
];

const OsUpload: React.FC<any> = ({beforeUpload}) => {
  const [token] = useThemeToken();

  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Space size={8} direction="horizontal">
        <Checkbox />
        <Typography name="Body 3/Regular">Add in existing quote</Typography>
      </Space>

      <OSDraggerStyle {...props} beforeUpload={beforeUpload}>
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

      <OSUploadStyle
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        defaultFileList={[...fileList]}
      />
    </Space>
  );
};
export default OsUpload;
