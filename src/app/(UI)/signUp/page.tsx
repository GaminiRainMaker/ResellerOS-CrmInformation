'use client';

import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import Form from 'antd/es/form';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '../../../../redux/hook';

const SignUP = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // const {data} = useAppSelector((state) => state.user);
  const router = useRouter();

  const onFinish = () => {
    console.log('fsfssf', form.getFieldsValue);

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
          email
          password
          username
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
