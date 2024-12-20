import {Col, Row} from '@/app/components/common/antd/Grid';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import EmptyContainer from '@/app/components/common/os-empty-container';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsPartnerProgramSelect from '@/app/components/common/os-partner-program-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {
  getAllPartnerandProgramApprovedForOrganization,
  getAllPartnerandProgramApprovedForOrganizationSalesForce,
  getPartnerCanAddedToOrganization,
} from '../../../../../redux/actions/partner';
import {useAppDispatch} from '../../../../../redux/hook';
import {UserManagementInterface} from './userManagement.interface';

const AssignPartnerProgram: FC<UserManagementInterface> = ({
  form,
  onFinish,
  selectedRowRecord,
  activeKey,
  setActiveKey,
}) => {
  const [partnerToBeAssigned, setPartnerToBeAssigned] = useState<any>();
  const dispatch = useAppDispatch();
  const [partnerValue, setPartnerValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [alreadyAssignedPartner, setAlreadyAssignedPartner] = useState<any>();

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      getPartnerCanAddedToOrganization({
        organization: selectedRowRecord?.organization,
      }),
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

    if (selectedRowRecord?.org_id) {
      dispatch(
        getAllPartnerandProgramApprovedForOrganizationSalesForce({
          org_id: selectedRowRecord?.org_id,
        }),
      )?.then((payload: any) => {
        setAlreadyAssignedPartner(payload?.payload);
      });
    } else {
      dispatch(
        getAllPartnerandProgramApprovedForOrganization({
          organization: selectedRowRecord?.organization,
        }),
      )?.then((payload: any) => {
        setAlreadyAssignedPartner(payload?.payload);
      });
    }
  }, [selectedRowRecord]);

  const AssignedPartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 187,
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'program',
      key: 'program',
      render: (text: string, record: any) => (
        <CustomTextCapitalization
          text={record?.PartnerPrograms?.map(
            (program: any) => program.partner_program,
          ).join(', ')}
        />
      ),
      width: 190,
    },
  ];

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  return (
    <GlobalLoader loading={loading}>
      {' '}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
      >
        <OsTabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: (
                <Typography name="Body 4/Regular">
                  Assign Partner Program
                </Typography>
              ),
              key: '1',
              children: (
                <Row justify="space-between" gutter={[24, 24]}>
                  <Col sm={24} md={12}>
                    <OsPartnerSelect
                      organizationName={selectedRowRecord?.organization}
                      name="partner_id"
                      setPartnerValue={setPartnerValue}
                      partnerProgramName="partner_program_id"
                      isRequired
                      isSuperAdmin
                      allPartnerDataForSuperAdmin={partnerToBeAssigned}
                    />
                  </Col>

                  <Col sm={24} md={12}>
                    <OsPartnerProgramSelect
                      organizationName={selectedRowRecord?.organization}
                      name="partner_program_id"
                      partnerId={partnerValue}
                      form={form}
                      isRequired
                      notApprovedData
                      allPartnerData={partnerToBeAssigned}
                    />
                  </Col>
                </Row>
              ),
            },
            {
              label: (
                <Typography name="Body 4/Regular">
                  Assigned Partner Program
                </Typography>
              ),
              key: '2',
              children: (
                <OsTable
                  loading={false}
                  columns={AssignedPartnerColumns}
                  dataSource={alreadyAssignedPartner?.AllPartner}
                  scroll
                  locale={locale}
                  scrolly={400}
                />
              ),
            },
          ]}
        />
      </Form>
    </GlobalLoader>
  );
};

export default AssignPartnerProgram;
