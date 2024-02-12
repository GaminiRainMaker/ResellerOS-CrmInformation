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
  getAllPartner,
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
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);

  const onFinish = (value: any) => {
    const partnerObj = {
      ...value,
      organization: userInformation?.organization,
    };
    if (drawer) {
      dispatch(updatePartnerById({...partnerObj, id: formPartnerData?.id}));
    } else {
      dispatch(insertPartner(partnerObj)).then(() => {
        form?.resetFields();
      });
    }
    dispatch(getAllPartner());
    setOpen(false);
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
          initialValues={formPartnerData}
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
            <Col sm={24} span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please Enter email!'}]}
              >
                <OsInput placeholder="info@email.com" />
              </Form.Item>
            </Col>
            <Col sm={24} span={12}>
              <Form.Item label="Website" name="website">
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
