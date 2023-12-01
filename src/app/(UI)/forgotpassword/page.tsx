import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import React from 'react';

const ForgotPasword = () => {
  console.log('dsff');
  return (
    <AuthLayout
      heading="Forgot Password"
      description="Don’t worry, reset your password here!"
      email
      buttonText="Reset Password"
    />
  );
};

export default ForgotPasword;
