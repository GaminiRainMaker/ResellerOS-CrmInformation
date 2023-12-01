import Form from 'antd/es/form';
import Image from 'next/image';
import {FC} from 'react';
import {Space} from '../../common/Space';
import useThemeToken from '../../common/hooks/useThemeToken';
import OsButton, {ButtonType} from '../../common/os-button';
import OsInput from '../../common/os-input';
import OsInputPassword from '../../common/os-input/osInputPassword';
import Typography from '../../common/typography';
import {ContentSectionWrapper, CustomCheckbox} from './styled-components';
import OSResellerLogo from '../../../../../public/assets/static/ResellerOsText.svg';
import userIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/user.svg';
import smsIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';
import eyeIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import {AuthLayoutInterface} from './authLayout.interface';

const ContentSection: FC<AuthLayoutInterface> = ({
  heading,
  description,
  email,
  password,
  username,
  alreadyAmember,
  registerNow,
  rememberPassword,
}) => {
  const [token] = useThemeToken();

  return (
    <ContentSectionWrapper direction="vertical" size={72}>
      <Image src={OSResellerLogo} alt="ddsdsdds" />
      <Space direction="vertical" size={72}>
        <Space
          size={48}
          direction="vertical"
          style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Space direction="vertical">
            {heading && (
              <Typography name="Heading 1/Medium">{heading}</Typography>
            )}
            {description && (
              <Typography name="Body 3/Regular" style={{padding: '0px 20px'}}>
                {description}
              </Typography>
            )}
          </Space>

          <Form layout="vertical" requiredMark={false}>
            {username && (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                name="username"
                //   hasFeedback
                label={
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorPrimaryText}
                  >
                    Username
                  </Typography>
                }
              >
                <OsInput
                  placeholder="Enter your username here!"
                  suffix={
                    <Image
                      src={userIcon}
                      alt="userIcon"
                      width={24}
                      height={24}
                    />
                  }
                />
              </Form.Item>
            )}
            {email && (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                name="email"
                //   hasFeedback
                label={
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorPrimaryText}
                  >
                    Email
                  </Typography>
                }
              >
                <OsInput
                  placeholder="Enter your email here!"
                  suffix={
                    <Image src={smsIcon} alt="smsIcon" width={24} height={24} />
                  }
                />
              </Form.Item>
            )}
            {password && (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                name="password"
                //   hasFeedback
                label={
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorPrimaryText}
                  >
                    Password
                  </Typography>
                }
              >
                <OsInputPassword
                  placeholder="Minimum 8 characters"
                  suffix={
                    <Image src={eyeIcon} alt="eyeIcon" width={24} height={24} />
                  }
                />
              </Form.Item>
            )}

            {rememberPassword && (
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {/* <Form.Item> */}
                <CustomCheckbox
                  // checked={isChecked}
                  // onClick={(e) =>
                  //   handleRememberUsername(
                  //     (e?.target as HTMLInputElement)?.checked,
                  //   )
                  // }
                  token={token}
                >
                  <Typography name="Body 3/Regular">
                    Remember Password
                  </Typography>
                </CustomCheckbox>
                {/* </Form.Item> */}
                <Typography
                  name="Body 3/Bold"
                  cursor="pointer"
                  color={token?.colorLink}
                >
                  Forgot Password?
                </Typography>
              </Space>
            )}

            <Form.Item name="submit" style={{marginTop: '80px'}}>
              <OsButton buttontype={ButtonType.PRIMARY} type="primary">
                Create Account
              </OsButton>
            </Form.Item>

            <Space>
              {alreadyAmember && (
                <Typography
                  name="Body 3/Regular"
                  color={token?.colorPrimaryText}
                >
                  Already a member?
                  <Typography
                    name="Body 3/Bold"
                    color={token?.colorLink}
                    cursor="pointer"
                  >
                    {' '}
                    Login
                  </Typography>
                </Typography>
              )}
              {registerNow && (
                <Typography
                  name="Body 3/Regular"
                  color={token?.colorPrimaryText}
                >
                  Don’t have an account?
                  <Typography
                    name="Body 3/Bold"
                    color={token?.colorLink}
                    cursor="pointer"
                  >
                    {' '}
                    Register Now
                  </Typography>
                </Typography>
              )}
            </Space>
          </Form>
        </Space>
      </Space>
    </ContentSectionWrapper>
  );
};

export default ContentSection;
