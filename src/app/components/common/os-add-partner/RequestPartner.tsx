'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useState} from 'react';
import {
  getAssignPartnerProgramByOrganization,
  insertAssignPartnerProgram,
} from '../../../../../redux/actions/assignPartnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsPartnerProgramSelect from '../os-partner-program-select';
import OsPartnerSelect from '../os-partner-select';
import {RequestPartnerInterface} from './os-add-partner.interface';

const RequestPartner: React.FC<RequestPartnerInterface> = ({form, setOpen}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const [partnerValue, setPartnerValue] = useState<number>();

  const onFinish = async (value: any) => {
    try {
      const partnerObj = {
        ...value,
        organization: userInformation?.organization,
        requested_by: userInformation?.id,
        new_request: true,
      };
      if (partnerObj) {
        await dispatch(insertAssignPartnerProgram(partnerObj));
      }
      form?.resetFields();
      dispatch(
        getAssignPartnerProgramByOrganization({
          organization: userInformation?.organization,
        }),
      );
    } catch (error) {
      // Handle errors here
      console.error('Error occurred:', error);
    } finally {
      setOpen(false);
    }
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
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <OsPartnerSelect
                name="partner_id"
                setPartnerValue={setPartnerValue}
                // form={form}
                partnerProgramName="partner_program_id"
                isRequired
                isSuperAdmin={false}
                notApprovedData
                isAddNewPartner
              />
            </Col>

            <Col sm={24} md={12}>
              <OsPartnerProgramSelect
                name="partner_program_id"
                partnerId={partnerValue}
                form={form}
                isRequired
                isAddNewProgram
                notApprovedData
              />
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default RequestPartner;
