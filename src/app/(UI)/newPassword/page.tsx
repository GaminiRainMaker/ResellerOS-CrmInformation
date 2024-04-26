import AuthLayout from '@/app/components/layouts/auth-layouts/AuthLayout';
import eyeIcon from '../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';

const NewPasword = () => {
  const inputFields = [
    {
      name: 'password',
      type: 'password',
      label: 'New Password',
      placeholder: 'Minimum 8 characters',
      icon: eyeIcon,
    },
    {
      name: 'confirm_password',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Minimum 8 characters',
      icon: eyeIcon,
    },
  ];

  return (
    <AuthLayout
      heading="Set New Password"
      description="Please update your password here!"
      inputFields={inputFields}
      buttonText="Update Password"
    />
  );
};

export default NewPasword;
