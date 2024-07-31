import {Col, Row} from '@/app/components/common/antd/Grid';
import OsPartnerProgramSelect from '@/app/components/common/os-partner-program-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {UserManagementInterface} from './userManagement.interface';
import {getPartnerCanAddedToOrganization} from '../../../../../redux/actions/partner';
import {useAppDispatch} from '../../../../../redux/hook';

const AssignPartnerProgram: FC<UserManagementInterface> = ({
  form,
  onFinish,
  organizationCurrent,
}) => {
  const [partnerToBeAssigned, setPartnerToBeAssigned] = useState<any>();
  const dispatch = useAppDispatch();
  const [partnerValue, setPartnerValue] = useState<number>();

  useEffect(() => {
    dispatch(
      getPartnerCanAddedToOrganization({organization: organizationCurrent}),
    )?.then((payload: any) => {
      setPartnerToBeAssigned(payload?.payload);
    });
  }, [organizationCurrent]);
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
            organizationName={organizationCurrent}
            name="partner_id"
            setPartnerValue={setPartnerValue}
            // form={form}
            partnerProgramName="partner_program_id"
            isRequired
            isSuperAdmin
            allPartnerData={partnerToBeAssigned}
          />
        </Col>

        <Col sm={24} md={12}>
          <OsPartnerProgramSelect
            organizationName={organizationCurrent}
            name="partner_program_id"
            partnerId={partnerValue}
            form={form}
            isRequired
            notApprovedData
            allPartnerData={partnerToBeAssigned}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AssignPartnerProgram;
