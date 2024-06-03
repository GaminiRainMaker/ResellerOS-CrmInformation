'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInputPassword from '@/app/components/common/os-input/InputPassword';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import Image from 'next/image';
import eyeSlashIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import eyeIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';

import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  getAllGeneralSetting,
  insertUpdateGeneralSetting,
} from '../../../../../redux/actions/generalSetting';
import CommonSelect from '@/app/components/common/os-select';
import {queryAllDocuments} from '../../../../../redux/actions/formstack';
const FormStackSync = () => {
  const [token] = useThemeToken();
  const {data: FormstackData, loading: FormstackLoading} = useAppSelector(
    (state) => state.formstack,
  );
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {data: generalSettingData, loading: GeneralSettingLoading} =
    useAppSelector((state) => state.gereralSetting);

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);

  useEffect(() => {
    let obj = {
      username: generalSettingData?.api_key,
      password: generalSettingData?.secret_key,
    };
    if (obj) {
      dispatch(queryAllDocuments(obj));
    }
  }, [generalSettingData]);

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);

  const FormstackDataOptions =
    FormstackData &&
    FormstackData.length > 0 &&
    FormstackData?.map((FormstackDataItem: any) => ({
      value: FormstackDataItem.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {FormstackDataItem.name}
        </Typography>
      ),
    }));

  const onFinish = () => {};
  return (
    <Space direction="vertical" size={24} style={{width: '100%'}}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Select Document
            </Typography>
          </Col>
          <Col>
            <SelectFormItem>
              <OsButton text="Save" buttontype="PRIMARY" htmlType="submit" />
            </SelectFormItem>
          </Col>
        </Row>
        <SelectFormItem
          label={<Typography name="Body 4/Medium">Document</Typography>}
          name="document_id"
          rules={[
            {
              required: true,
              message: 'Document is required!',
            },
          ]}
        >
          <CommonSelect
            style={{width: '100%'}}
            placeholder="Select Document"
            allowClear
            options={FormstackDataOptions}
          />
        </SelectFormItem>
      </Form>
    </Space>
  );
};

export default FormStackSync;
