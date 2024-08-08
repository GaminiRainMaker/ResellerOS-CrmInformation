import {Col, Row} from '@/app/components/common/antd/Grid';
import OsPartnerProgramSelect from '@/app/components/common/os-partner-program-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {UserManagementInterface} from './userManagement.interface';
import {getPartnerCanAddedToOrganization} from '../../../../../redux/actions/partner';
import {useAppDispatch} from '../../../../../redux/hook';
import useCustomCapitaliationLabel from '@/app/components/common/hooks/useCustomCapitaliationLabel';
import GlobalLoader from '@/app/components/common/os-global-loader';

const AssignPartnerProgram: FC<UserManagementInterface> = ({
  form,
  onFinish,
  organizationCurrent,
}) => {
  const [partnerToBeAssigned, setPartnerToBeAssigned] = useState<any>();
  const dispatch = useAppDispatch();
  const [partnerValue, setPartnerValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getPartnerCanAddedToOrganization({organization: organizationCurrent}),
    )?.then((payload: any) => {
      let newArrrFinal: any = [];
      payload?.payload?.map((itemsPart: any) => {
        let partnerProgramarr: any = [];
        if (
          itemsPart?.PartnerPrograms &&
          itemsPart?.PartnerPrograms?.length > 0
        ) {
          itemsPart?.PartnerPrograms?.map((item: any) => {
            if (
              item?.form_data?.length > 0 &&
              !item?.form_data?.includes(null)
            ) {
              partnerProgramarr?.push(item);
            }
          });
        }

        if (partnerProgramarr?.length > 0) {
          let newObj = {...itemsPart};
          delete newObj.PartnerPrograms;
          newObj.PartnerPrograms = partnerProgramarr;
          newArrrFinal?.push(newObj);
        }
      });
      setLoading(false);
      setPartnerToBeAssigned(newArrrFinal);
    });
  }, [organizationCurrent]);
  return (
    <GlobalLoader loading={loading}>
      {' '}
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
              allPartnerDataForSuperAdmin={partnerToBeAssigned}
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
    </GlobalLoader>
  );
};

export default AssignPartnerProgram;
