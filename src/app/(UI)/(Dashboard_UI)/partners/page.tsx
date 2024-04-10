/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {partnerProgramFilter} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {insertAssignPartnerProgram} from '../../../../../redux/actions/assignPartnerProgram';
import {getAllPartnerandProgram} from '../../../../../redux/actions/partner';
import {getUnassignedProgram} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import PartnerAnalytics from './partnerAnalytics';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [allPartnerData, setAllPartnerData] = useState<any>();
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUnassignedProgram());
    dispatch(getAllPartnerandProgram(''))?.then((payload: any) => {
      setAllPartnerData(payload?.payload);
    });
  }, []);

  useEffect(() => {
    const FilterArrayDataa = partnerProgramFilter(
      'user',
      userInformation,
      allPartnerData,
      activeTab,
    );
    

    setAllFilterPartnerData(FilterArrayDataa);
  }, [allPartnerData, activeTab]);

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Request Partner"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const [partnerProgramColumns, setPartnerProgramColumns] = useState<any>();

  const PartnerProgramColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program Name
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
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
          Organization
        </Typography>
      ),
      dataIndex: 'organization',
      key: 'organization',

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
          Organization
        </Typography>
      ),
      dataIndex: 'organization',
      key: 'organization',

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

  const handleAddNewAssignedPartnerProgramRequest = async (id: number) => {
    const partnerObj = {
      organization: userInformation?.organization,
      requested_by: userInformation?.id,
      is_request: true,
      partner_program_id: id,
    };
    await dispatch(insertAssignPartnerProgram(partnerObj));
    dispatch(getAllPartnerandProgram(''))?.then((payload: any) => {
      setAllPartnerData(payload?.payload);
    });
  };

  useEffect(() => {
    if (activeTab === 1) {
      const newArr = [...PartnerProgramColumns];
      const newObj: any = {
        title: (
          <Typography name="Body 4/Medium" className="dragHandler">
            Action
          </Typography>
        ),
        dataIndex: 'website',
        key: 'website',
        render: (_: string, record: any) => (
          <OsButton
            buttontype="PRIMARY"
            text="Request"
            clickHandler={() => {
              handleAddNewAssignedPartnerProgramRequest(record?.id);
            }}
          />
        ),
      };
      newArr?.push(newObj);
      setPartnerProgramColumns(newArr);
    } else {
      setPartnerProgramColumns(PartnerProgramColumns);
    }
  }, [activeTab]);

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
          columns={PartnerColumns}
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <OsTable
                columns={partnerProgramColumns}
                // dataSource={allApprovedObjects}
                dataSource={record?.PartnerPrograms}
                scroll
                locale={locale}
                loading={false}
              />
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          // dataSource={allApprovedObjects}
          dataSource={allPartnerFilterData}
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
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <OsTable
                columns={partnerProgramColumns}
                // dataSource={allApprovedObjects}
                dataSource={record?.PartnerPrograms}
                scroll
                locale={locale}
                loading={false}
              />
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          // dataSource={allApprovedObjects}
          dataSource={allPartnerFilterData}
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
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <OsTable
                columns={partnerProgramColumns}
                // dataSource={allApprovedObjects}
                dataSource={record?.PartnerPrograms}
                scroll
                locale={locale}
                loading={false}
              />
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          // dataSource={allApprovedObjects}
          dataSource={allPartnerFilterData}
          scroll
          locale={locale}
          loading={false}
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
        loading={false}
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
