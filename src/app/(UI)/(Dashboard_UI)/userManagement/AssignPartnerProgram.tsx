import {Col, Row} from '@/app/components/common/antd/Grid';
import OsPartnerProgramSelect from '@/app/components/common/os-partner-program-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import {Form} from 'antd';
import {FC, useState} from 'react';
import {UserManagementInterface} from './userManagement.interface';

const AssignPartnerProgram: FC<UserManagementInterface> = ({
  form,
  onFinish,
}) => {
  const [partnerValue, setPartnerValue] = useState<number>();

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      requiredMark={false}
    >
      <br />
      <br />
      <Row justify="space-between" gutter={[24, 24]}>
        <Col sm={24} md={12}>
          <OsPartnerSelect
            name="partner_id"
            setPartnerValue={setPartnerValue}
            form={form}
            partnerProgramName="partner_program_id"
            isRequired
          />
        </Col>

        <Col sm={24} md={12}>
          <OsPartnerProgramSelect
            name="partner_program_id"
            partnerId={partnerValue}
            form={form}
            isRequired
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AssignPartnerProgram;
