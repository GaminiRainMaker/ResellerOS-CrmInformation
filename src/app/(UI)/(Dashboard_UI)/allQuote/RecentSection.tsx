import AddQuote from '@/app/components/common/addQuote';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Divider, Form} from 'antd';
import {FC, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';

const RecentSection: FC<any> = () => {
  const {loading} = useAppSelector((state) => state.quote);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [uploadForm] = Form.useForm();
  const [token] = useThemeToken();

  return (
    <Space direction="vertical" size={24} style={{width: '100%'}}>
      <Space
        direction="vertical"
        size={24}
        style={{
          padding: '24px',
          background: token?.colorBgContainer,
          borderRadius: '12px',
          width: '100%',
        }}
      >
        <Row>
          <Col span={7}>
            <Space direction="vertical" size={2}>
              <Typography name="Body 2/Medium" color={token?.colorPrimaryText}>
                Upload file to generate quote
              </Typography>
              <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
                Lorem ipsum dolor sit amet consectetur. Feugiat ullamcorper
                congue vestibulum enim purus vitae.{' '}
              </Typography>
            </Space>
          </Col>
          <Col span={12}>
            {/* <UploadFile
              setUploadFileData={setUploadFileData}
              uploadFileData={uploadFileData}
              addQuoteLineItem={addQuoteLineItem}
              form={uploadForm}
            /> */}
          </Col>
          <Divider />
        </Row>
      </Space>
      <Row
        justify="end"
        style={{
          padding: '24px',
          background: token?.colorBgContainer,
          borderRadius: '12px',
          width: '100%',
        }}
      >
        <Col>
          <AddQuote
            buttonText="Generate"
            loading={loading}
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            uploadForm={uploadForm}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default RecentSection;
