'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {
  getAllPartnerTemp,
  insertPartner,
} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {RequestPartnerInterface} from './os-add-partner.interface';

const RequestPartner: React.FC<RequestPartnerInterface> = ({form, setOpen}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);

  const onFinish = (value: any) => {
    const partnerObj = {
      ...value,
      organization: userInformation?.organization,
    };
    dispatch(insertPartner(partnerObj)).then(() => {
      form?.resetFields(['partner', 'partner_program']);
      dispatch(getAllPartnerTemp());
    });
    setOpen(false);
  };

  return (
    <>
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
          Request New Partner
        </Typography>
      </Row>

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Partner Name"
            name="partner"
            rules={[{required: true, message: 'Please Enter Partner!'}]}
          >
            <OsInput placeholder="Enter Partner" />
          </Form.Item>

          <Form.Item
            label="Partner Program Name"
            name="partner_program"
            rules={[{required: true, message: 'Please Enter Partner Program!'}]}
          >
            <OsInput placeholder="Enter Partner Program" />
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};

export default RequestPartner;
