/* eslint-disable array-callback-return */
import {TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import XlsImg from '../../../../../public/assets/static/xls.svg';
import {useAppSelector} from '../../../../../redux/hook';
import {Divider} from '../antd/Divider';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsDistributorSelect from '../os-distributor-select';
import OsOemSelect from '../os-oem-select';
import Typography from '../typography';

const UploadCard: FC<any> = ({uploadFileData, setUploadFileData, form}) => {
  const [token] = useThemeToken();
  const {data: quoteConfigData} = useAppSelector((state) => state.quoteConfig);
  const removeFile = (uid: number | undefined | string) => {
    setUploadFileData((prev: any) =>
      prev.filter((prevIndex: any) => prevIndex?.uid !== uid),
    );
  };

  const handleChangeDistributorOem = (
    type: string,
    index: number,
    value: number,
  ) => {
    const arr = [...uploadFileData];
    const obj = {...arr[index]};
    if (type === 'distributor') {
      obj.distributor_id = value;
    } else {
      obj.oem_id = value;
    }
    const data = quoteConfigData.find(
      (quoteData: any) =>
        (obj?.distributor_id
          ? quoteData.distributor_id === obj.distributor_id
          : true) && (obj?.oem_id ? quoteData.oem_id === obj.oem_id : true),
    );
    obj.model_id = data?.model_id;
    obj.quote_config_id = data?.id;
    arr[index] = obj;
    setUploadFileData(arr);
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
      {uploadFileData?.map((item: any, index: number) => (
        <Form key={item?.uid} layout="vertical">
          <Row key={item?.uid} justify="space-between" gutter={[0, 8]}>
            <Col span={8}>
              <Space size={12}>
                {item?.file?.type.split('/')[1] === 'pdf' ? (
                  <Image src={PdfImg} alt="PdfImg" />
                ) : (
                  <Image src={XlsImg} alt="XlsImg" />
                )}

                <Typography name="Body 4/Medium">{item?.file?.name}</Typography>
              </Space>
            </Col>
            <Col span={6}>
              <OsDistributorSelect
                name="distributor"
                onChange={(e: number) => {
                  handleChangeDistributorOem('distributor', index, e);
                }}
                quoteCreation
                distributorValue={item?.distributor_id}
                oemValue={item?.oem_id}
              />
            </Col>
            <Col span={6}>
              <OsOemSelect
                name="oem"
                onChange={(e: number) => {
                  handleChangeDistributorOem('oem', index, e);
                }}
                oemValue={item?.oem_id}
                distributorValue={item?.distributor_id}
                quoteCreation
              />
            </Col>
            {item?.error && <p>Please select either Distributor or Oem</p>}
            <Col span={2}>
              <TrashIcon
                cursor="pointer"
                width={20}
                color={token?.colorError}
                onClick={() => {
                  removeFile(item?.uid);
                }}
                style={{marginTop: '8px'}}
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
