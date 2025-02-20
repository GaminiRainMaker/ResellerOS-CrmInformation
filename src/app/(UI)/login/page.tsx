'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';
import { loginUser } from '../../../../redux/actions/user';
import { useAppDispatch } from '../../../../redux/hook';

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout
        heading="Welcome Back!"
        description="Enter your credentials to access your account."
        registerNow
        rememberPassword
        buttonText="Log In"
        inputFields={inputFields}
        onClick={onClick}
      />
    </Suspense>
  );
};

export default LogIn;
