/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {getAllPartnerandProgram} from '../../../../../redux/actions/partner';
import {
  insertPartnerProgram,
  updatePartnerProgramById,
} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {AddPartnerInterface} from '../os-add-partner/os-add-partner.interface';
import OsPartnerSelect from '../os-partner-select';
import {usePathname} from 'next/navigation';

const AddPartnerProgram: React.FC<AddPartnerInterface> = ({
  form,
  setOpen,
  drawer = false,
  formPartnerData,
  partnerId,
  setUpdateTheObject,
  updateTheObject,
  getAllPartnerData,
  partnerData,
  setFinalProgramOptions,
  finalProgramOptions,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const {userInformation} = useAppSelector((state) => state.user);
  const [partnerValue, setPartnerValue] = useState<number>();
  useEffect(() => {
    form?.resetFields();
    if (updateTheObject) {
      form.setFieldsValue(updateTheObject);
    }
  }, [updateTheObject]);
  const onFinish = async (value: any) => {
    const partnerProgramObj = {
      ...value,
      organization: userInformation?.organization,
      user_id: userInformation?.id,
      partner: partnerValue ?? partnerId,
    };
    if (drawer) {
      await dispatch(
        updatePartnerProgramById({
          ...partnerProgramObj,
          id: updateTheObject ? updateTheObject?.id : formPartnerData?.id,
        }),
      ).then((d: any) => {
        if (d?.payload) {
          form?.resetFields();
          getAllPartnerData();
          setUpdateTheObject({});
          // dispatch(getAllPartnerandProgram(''));
          setOpen && setOpen(false);
        }
      });
    } else {
      if (pathname === '/partners') {
        partnerProgramObj.admin_approved = false;
      }
      dispatch(insertPartnerProgram(partnerProgramObj)).then((d: any) => {
        if (d?.payload) {
          form?.resetFields();
          if (finalProgramOptions) {
            let newObj = {
              label: d?.payload?.partner_program,
              value: d?.payload?.id,
            };
            if (newObj) {
              let newArr: any =
                finalProgramOptions?.length > 0
                  ? [newObj, ...finalProgramOptions]
                  : [newObj];
              setFinalProgramOptions(newArr);
            }
          }
          if (getAllPartnerData) {
            getAllPartnerData();
          }
          setOpen && setOpen(false);
        }
      });
    }
    form?.resetFields();
    if (setUpdateTheObject) {
      setUpdateTheObject({});
    }
  };

  useEffect(() => {
    form?.resetFields();
  }, [formPartnerData]);

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
          gutter={[0, 16]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Add New Partner Program
          </Typography>
        </Row>
      )}

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: !drawer ? '24px 40px 20px 40px' : ''}}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          initialValues={updateTheObject ? updateTheObject : formPartnerData}
        >
          {!partnerId && (
            <OsPartnerSelect
              name="partner"
              // form={form}
              setPartnerValue={setPartnerValue}
              isRequired
              allPartnerData={partnerData}
            />
          )}
          <Form.Item
            label="Partner Program"
            name="partner_program"
            rules={[{required: true, message: 'Please Enter Partner Program!'}]}
          >
            <OsInput placeholder="Partner Program here" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <OsInput placeholder="Write Description here" />
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};

export default AddPartnerProgram;
