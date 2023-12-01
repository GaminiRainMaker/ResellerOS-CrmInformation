import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import React from 'react';

const LogIn = () => (
  <>
    <AuthLayout
      heading="Welcome Back!"
      description="Enter your credentials to access your account."
      email
      password
      registerNow
      rememberPassword
    />
  </>
);

export default LogIn;
