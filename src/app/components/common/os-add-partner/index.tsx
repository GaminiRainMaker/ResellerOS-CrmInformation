/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {industryOptions} from '@/app/utils/CONSTANTS';
import {Form, notification} from 'antd';
import {useEffect} from 'react';
import {
  getAllPartnerandProgram,
  insertPartner,
  updatePartnerById,
} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import CommonSelect from '../os-select';
import {AddPartnerInterface} from './os-add-partner.interface';
import {usePathname, useSearchParams} from 'next/navigation';

const AddPartner: React.FC<AddPartnerInterface> = ({
  form,
  setOpen,
  drawer = false,
  formPartnerData,
  partnerId,
  setUpdateTheObject,
  updateTheObject,
  getPartnerDataForSuperAdmin,
  setPartnerOptions,
  partnerOptions,
  setPartnerValue,
  setPartnerNewId,
}) => {
  const [token] = useThemeToken();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const {isCanvas, isDecryptedRecord} = useAppSelector((state) => state.canvas);

  useEffect(() => {
    form?.resetFields();
    if (updateTheObject) {
      form.setFieldsValue(updateTheObject);
    }
  }, [updateTheObject]);
  const onFinish = async (value: any) => {
    const partnerObj = {
      ...value,
      organization: userInformation?.organization,
      user_id: userInformation?.id,
    };
    if (drawer) {
      await dispatch(
        updatePartnerById({
          ...partnerObj,
          id: updateTheObject ? updateTheObject?.id : formPartnerData?.id,
        }),
      );
      getPartnerDataForSuperAdmin();
      if (setUpdateTheObject) {
        setUpdateTheObject({});
      }
      setOpen && setOpen(false);
    } else {
      if (pathname === '/superAdminPartner') {
        partnerObj.admin_approved = true;
      }
      if (!userInformation?.Admin) {
        partnerObj.admin_request = false;
      }
      if (isCanvas) {
        (partnerObj.admin_request = true),
          (partnerObj.organization =
            isDecryptedRecord?.context?.organization?.name),
          (partnerObj.salesforce_username =
            isDecryptedRecord?.context?.user?.userName);
      }
      await dispatch(insertPartner(partnerObj)).then((d: any) => {
        if (d?.payload) {
          let newObj = {
            name: d?.payload?.partner,
            value: d?.payload?.id,
          };
          if (setPartnerNewId) {
            setPartnerNewId(newObj);
          }
          if (partnerOptions) {
            form?.setFieldsValue(['partner_id', d?.payload?.id]);
            setPartnerValue(d?.payload?.id);
          }
          if (getPartnerDataForSuperAdmin) {
            getPartnerDataForSuperAdmin();
          }
          form?.resetFields();
          setOpen && setOpen(false);
        } else {
          notification.open({
            message: 'Partner with the same name already exists.',
            type: 'error',
          });
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
            Add New Partner
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
          <Form.Item
            label="Partner Name"
            name="partner"
            rules={[{required: true, message: 'Please Enter Partner!'}]}
          >
            <OsInput placeholder="Partner name here" />
          </Form.Item>

          <Form.Item
            label="Industry"
            name="industry"
            rules={[{required: true, message: 'Please select industry!'}]}
          >
            <CommonSelect
              style={{width: '100%'}}
              placeholder="Select"
              options={industryOptions}
              allowClear
            />
          </Form.Item>
          <Row justify="space-between" gutter={[16, 16]}>
            <Col span={drawer ? 24 : 12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  // {required: true, message: 'Please Enter email!'},
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter valid email.',
                  },
                ]}
              >
                <OsInput placeholder="info@email.com" />
              </Form.Item>
            </Col>
            <Col span={drawer ? 24 : 12}>
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  {
                    pattern:
                      /^((https?|ftp):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
                    message: 'Please enter valid website.',
                  },
                ]}
              >
                <OsInput placeholder="www.website.com" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddPartner;
