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
const FormStackApiKey = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {data: GeneralSettingData, loading} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const onFinish = (values: any) => {
    const obj = GeneralSettingData?.id
      ? {...values, id: GeneralSettingData?.id}
      : {...values};

    dispatch(insertUpdateGeneralSetting(obj));
  };

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      api_key: GeneralSettingData?.api_key,
      secret_key: GeneralSettingData?.secret_key,
    });
  }, [GeneralSettingData]);

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
              Formstack
            </Typography>
          </Col>
          <Col>
            <SelectFormItem>
              <OsButton
                text="Save"
                buttontype="PRIMARY"
                htmlType="submit"
                loading={loading}
              />
            </SelectFormItem>
          </Col>
        </Row>
        <div
          style={{
            width: '100%',
            background: 'white',
            borderRadius: '12px',
            marginTop: '30px',
            padding: '24px',
            gap: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography name="Body 2/Medium">Formstack Keys</Typography>

          <Row justify="space-between" gutter={[16, 16]}>
            <Col span={24}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Api Key</Typography>}
                name="api_key"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <OsInputPassword
                  iconRender={(visible) =>
                    visible ? (
                      <Image
                        src={eyeIcon}
                        alt="eyeIcon"
                        width={24}
                        height={24}
                        style={{cursor: 'pointer'}}
                      />
                    ) : (
                      <Image
                        src={eyeSlashIcon}
                        alt="eyeSlashIcon"
                        width={24}
                        height={24}
                        style={{cursor: 'pointer'}}
                      />
                    )
                  }
                  placeholder="Enter keys here!"
                  style={{width: '100%'}}
                />
              </SelectFormItem>
            </Col>
            <Col span={24}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Secret Key</Typography>}
                name="secret_key"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <OsInputPassword
                  iconRender={(visible) =>
                    visible ? (
                      <Image
                        src={eyeIcon}
                        alt="eyeIcon"
                        width={24}
                        height={24}
                        style={{cursor: 'pointer'}}
                      />
                    ) : (
                      <Image
                        src={eyeSlashIcon}
                        alt="eyeSlashIcon"
                        width={24}
                        height={24}
                        style={{cursor: 'pointer'}}
                      />
                    )
                  }
                  placeholder="Enter keys here!"
                  style={{width: '100%'}}
                />
              </SelectFormItem>
            </Col>
          </Row>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography
              name="Body 3/Bold"
              color={token?.colorLink}
              style={{marginBottom: '6px'}}
            >
              Note:
            </Typography>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
                <li>
                  If you do not have a FormStack account, please{' '}
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLink}
                    style={{textDecoration: 'underline'}}
                    hoverOnText
                    onClick={() => {
                      window.open(
                        'https://admin.formstack.com/signup/docs-teams',
                      );
                    }}
                  >
                    click here
                  </Typography>
                  .
                </li>
                <li>Please ensure that both of your keys are correct.</li>
              </ul>
            </Typography>
          </div>
        </div>
      </Form>
    </Space>
  );
};

export default FormStackApiKey;
