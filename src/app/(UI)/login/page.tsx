'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import Form from 'antd/es/form';

const LogIn = () => {
  const [form] = Form.useForm();
  const onClick = () => {
    console.log('object');
  };

  return (
    <>
      <AuthLayout
        heading="Welcome Back!"
        description="Enter your credentials to access your account."
        email
        password
        registerNow
        rememberPassword
        buttonText="Create Account"
        // form={form}
        onClick={onClick}
      />
    </>
  );
};

export default LogIn;
