/* eslint-disable array-callback-return */
import {TrashIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC, useState} from 'react';
import {Form} from 'antd';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {UploadCardAvatarStyle, UploadCardColStyle} from './styled-components';
import OsDistributorSelect from '../os-distributor-select';
import {Divider} from '../antd/Divider';
import OsOemSelect from '../os-oem-select';

const UploadCard: FC<any> = ({uploadFileData, setUploadFileData}) => {
  console.log('uploadFileData', uploadFileData);
  const [token] = useThemeToken();
  const [distributorValue, setDistributorValue] = useState<any>();
  const [oemValue, setOemValue] = useState<any>();

  const removeFile = (uid: number | undefined | string) => {
    // const filtered = uploadFileData.filter(
    //   (p: any) => p?.id !== id,
    // );
    // setUploadFileData(filtered);

    setUploadFileData((prev: any) =>
      prev.filter((prevIndex: any) => prevIndex?.uid !== uid),
    );
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
      {uploadFileData?.map((item: any) => {
        console.log('name===>', item?.name);
        return (
          <Form key={item?.uid} layout="vertical">
            <Row key={item?.uid} justify="space-between" gutter={[0, 8]}>
              <Col span={8}>
                <Space size={12}>
                  <Image src={PdfImg} alt="PdfImg" />
                  <Typography name="Body 4/Medium">{item?.name}</Typography>
                </Space>
              </Col>
              <Col span={6}>
                <OsDistributorSelect
                  name="distributor"
                  onChange={(e: number) => {
                    setDistributorValue(e);
                  }}
                  quoteCreation
                  distributorValue={distributorValue}
                />
              </Col>
              <Col span={6}>
                <OsOemSelect
                  name="oem"
                  onChange={(e: number) => {
                    setOemValue(e);
                  }}
                  oemValue={oemValue}
                  quoteCreation
                />
              </Col>
              <Col span={2}>
                <TrashIcon
                  cursor="pointer"
                  width={20}
                  color={token?.colorError}
                  onClick={() => {
                    removeFile(item?.uid);
                  }}
                />
              </Col>
            </Row>
            <Divider />
          </Form>
        );
      })}
    </div>
  );
};

export default UploadCard;
