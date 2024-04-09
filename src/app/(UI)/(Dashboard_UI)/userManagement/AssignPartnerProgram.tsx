import {Col, Row} from '@/app/components/common/antd/Grid';
import OsPartnerProgramSelect from '@/app/components/common/os-partner-program-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {partnerProgramFilter} from '@/app/utils/base';
import {UserManagementInterface} from './userManagement.interface';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  getAllPartner,
  getAllPartnerandProgram,
} from '../../../../../redux/actions/partner';

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
            // form={form}
            partnerProgramName="partner_program_id"
            isRequired
            isSuperAdmin
          />
        </Col>

        <Col sm={24} md={12}>
          <OsPartnerProgramSelect
            name="partner_program_id"
            partnerId={partnerValue}
            form={form}
            isRequired
            notApprovedData
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AssignPartnerProgram;
