import {Col, Row} from '@/app/components/common/antd/Grid';
import OsInputPassword from '@/app/components/common/os-input/InputPassword';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import eyeSlashIcon from '../../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import eyeIcon from '../../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import {UserProfileInterface} from './profile.interface';
const ChangePassword: FC<UserProfileInterface> = ({
  form,
  isEditable,
  onFinish,
}) => {
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Old Password</Typography>}
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <OsInputPassword
              disabled={isEditable}
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
              placeholder="Minimum 8 characters"
              style={{width: '100%'}}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">New Password</Typography>}
            name="new_password"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <OsInputPassword
              disabled={isEditable}
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
              placeholder="Minimum 8 characters"
              style={{width: '100%'}}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Confirm Password</Typography>
            }
            name="confirm_password"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <OsInputPassword
              disabled={isEditable}
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
              placeholder="Minimum 8 characters"
              style={{width: '100%'}}
            />
          </SelectFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
