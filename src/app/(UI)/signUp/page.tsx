import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import React from 'react';

const SignUP = () => {
  console.log('object');
  return (
    <div>
      <AuthLayout
        heading="Create Account"
        description="Welcome to Reseller OS ! Create account and enjoy the selling experience."
        email
        password
        username
        alreadyAmember
      />
    </div>
  );
};

export default SignUP;
