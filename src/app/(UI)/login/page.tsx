'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import {useRouter} from 'next/navigation';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';
import {useAppDispatch} from '../../../../redux/hook';
import {loginUser} from '../../../../redux/actions/user';
import {useEffect} from 'react';

const LogIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onClick = (formValues: any) => {
    if (formValues?.password && formValues?.email) {
      dispatch(
        loginUser({
          email: formValues?.email,
          password: formValues?.password,
        }),
      ).then((d: any) => {
        if (d?.is_email_active) {
          router.push('/');
        } else {
          router.push('/');
        }
      });
    }
  };

  const inputFields = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Enter your email here!',
      icon: smsIcon,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Minimum 8 characters',
      icon: eyeIcon,
    },
  ];

  useEffect(() => {
    const fetchWsEndpoint = async () => {
      try {
        const response = await fetch('/api/playwright');
        const data = await response.json();

        if (response.ok) {
          console.log(data.wsEndpoint);
        } else {
          console.log(data.error || 'Failed to fetch WebSocket endpoint');
        }
      } catch (err: any) {
        console.log(err.message || 'An error occurred');
      }
    };

    fetchWsEndpoint();
  }, []);

  return (
    <>
      <AuthLayout
        heading="Welcome Back!"
        description="Enter your credentials to access your account."
        registerNow
        rememberPassword
        buttonText="Log In"
        inputFields={inputFields}
        onClick={onClick}
      />
    </>
  );
};

export default LogIn;
