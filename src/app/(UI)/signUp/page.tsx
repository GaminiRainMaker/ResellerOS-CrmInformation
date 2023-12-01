'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import {useRouter} from 'next/navigation';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';
import userIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/user.svg';
import {createUser} from '../../../../redux/actions/user';
import {useAppDispatch} from '../../../../redux/hook';

const SignUP = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const inputFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username here!',
      icon: userIcon,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Enter your email here!',
      icon: smsIcon,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Minimum 8 characters',
      icon: eyeIcon,
    },
  ];

  const onFinish = (formValues: any) => {
    if (formValues?.username && formValues?.password && formValues?.email) {
      dispatch(
        createUser({
          user_name: formValues?.username,
          email: formValues?.email,
          password: formValues?.password,
        }),
      ).then(() => {
        router.push('/login');
      });
    }
  };

  return (
    <AuthLayout
      heading="Create Account"
      description="Welcome to Reseller OS ! Create account and enjoy the selling experience."
      buttonText="Create Account"
      inputFields={inputFields}
      alreadyAmember
      onClick={onFinish}
    />
  );
};

export default SignUP;
