import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import React from 'react';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';

const ForgotPasword = () => {
  console.log('dsff');

  const inputFields = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Enter your email here!',
      icon: smsIcon,
    },
  ];

  return (
    <AuthLayout
      heading="Forgot Password"
      description="Don’t worry, reset your password here!"
      inputFields={inputFields}
      buttonText="Reset Password"
    />
  );
};

export default ForgotPasword;
