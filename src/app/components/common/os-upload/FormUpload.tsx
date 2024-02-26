import {convertFileToBase64} from '@/app/utils/base';
import {TrashIcon} from '@heroicons/react/24/outline';
import message from 'antd/es/message';
import Image from 'next/image';
import {useState} from 'react';
import HeaderLogo from '../../../../../public/assets/static/UploadFile.svg';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import FormUploadCard from './FormUploadCard';
import {AtachmentStyleCol, DraggerStyle} from './styled-components';

const FormUpload = () => {
  const [fileData, setFileData] = useState<any>([]);
  const [token] = useThemeToken();

  const beforeUpload = (file: File) => {
    setFileData([...fileData, file]);
    convertFileToBase64(file)
      .then((base64String) => {
        console.log('base64String', base64String);

        // if (base64String) {
        //   dispatch(uploadToAws({document: base64String})).then(
        //     (payload: any) => {
        //       const pdfUrl = payload?.payload?.data?.Location;
        //       console.log('pdfUrl', pdfUrl);
        //     },
        //   );
        // }
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
    return false;
  };

  return (
    <>
      <Space size={16}>
        <FormUploadCard
          uploadFileData={fileData}
          setUploadFileData={setFileData}
        />
        <DraggerStyle
          beforeUpload={beforeUpload}
          showUploadList={false}
          multiple
        >
          <Row justify="space-between">
            <AtachmentStyleCol>
              <Typography name="Caption Regular" color={token?.colorLinkHover}>
                Attachment
              </Typography>
            </AtachmentStyleCol>
            <Col>
              <TrashIcon width={24} color={token?.colorError} />
            </Col>
          </Row>
          <Space size={16}>
            <Image src={HeaderLogo} alt="HeaderLogo" />
            <Space direction="vertical" style={{textAlign: 'initial'}}>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                UploadFile
              </Typography>
              <Typography name="Body 4/Medium">
                XLS, PDF, DOC, PNG and JPG
              </Typography>
            </Space>
          </Space>
        </DraggerStyle>
      </Space>
    </>
  );
};

export default FormUpload;
