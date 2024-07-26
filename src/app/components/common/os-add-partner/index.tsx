/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {industryOptions} from '@/app/utils/CONSTANTS';
import {Form} from 'antd';
import {useEffect} from 'react';
import {
  getAllPartnerandProgram,
  insertPartner,
  updatePartnerById,
} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import CommonSelect from '../os-select';
import {AddPartnerInterface} from './os-add-partner.interface';

const AddPartner: React.FC<AddPartnerInterface> = ({
  form,
  setOpen,
  drawer = false,
  formPartnerData,
  partnerId,
  setUpdateTheObject,
  updateTheObject,
  getAllPartnerData,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  useEffect(() => {
    if (updateTheObject) {
      form.setFieldsValue(updateTheObject);
    }
  }, []);
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
      getAllPartnerData();
      setUpdateTheObject({});
      setOpen && setOpen(false);
    } else {
      await dispatch(insertPartner(partnerObj)).then((d: any) => {
        if (d?.payload) {
          dispatch(getAllPartnerandProgram(''));
          form?.resetFields();
          setOpen && setOpen(false);
        }
      });
    }
    form?.resetFields();
    setUpdateTheObject({});
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
                  {required: true, message: 'Please Enter email!'},
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
