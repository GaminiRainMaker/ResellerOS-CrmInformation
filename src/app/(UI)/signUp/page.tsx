'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import {Suspense} from 'react';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';

const SignUP = () => {
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
        heading="Create Account"
        description="Welcome to Reseller OS ! Create account and enjoy the selling experience."
        buttonText="Create Account"
        inputFields={inputFields}
        alreadyAmember
        // onFinish
        onClick=""
      />
    </Suspense>
  );
};

export default SignUP;
