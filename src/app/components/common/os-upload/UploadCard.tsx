/* eslint-disable array-callback-return */
import {InformationCircleIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Avatar, Form, Popover, Switch} from 'antd';
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
import {Tag} from '../antd/Tag';
import OsInput from '../os-input';
import {formatStatus} from '@/app/utils/CONSTANTS';

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
    manual: boolean,
  ) => {
    const arr = [...uploadFileData];
    const obj = {...arr[index]};
    if (type === 'distributor') {
      obj.distributor_id = value;
    } else if (type === 'manualquote') {
      obj.manualquote = manual;
      obj.distributor_id = '';
      obj.oem_id = '';
      obj.distributor_name = '';
      obj.oem_name = '';

      obj.model_id = '';
      obj.training_work = false;
      obj.quote_config_id = '';
    } else if (type === 'training_work') {
      obj.training_work = manual;
    } else if (type === 'distributor_name') {
      obj.distributor_name = value;
    } else if (type === 'oem_name') {
      obj.oem_name = value;
    } else {
      obj.oem_id = value;
    }
    const data = quoteConfigData?.find(
      (quoteData: any) =>
        (obj?.distributor_id
          ? quoteData.model_id === obj.distributor_id
          : true) && (obj?.oem_id ? quoteData.model_id === obj.oem_id : true),
    );
    if (!obj.manualquote) {
      obj.model_id = data?.model_id;
      obj.quote_config_id = data?.id;
    }

    arr[index] = obj;
    setUploadFileData(arr);
  };

  return (
    <div>
      {uploadFileData && uploadFileData?.length > 0 && (
        <>
          <Row justify="space-between" gutter={[0, 32]}>
            <Col span={10}>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                File Name
              </Typography>
            </Col>
            <Col span={3}>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                Distributor
              </Typography>
            </Col>
            <Col span={98}>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                OEM
              </Typography>
            </Col>
            <Col span={2} />
          </Row>
        </>
      )}
      {uploadFileData?.map((item: any, index: number) => (
        <Form key={item?.uid} layout="vertical">
          <Row key={item?.uid} justify="space-between" gutter={[0, 8]}>
            <Col span={6}>
              <Space size={12}>
                {item?.file?.type.split('/')[1] === 'pdf' ? (
                  <Image src={PdfImg} alt="PdfImg" />
                ) : (
                  <Image src={XlsImg} alt="XlsImg" />
                )}

                {/* <Typography name="Body 4/Medium">{item?.file?.name}</Typography> */}
                <div
                  style={{
                    textWrap: 'wrap',
                    width: '150px',
                    fontWeight: '500px',
                    fontSize: '14px',
                  }}
                >
                  {formatStatus(item?.file?.name)}
                </div>
              </Space>
            </Col>
            <Col span={item?.manualquote ? 3 : 4}>
              <Space size={12}>
                <Typography
                  name="Body 3/Medium"
                  color={token?.colorPrimaryText}
                >
                  Manual{' '}
                  <Switch
                    onChange={(e: any) => {
                      handleChangeDistributorOem('manualquote', index, 0, e);
                    }}
                  />
                </Typography>
              </Space>
            </Col>
            {item?.manualquote && (
              <Col span={2}>
                <Space size={12}>
                  <Typography
                    name="Body 3/Medium"
                    color={token?.colorPrimaryText}
                  >
                    <Popover
                      content={
                        <Typography name="Body 3/Regular">
                          By enabling this toggle button, you confirm that this
                          document will be used for training purposes.
                        </Typography>
                      }
                    >
                      <Avatar
                        size={24}
                        style={{
                          // marginTop: '-12px',
                          marginRight: '5px',
                          background: 'none',
                        }}
                        icon={
                          <InformationCircleIcon width={24} color={'black'} />
                        }
                      />
                    </Popover>

                    <Switch
                      onChange={(e: any) => {
                        handleChangeDistributorOem(
                          'training_work',
                          index,
                          0,
                          e,
                        );
                      }}
                    />
                  </Typography>
                </Space>
              </Col>
            )}
            {item?.manualquote ? (
              <>
                <Col span={5}>
                  {' '}
                  <OsInput
                    style={{height: '35px'}}
                    value={item?.distributor_name}
                    disabled={item?.oem_name ? true : false}
                    onChange={(e: any) => {
                      handleChangeDistributorOem(
                        'distributor_name',
                        index,

                        e?.target?.value,
                        false,
                      );
                    }}
                  />
                </Col>
                <Col span={5}>
                  <OsInput
                    style={{height: '35px'}}
                    disabled={item?.distributor_name ? true : false}
                    value={item?.oem_name}
                    onChange={(e: any) => {
                      handleChangeDistributorOem(
                        'oem_name',
                        index,
                        e?.target?.value,
                        false,
                      );
                    }}
                  />
                </Col>
              </>
            ) : (
              <>
                {' '}
                <Col span={5}>
                  <OsDistributorSelect
                    name="distributor"
                    disabled={item?.oem_id ? true : false}
                    onChange={(e: number) => {
                      handleChangeDistributorOem(
                        'distributor',
                        index,
                        e,
                        false,
                      );
                    }}
                    quoteCreation
                    distributorValue={
                      item?.distributor_id ?? item?.distributor_id
                    }
                    oemValue={item?.oem_id ?? item?.oem_id}
                  />
                </Col>
                <Col span={5}>
                  <OsOemSelect
                    disabled={item?.distributor_id ? true : false}
                    name="oem"
                    onChange={(e: number) => {
                      handleChangeDistributorOem('oem', index, e, false);
                    }}
                    oemValue={item?.oem_id ?? item?.oem_id}
                    distributorValue={
                      item?.distributor_id ?? item?.distributor_id
                    }
                    quoteCreation
                  />
                </Col>
              </>
            )}

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
          {item?.error && (
            <Tag
              color="error"
              bordered={false}
              style={{borderRadius: '18px', padding: '8px'}}
            >
              <Typography name="Body 4/Regular" color={token?.colorError}>
                {item?.manualquote
                  ? 'Please add either Distributor or OEM'
                  : 'Please select either Distributor or OEM'}
              </Typography>
            </Tag>
          )}
          <Divider />
        </Form>
      ))}
    </div>
  );
};

export default UploadCard;
