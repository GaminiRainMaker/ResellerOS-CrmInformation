'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';

const VerifyEmail = () => {
  return (
    <AuthLayout
      heading="Verify Your Email"
      description="Please click the button below to verify your email and complete your account setup."
      buttonText="Verify Email"
      alreadyAmember
      // onFinish
      onClick=""
    />
  );
};

export default VerifyEmail;
