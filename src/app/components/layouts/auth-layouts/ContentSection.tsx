/* eslint-disable eqeqeq */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
import {Form, notification} from 'antd';
import Image from 'next/image';
import {FC, useEffect, useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import OSResellerLogo from '../../../../../public/assets/static/ResellerOsText.svg';
import eyeSlashIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import eyeIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import {signUpAuth, verifyAuth} from '../../../../../redux/actions/auth';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setUserInformation} from '../../../../../redux/slices/user';
import {Space} from '../../common/antd/Space';
import useThemeToken from '../../common/hooks/useThemeToken';
import OsButton from '../../common/os-button';
import OsInput from '../../common/os-input';
import OsInputPassword from '../../common/os-input/InputPassword';
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
  const [signUpData, setSignUpData] = useState<any>();

  const {loading} = useAppSelector((state) => state.auth);

  useEffect(() => {
    const tokendata: any = Cookies.get('token');
    if (tokendata) {
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
            }),
          );
          router.push(
            payload?.payload?.role === 'superAdmin'
              ? '/userManagement'
              : '/crmInAccount',
          );
        }
      });
    }
  }, []);

  const onSubmitForm = (formValues: any, type: any) => {
    const validateEmail = (email: any) =>
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    // if (!formValues?.username) {
    //   notification?.open({
    //     message: 'Please enter the User name',
    //     type: 'error',
    //   });
    //   return;
    // }
    if (!formValues?.email) {
      notification?.open({
        message: 'Please enter the email',
        type: 'error',
      });
      return;
    }
    if (!validateEmail(formValues?.email)) {
      notification?.open({
        message: 'Please enter vaild organization email',
        type: 'error',
      });
      return;
    }

    const stringIn = formValues?.email.split('@');
    const newcheck = stringIn[1].split('.');
    const checkss = [
      'gmail',
      'yahoo',
      'yahoo',
      'hotmail',
      'aol',
      'live',
      'outlook',
    ];
    const organizationValue = newcheck[0];

    if (checkss.includes(newcheck[0])) {
      notification?.open({
        message: 'Please enter vaild organization email',
        type: 'error',
      });
      return;
    }
    const validatePassword = (pass: any) =>
      String(pass).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      );
    validatePassword(formValues?.password);
    if (!formValues?.password) {
      notification?.open({
        message: 'Please Enter the Password',
        type: 'error',
      });
      return;
    }
    if (formValues?.password && formValues?.password.length < 8) {
      notification?.open({
        message: 'Password must be more than 8 digits',
        type: 'error',
      });
      return;
    }

    if (type == 'Log In') {
      dispatch(
        verifyAuth({
          email: formValues?.email,
          password: formValues?.password,
        }),
      ).then((payload) => {
        if (payload?.payload) {
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
              email: payload?.payload?.email,
              master_admin: payload?.payload?.master_admin,
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
              : '/crmInAccount',
          );
        } else {
          notification?.open({
            message: 'Invaild credentials! Please try again',
            type: 'error',
          });
        }
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
          organization: organizationValue,
        }),
      ).then((payload) => {
        if (payload?.payload === undefined || !payload?.payload) {
          notification?.open({
            message:
              'User Already Exist with this Email.Please use other email instead!',
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
        }
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
                <CustomCheckbox token={token}>
                  <Typography name="Body 3/Regular">
                    Remember Password
                  </Typography>
                </CustomCheckbox>
                {/* <Typography
                  name="Body 3/Bold"
                  cursor="pointer"
                  color={token?.colorLink}
                
                >
                  Forgot Password?
                </Typography> */}
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
  );
};

export default ContentSection;
