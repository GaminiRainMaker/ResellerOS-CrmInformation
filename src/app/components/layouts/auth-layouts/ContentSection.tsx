/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import {Form, notification} from 'antd';
import Image from 'next/image';
import React, {FC, useEffect, useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {CheckCircleIcon} from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import OSResellerLogo from '../../../../../public/assets/static/ResellerOsText.svg';
import eyeSlashIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import eyeIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import {
  sendForgotPasswordEmail,
  signUpAuth,
  verifyAuth,
  verifyEmail,
} from '../../../../../redux/actions/auth';
import {
  getUserByTokenAccess,
  updateUserPassword,
} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setUserInformation} from '../../../../../redux/slices/user';
import {Space} from '../../common/antd/Space';
import useThemeToken from '../../common/hooks/useThemeToken';
import OsButton from '../../common/os-button';
import OsInput from '../../common/os-input';
import OsInputPassword from '../../common/os-input/InputPassword';
import DailogModal from '../../common/os-modal/DialogModal';
import Typography from '../../common/typography';
import {AuthLayoutInterface} from './authLayout.interface';
import {ContentSectionWrapper, CustomCheckbox} from './styled-components';

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
  const pathName = usePathname();
  const searchParams = useSearchParams()!;
  const getUserId = searchParams && searchParams.get('id');
  const [signUpData, setSignUpData] = useState<any>();
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const {loading} = useAppSelector((state) => state.auth);
  const rememberPass: any = Cookies.get('remeber');
  const Verifytoken = searchParams.get('verifytoken');

  useEffect(() => {
    const tokendata: any = Cookies.get('token');
    if (tokendata && rememberPass === 'true') {
      dispatch(getUserByTokenAccess('')).then((payload: any) => {
        if (payload?.type?.split('/')?.[2]?.toString()?.includes('fulfilled')) {
          const dataaa: any = payload?.payload;
          dispatch(
            setUserInformation({
              id: dataaa?.id,
              user_name: dataaa?.user_name,
              Role: dataaa?.role,
              email: dataaa?.email,
              organization: dataaa?.organization,
              Admin: dataaa?.is_admin,
              QuoteAI: dataaa?.is_quote,
              DealReg: dataaa?.is_dealReg,
              OrderAI: dataaa?.is_order,
              username: dataaa?.email,
              master_admin: dataaa?.master_admin,
              ProfileImage: dataaa?.profile_image,
            }),
          );
          router.push(
            payload?.payload?.role === 'superAdmin'
              ? '/userManagement'
              : payload?.payload?.role === 'reseller' && dataaa?.is_quote
                ? '/crmInAccount'
                : '/dashboard',
          );
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
    }
  }, []);

  const onSubmitForm = (formValues: any, type: any) => {
    if (type === 'Verify Email') {
      const obj = {
        password: formValues?.password,
        token: Verifytoken,
      };
      dispatch(verifyEmail(obj)).then((d) => {
        if (d?.payload === undefined || !d?.payload) {
          notification?.open({
            message: 'Your email has already been verified. Please log in',
            type: 'info',
          });
          router.push('/login');
          return;
        }
        if (d?.payload) {
          router.push('/login');
        }
      });
    }

    const validateEmail = (email: any) =>
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    if (!formValues?.username && pathName !== '/login' && type === 'Log In') {
      notification?.open({
        message: 'Please enter the User name',
        type: 'error',
      });
      return;
    }
    if (
      (!formValues?.email && type === 'Log In') ||
      (!formValues?.email && type === 'Reset Password')
    ) {
      notification?.open({
        message: 'Please enter the email',
        type: 'error',
      });
      return;
    }
    if (
      (!validateEmail(formValues?.email) && type === 'Log In') ||
      (!validateEmail(formValues?.email) && type === 'Reset Password')
    ) {
      notification?.open({
        message: 'Please enter vaild organization email',
        type: 'error',
      });
      return;
    }
    const stringIn = formValues?.email?.split('@');
    const newcheck = stringIn?.[1]?.split('.');
    const checkss = [
      'gmail',
      'yahoo',
      'yahoo',
      'hotmail',
      'aol',
      'live',
      'outlook',
    ];
    const organizationValue = newcheck?.[0];

    if (checkss?.includes(newcheck?.[0])) {
      notification?.open({
        message: 'Please enter vaild organization email',
        type: 'error',
      });
      return;
    }
    const validatePassword = (pass: any) =>
      String(pass)?.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      );
    validatePassword(formValues?.password);
    if (
      (!formValues?.password && type === 'Log In') ||
      (!formValues?.password && type === 'Update Password')
    ) {
      notification?.open({
        message: 'Please Enter the Password',
        type: 'error',
      });
      return;
    }
    validatePassword(formValues?.confirm_password);
    if (!formValues?.confirm_password && type === 'Update Password') {
      notification?.open({
        message: 'Please Enter the Confirm Password',
        type: 'error',
      });
      return;
    }
    if (
      (formValues?.password && formValues?.password?.length < 8) ||
      (formValues?.confirm_password && formValues?.confirm_password?.length < 8)
    ) {
      notification?.open({
        message: 'Password must be more than 8 digits',
        type: 'error',
      });
      return;
    }
    if (
      type === 'Update Password' &&
      formValues?.password !== formValues?.confirm_password
    ) {
      notification?.open({
        message:
          'Both Passwords are different please check and again fill the passwords.',
        type: 'error',
      });
      return;
    }
    if (type == 'Log In') {
      dispatch(
        verifyAuth({
          email: formValues?.email?.toLowerCase(),
          password: formValues?.password,
        }),
      ).then((payload: any) => {
        if (payload?.payload?.status) {
          dispatch(
            setUserInformation({
              id: payload?.payload?.id,
              organization: payload?.payload?.organization,
              Role: payload?.payload?.role,
              Admin: payload?.payload?.is_admin,
              QuoteAI: payload?.payload?.is_quote,
              DealReg: payload?.payload?.is_dealReg,
              OrderAI: payload?.payload?.is_order,
              username: payload?.payload?.user_name,
              email: payload?.payload?.email?.toLowerCase(),
              master_admin: payload?.payload?.master_admin,
              ProfileImage: payload?.payload?.profile_image,
            }),
          );
          Cookies.set('token', payload.payload?.token, {
            expires: 0.8,
            secure: true,
            sameSite: 'strict',
          });
          router.push(
            payload?.payload?.role === 'superAdmin'
              ? '/userManagement'
              : payload?.payload?.is_email_invite
                ? `/newPassword?${payload?.payload?.id}`
                : payload?.payload?.role === 'reseller' &&
                    payload?.payload?.is_quote
                  ? '/crmInAccount'
                  : '/dashboard',
          );
        } else {
          notification?.open({
            message:
              payload?.payload ?? 'Invaild credentials! Please try again',
            type: 'error',
          });
        }
      });
    } else if (type === 'Update Password') {
      dispatch(
        updateUserPassword({
          id: getUserId,
          password: formValues?.confirm_password,
          is_email_invite: false,
        }),
      ).then(() => {
        router.push('/');
      });
    } else if (type === 'Reset Password') {
      dispatch(
        sendForgotPasswordEmail({
          recipientEmail: formValues?.email?.toLowerCase(),
          urlToGo: window.location.origin,
        }),
      ).then((d: any) => {
        if (d?.payload) {
          setShowDailogModal(true);
        } else {
          notification?.open({
            message:
              'User does not exist with this email address. Please try again with correct email!',
            type: 'error',
          });
        }
      });
    } else if (
      // formValues?.username &&
      // formValues?.password &&
      formValues?.email &&
      type === 'Create Account'
    ) {
      dispatch(
        signUpAuth({
          user_name: formValues?.email?.toLowerCase(),
          email: formValues?.email?.toLowerCase(),
          // password: formValues?.password,
          organization: organizationValue,
        }),
      ).then((payload: any) => {
        if (payload?.payload === undefined || !payload?.payload) {
          notification?.open({
            message:
              'User Already Exist with this Email. Please use other email instead!',
            type: 'error',
          });
          setSignUpData({});
          return;
        }
        if (payload?.type?.split('/')?.[1]?.toString() === 'rejected') {
          notification?.open({
            message: 'Something went wrong! Please try again',
            type: 'error',
          });
        } else {
          router.push('/login');
          notification?.open({
            message: 'Please check your Email for login instructions.',
            type: 'info',
          });
        }
      });
    }
  };

  const handleRember = (value: boolean) => {
    if (value) {
      Cookies.set('remeber', 'true');
    } else {
      Cookies.set('remeber', 'false');
    }
  };

  return (
    <>
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
                return (
                  <Form.Item
                    style={{
                      width: item?.type === 'password' ? '' : '456px',
                    }}
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
                        value={item.name}
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
                  <CustomCheckbox
                    token={token}
                    onChange={(e: any) => {
                      handleRember(e?.target.checked);
                    }}
                    defaultChecked={rememberPass === 'true' || false}
                  >
                    <Typography name="Body 3/Regular">
                      Remember Password
                    </Typography>
                  </CustomCheckbox>
                  <Typography
                    name="Body 3/Bold"
                    cursor="pointer"
                    color={token?.colorLink}
                    onClick={() => {
                      router.push('/forgotpassword');
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Space>
              )}

              <Form.Item style={{marginTop: '80px'}}>
                <OsButton
                  loading={loading}
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
                      onClick={() => {
                        setSignUpData('');
                        router?.push('/signUp');
                      }}
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

      <DailogModal
        width={700}
        setShowDailogModal={setShowDailogModal}
        showDailogModal={showDailogModal}
        title="Your Forgot Password request raised successfully"
        subTitle="Check your inbox for instructions to create a new password."
        icon={
          <CheckCircleIcon width={35} height={35} color={token?.colorSuccess} />
        }
        primaryButtonText="Done"
        onOk={() => {
          setShowDailogModal(false);
          router.push('/');
        }}
      />
    </>
  );
};

export default ContentSection;
