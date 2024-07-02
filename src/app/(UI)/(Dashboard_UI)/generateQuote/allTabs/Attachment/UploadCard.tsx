/* eslint-disable array-callback-return */
import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {AttachmentOptions} from '@/app/utils/CONSTANTS';
import {TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import PdfImg from '../../../../../../../public/assets/static/pdf.svg';
import XlsImg from '../../../../../../../public/assets/static/xls.svg';

const UploadCard: FC<any> = ({
  uploadFileData,
  setUploadFileData,
  addNewAttachment,
  form,
}) => {
  const [token] = useThemeToken();
  const removeFile = (uid: number | undefined | string) => {
    setUploadFileData((prev: any) =>
      prev.filter((prevIndex: any) => prevIndex?.uid !== uid),
    );
  };

  const handleAttachmentType = (index: number, value: number) => {
    const arr = [...uploadFileData];
    const obj = {...arr[index]};
    obj.type = value;
    arr[index] = obj;
    setUploadFileData(arr);
  };

  return (
    <div>
      <br />
      {uploadFileData?.map((item: any, index: number) => (
        <Form
          onFinish={addNewAttachment}
          key={item?.uid}
          layout="vertical"
          form={form}
        >
          <Row key={item?.uid} justify="space-between" gutter={[0, 8]}>
            <Col span={10}>
              <Space size={12}>
                {item?.name?.includes('pdf') ? (
                  <Image src={PdfImg} alt="PdfImg" />
                ) : (
                  <Image src={XlsImg} alt="XlsImg" />
                )}

                <Typography name="Body 4/Medium">{item?.name}</Typography>
              </Space>
            </Col>
            <Col span={10}>
              <SelectFormItem
                name={`type${item?.uid}`}
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <CommonSelect
                  key={item?.uid}
                  style={{width: '100%'}}
                  placeholder="Select Grouping here"
                  options={AttachmentOptions}
                  onChange={(e) => {
                    handleAttachmentType(index, e);
                  }}
                  allowClear
                />
              </SelectFormItem>
            </Col>

            <Col span={2}>
              <TrashIcon
                cursor="pointer"
                width={20}
                color={token?.colorError}
                onClick={() => {
                  removeFile(item?.uid);
                }}
                style={{marginTop: '15px'}}
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
