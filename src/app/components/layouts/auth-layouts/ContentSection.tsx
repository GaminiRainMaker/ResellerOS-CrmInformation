/* eslint-disable eqeqeq */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
import {Form} from 'antd';
import Image from 'next/image';
import {FC, useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import {useRouter, useSearchParams} from 'next/navigation';
import OSResellerLogo from '../../../../../public/assets/static/ResellerOsText.svg';
import eyeIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import eyeSlashIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import {Space} from '../../common/antd/Space';
import useThemeToken from '../../common/hooks/useThemeToken';
import OsButton from '../../common/os-button';
import OsInput from '../../common/os-input';
import OsInputPassword from '../../common/os-input/InputPassword';
import Typography from '../../common/typography';
import {AuthLayoutInterface} from './authLayout.interface';
import {ContentSectionWrapper, CustomCheckbox} from './styled-components';
import {useAppDispatch} from '../../../../../redux/hook';
import {signUpAuth, verifyAuth} from '../../../../../redux/actions/auth';

const ContentSection: FC<AuthLayoutInterface> = ({
  heading,
  description,
  alreadyAmember,
  registerNow,
  rememberPassword,
  buttonText,
  onClick,
  inputFields,
}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [signUpData, setSignUpData] = useState<any>();
  // const onSubmitForm = (values: any) => {
  //   onClick(values);
  // };

  const onSubmitForm = (formValues: any, type: any) => {
    if (type == 'Log In') {
      dispatch(
        verifyAuth({
          email: formValues?.email,
          password: formValues?.password,
        }),
      ).then((payload) => {
        Cookies.set('access_token', payload.payload.token, {
          expires: 0.8,
          secure: true,
          sameSite: 'strict',
        });
        Cookies.set('id', payload.payload.id);
        Cookies.set('token', payload.payload.token);

        router.push('/crmInAccount');
      });
    } else if (
      formValues?.username &&
      formValues?.password &&
      formValues?.email
    ) {
      dispatch(
        signUpAuth({
          user_name: formValues?.username,
          email: formValues?.email,
          password: formValues?.password,
          organization: 'forcebolt',
        }),
      ).then(() => {
        router.push('/login');
      });
    }
  };

  return (
    <ContentSectionWrapper direction="vertical" size={72}>
      <Image src={OSResellerLogo} alt="OSResellerLogo" />
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

          <Form
            layout="vertical"
            name="authForm"
            onFinish={() => {
              onSubmitForm(signUpData, '');
            }}
            autoComplete="off"
            requiredMark={false}
          >
            {inputFields?.map((item: any) => {
              console.log('item');
              return (
                <Form.Item
                  key={item?.name}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  name={item.name}
                  label={
                    <Typography
                      name="Body 4/Medium"
                      color={token?.colorPrimaryText}
                    >
                      {item.label}
                    </Typography>
                  }
                >
                  {item.type === 'password' ? (
                    <OsInputPassword
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          [item.name]: e.target.value,
                        });
                      }}
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
                    />
                  ) : (
                    <OsInput
                      placeholder={item.placeholder}
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          [item.name]: e.target.value,
                        });
                      }}
                      suffix={
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={24}
                          height={24}
                          style={{cursor: 'pointer'}}
                        />
                      }
                    />
                  )}
                </Form.Item>
              );
            })}

            {rememberPassword && (
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <CustomCheckbox token={token}>
                  <Typography name="Body 3/Regular">
                    Remember Password
                  </Typography>
                </CustomCheckbox>
                <Typography
                  name="Body 3/Bold"
                  cursor="pointer"
                  color={token?.colorLink}
                >
                  Forgot Password?
                </Typography>
              </Space>
            )}

            <Form.Item style={{marginTop: '80px'}}>
              <OsButton
                style={{marginTop: '80px'}}
                text={buttonText}
                buttontype="PRIMARY"
                htmlType="submit"
                clickHandler={() => {
                  onSubmitForm(signUpData, buttonText);
                }}
              />
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
                    onClick={() => router?.push('/login')}
                    color={token?.colorLink}
                    cursor="pointer"
                    style={{cursor: 'pointer'}}
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
                  Don't have an account?
                  <Typography
                    name="Body 3/Bold"
                    color={token?.colorLink}
                    cursor="pointer"
                    style={{cursor: 'pointer'}}
                    onClick={() => router?.push('/signUp')}
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
