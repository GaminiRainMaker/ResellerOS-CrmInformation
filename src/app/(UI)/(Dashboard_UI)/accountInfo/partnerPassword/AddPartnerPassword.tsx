'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import OsInputPassword from '@/app/components/common/os-input/InputPassword';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {partnerProgramFilter} from '@/app/utils/base';
import {Form} from 'antd';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import eyeSlashIcon from '../../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import eyeIcon from '../../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';
import {getAllPartnerandProgram} from '../../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

const AddPartnerPassword: React.FC<any> = ({
  onFinish,
  drawer,
  partnerPasswordForm,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: partnerData} = useAppSelector((state) => state.partner);
  const {userInformation} = useAppSelector((state) => state.user);
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();

  useEffect(() => {
    dispatch(getAllPartnerandProgram(''));
  }, []);
  useEffect(() => {
    const FilterArrayDataa = partnerProgramFilter(
      'user',
      userInformation,
      partnerData,
      2,
      true,
    );

    setAllFilterPartnerData(FilterArrayDataa?.filterData);
  }, [partnerData]);

  const partnerOptions = allPartnerFilterData?.map((partner: any) => ({
    label: <CustomTextCapitalization text={partner?.partner} />,
    value: partner?.id,
  }));

  return (
    <>
      {!drawer && (
        <Row
          justify="space-between"
          style={{
            padding: '24px 40px 20px 40px',
            backgroundColor: '#F0F4F7',
            borderRadius: '10px 10px 0px 0px',
          }}
          gutter={[0, 0]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            New Credentials
          </Typography>
        </Row>
      )}

      <Form
        layout="vertical"
        requiredMark={false}
        style={{
          padding: drawer ? '0px' : '40px',
        }}
        form={partnerPasswordForm}
        onFinish={onFinish}
      >
        <Row gutter={[8, 0]} justify="space-between">
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Partner</Typography>}
              name={'partner_id'}
              rules={[
                {
                  required: true,
                  message: 'Partner is required!',
                },
              ]}
            >
              <CommonSelect
                allowClear
                placeholder="Select"
                style={{width: '100%'}}
                options={partnerOptions}
              />
            </SelectFormItem>
          </Col>
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Username</Typography>}
              name="username"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Please enter valid username.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Email</Typography>}
              name="email"
              rules={[
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter valid email.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Password</Typography>}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Password is required.',
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters long.',
                },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
                },
              ]}
            >
              <OsInputPassword
                // disabled={isEditable}
                iconRender={(visible) =>
                  visible ? (
                    <Image
                      src={eyeIcon}
                      alt="eyeIcon"
                      width={24}
                      height={24}
                      style={{cursor: 'pointer'}}
                    />
                  ) : (
                    <Image
                      src={eyeSlashIcon}
                      alt="eyeSlashIcon"
                      width={24}
                      height={24}
                      style={{cursor: 'pointer'}}
                    />
                  )
                }
                placeholder="Minimum 8 characters"
                style={{width: '100%'}}
              />
            </SelectFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddPartnerPassword;
