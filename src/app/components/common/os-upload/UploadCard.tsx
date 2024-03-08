import {TrashIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC} from 'react';
import {Form} from 'antd';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {UploadCardAvatarStyle, UploadCardColStyle} from './styled-components';
import OsDistributorSelect from '../os-distributor-select';
import {Divider} from '../antd/Divider';

const UploadCard: FC<any> = ({uploadFileData, setUploadFileData}) => {
  const [token] = useThemeToken();

  const removeFile = (id: number | undefined | string) => {
    const filtered = uploadFileData.filter(
      (p: any) => p?.data?.result?.[0]?.id !== id,
    );
    setUploadFileData(filtered);
  };

  return (
    <div>
      {uploadFileData && uploadFileData?.length > 0 && (
        <Row justify="space-between" gutter={[0, 32]}>
          <Col span={8}>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              File Name
            </Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              Distributor
            </Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              OEM
            </Typography>
          </Col>
          <Col span={2} />
        </Row>
      )}
      {uploadFileData?.map((item: any) => (
        <Form key={item?.data?.result?.[0]?.id} layout="vertical">
          <Row
            key={item?.data?.result?.[0]?.id}
            justify="space-between"
            gutter={[0, 8]}
          >
            <Col span={8}>
              <Space size={12}>
                <Image src={PdfImg} alt="PdfImg" />
                <Typography name="Body 4/Medium">
                  {item?.data?.result?.[0]?.input}
                </Typography>
              </Space>
            </Col>
            <Col span={6}>
              <OsDistributorSelect name="distributor" />
            </Col>
            <Col span={6}>
              <OsDistributorSelect name="distributor" />
            </Col>
            <Col span={2}>
              <TrashIcon
                cursor="pointer"
                width={20}
                color={token?.colorError}
                onClick={() => {
                  removeFile(item?.data?.result?.[0]?.id);
                }}
              />
            </Col>
          </Row>
          <Divider />
        </Form>
      ))}
    </div>
  );
};

export default UploadCard;
