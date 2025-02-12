'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';

const inputFields = [
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Minimum 8 characters',
    icon: eyeIcon,
  },
];

const VerifyEmail = () => {
  return (
    <AuthLayout
      heading="Verify Your Email"
      description="Please click the button below to verify your email and complete your account setup."
      buttonText="Verify Email"
      alreadyAmember
      inputFields={inputFields}
      // onFinish
      onClick=""
    />
  );
};

export default VerifyEmail;
