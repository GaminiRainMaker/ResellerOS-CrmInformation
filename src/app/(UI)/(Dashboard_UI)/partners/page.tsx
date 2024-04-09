/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import { columns1, data123 } from '@/app/utils/CONSTANTS';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { getAssignPartnerProgramByOrganization } from '../../../../../redux/actions/assignPartnerProgram';
import { getUnassignedProgram } from '../../../../../redux/actions/partnerProgram';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import PartnerAnalytics from './partnerAnalytics';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const {
    data: AssignPartnerProgramData,
    loading: AssignPartnerProgramDataloading,
  } = useAppSelector((state) => state.assignPartnerProgram);
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: unnassignedData} = useAppSelector(
    (state) => state.partnerProgram,
  );

  useEffect(() => {
    dispatch(
      getAssignPartnerProgramByOrganization({
        organization: userInformation?.organization,
      }),
    );
  }, [userInformation]);
  useEffect(() => {
    dispatch(getUnassignedProgram());
  }, []);

  console.log('unnassignedData', unnassignedData);

  const partnerObjects: any[] = [];
  AssignPartnerProgramData?.approved?.forEach((entry: any) => {
    const partner = entry?.PartnerProgram?.Partner;
    partnerObjects?.push(partner);
  });

  const partnerRequestedObjects: any[] = [];
  AssignPartnerProgramData?.requested?.forEach((entry: any) => {
    const partner = entry?.PartnerProgram?.Partner;
    partnerRequestedObjects?.push(partner);
  });

  const allApprovedObjects: any[] = [];
  AssignPartnerProgramData?.allApproved?.forEach((entry: any) => {
    const partner = entry?.PartnerProgram?.Partner;
    allApprovedObjects?.push(partner);
  });


  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Request Partner"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const PartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Created Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Industry
        </Typography>
      ),
      dataIndex: 'industry',
      key: 'industry',

      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',

      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Website
        </Typography>
      ),
      dataIndex: 'website',
      key: 'website',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
  ];

  const tabItems = [
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(1);
          }}
          name="Body 4/Regular"
        >
          All Partners
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          // columns={[...PartnerColumns, ...secondSuperPartnerColumns]}
          columns={columns1}
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <p key={record?.key} style={{margin: 0}}>
                {record.description}
              </p>
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          // dataSource={allApprovedObjects}
          dataSource={data123}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(2);
          }}
          name="Body 4/Regular"
        >
          Active Partners
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={partnerObjects}
          scroll
          locale={locale}
          loading={AssignPartnerProgramDataloading}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(3);
          }}
          name="Body 4/Regular"
        >
          Requested
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={partnerRequestedObjects}
          scroll
          locale={locale}
          loading={AssignPartnerProgramDataloading}
        />
      ),
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <PartnerAnalytics />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Partners
            </Typography>
          </Col>

          {activeTab === 1 && (
            <Col style={{display: 'flex', alignItems: 'center'}}>
              <OsButton
                text="Request Partner"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
            </Col>
          )}
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
              <Form layout="vertical">
                <Space size={12}>
                  <Form.Item label="Order Filter">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>

                  <Form.Item label="Order Filter">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>

                  <Form.Item label="Order Filter">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>
                </Space>
              </Form>
            }
            items={tabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={AssignPartnerProgramDataloading}
        body={<RequestPartner form={form} setOpen={setShowModal} />}
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer
        primaryButtonText="Request"
        onOk={form?.submit}
        footerPadding={30}
      />
    </>
  );
};
export default Partners;
