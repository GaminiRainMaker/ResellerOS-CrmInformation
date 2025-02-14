import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import React, {Suspense} from 'react';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';

const ForgotPasword = () => {
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
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout
        heading="Forgot Password"
        description="Don’t worry, reset your password here!"
        inputFields={inputFields}
        buttonText="Reset Password"
      />
    </Suspense>
  );
};

export default ForgotPasword;
