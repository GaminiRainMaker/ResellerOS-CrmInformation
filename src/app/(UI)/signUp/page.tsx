'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';
import userIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/user.svg';

const SignUP = () => {
  const inputFields = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Enter your email here!',
      icon: smsIcon,
    },
    // {
    //   name: 'username',
    //   label: 'Username',
    //   type: 'text',
    //   placeholder: 'Enter your username here!',
    //   icon: userIcon,
    // },

    // {
    //   name: 'password',
    //   type: 'password',
    //   label: 'Password',
    //   placeholder: 'Minimum 8 characters',
    //   icon: eyeIcon,
    // },
  ];

  return (
    <AuthLayout
      heading="Create Account"
      description="Welcome to Reseller OS ! Create account and enjoy the selling experience."
      buttonText="Create Account"
      inputFields={inputFields}
      alreadyAmember
      // onFinish
      onClick=""
    />
  );
};

export default SignUP;
