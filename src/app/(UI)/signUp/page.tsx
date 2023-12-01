'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import {useRouter} from 'next/navigation';
import {createUser} from '../../../../redux/actions/user';
import userIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/user.svg';
import smsIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/sms.svg';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import {useAppDispatch, useAppSelector} from '../../../../redux/hook';

const SignUP = () => {
  const dispatch = useAppDispatch();

  const {data} = useAppSelector((state) => state.user);
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

  const onFinish = (e: any, formValues: any) => {
    console.log(formValues, 'dfbhsdhfdsh');

    // dispatch(
    //   createUser({
    //     user_name: 'gamini',
    //     email: 'gamini@gmail.com',
    //     password: 'check@123',
    //   }),
    // ).then(() => {
    //   router.push('/login');
    // });
  };

  return (
    <>
      <div>
        <AuthLayout
          heading="Create Account"
          description="Welcome to Reseller OS ! Create account and enjoy the selling experience."
          buttonText="Create Account"
          inputFields={inputFields}
          // email
          // password
          // username
          alreadyAmember
          // form={form}
          onClick={onFinish}
        />
      </div>
      {/* <OsButton onClick={onFinish}>Submit</OsButton> */}
    </>
  );
};

export default SignUP;
