/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import OsCollapse from '@/app/components/common/os-collapse';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, MenuProps} from 'antd';
import {useEffect, useState} from 'react';
import {columns1, data123} from '@/app/utils/CONSTANTS';
import {
  getAssignPartnerProgramByOrganization,
  updateAssignPartnerProgramById,
} from '../../../../../redux/actions/assignPartnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {SeparatedData} from '../superAdminPartner/page';
import PartnerAnalytics from './partnerAnalytics';
import {getUnassignedProgram} from '../../../../../redux/actions/partnerProgram';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {
    data: AssignPartnerProgramData,
    loading: AssignPartnerProgramDataloading,
  } = useAppSelector((state) => state.assignPartnerProgram);
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: unnassignedData} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const [finalPartnerProgramData, setFinalPartnerProgramData] = useState<any>();

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

  useEffect(() => {
    const separatedData: SeparatedData = {};
    AssignPartnerProgramData?.approved?.forEach((item: any) => {
      const partnerId = item?.PartnerProgram?.partner;
      const partnerName = item?.PartnerProgram?.Partner?.partner;

      if (!separatedData[partnerId]) {
        separatedData[partnerId] = {
          partner_id: partnerId,
          title: partnerName,
          data: [],
        };
      }
      separatedData[partnerId]?.data?.push(item);
    });
    setFinalPartnerProgramData(Object?.values(separatedData));
  }, [AssignPartnerProgramData]);

  const deleteSelectedIds = async () => {
    // const data = {id: deleteIds};
    // await dispatch(deletePartner(data)).then(() => {
    //   dispatch(getAllPartnerTemp());
    // });
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  const assignPartnerProgram = (record: any, value: any) => {
    const obj = {
      id: record?.id,
      is_request: value,
    };
    dispatch(updateAssignPartnerProgramById(obj)).then((d) => {
      if (d?.payload) {
        dispatch(
          getAssignPartnerProgramByOrganization({
            organization: userInformation?.organization,
          }),
        );
      }
    });
  };

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

  const secondSuperPartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Request
        </Typography>
      ),
      dataIndex: 'is_request',
      key: 'is_request',
      render: (text: string, record: any) => (
        <Switch
          value={record?.is_request}
          size="default"
          onChange={(e: any) => {
            assignPartnerProgram(record, e);
          }}
        />
      ),
    },
  ];

  const PartnerProgramColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Programs
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.PartnerProgram?.partner_program ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
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
          Program Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Site Link
        </Typography>
      ),
      dataIndex: 'website',
      key: 'website',

      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {' '}
          {record?.PartnerProgram?.website ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Template
        </Typography>
      ),
      dataIndex: 'form_data',
      key: 'form_data',
      render: (text: string) => (
        <Typography name="Body 4/Medium" hoverOnText color={token?.colorLink}>
          View
        </Typography>
      ),
    },
  ];

  const tabItems = [
    {
      label: <Typography name="Body 4/Regular">All Partners</Typography>,
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
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Active Partners</Typography>,
      key: '2',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={partnerObjects}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={AssignPartnerProgramDataloading}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Partner Programs</Typography>,
      key: '3',
      children: (
        <>
          {finalPartnerProgramData && finalPartnerProgramData?.length > 0 ? (
            finalPartnerProgramData?.map((itemDeal: any) => (
              <OsCollapse
                items={[
                  {
                    key: '1',
                    label: <p>{itemDeal?.title}</p>,
                    children: (
                      <OsTable
                        columns={PartnerProgramColumns}
                        dataSource={itemDeal?.data}
                        rowSelection={rowSelection}
                        scroll
                        loading={AssignPartnerProgramDataloading}
                        locale={locale}
                      />
                    ),
                  },
                ]}
              />
            ))
          ) : (
            <OsTable
              columns={PartnerProgramColumns}
              dataSource={[]}
              rowSelection={rowSelection}
              scroll
              loading={false}
              locale={locale}
            />
          )}
        </>
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Requested</Typography>,
      key: '4',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={partnerRequestedObjects}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={AssignPartnerProgramDataloading}
        />
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Download Selected</Typography>,
    },
    {
      key: '2',
      label: (
        <Typography
          name="Body 3/Regular"
          color={token?.colorError}
          onClick={() => {
            if (deleteIds && deleteIds?.length > 0) {
              setShowModalDelete(true);
            }
          }}
        >
          Delete Selected
        </Typography>
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
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <Space size={12} style={{height: '48px'}}>
              <OsButton
                text="Request Partner"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </Col>
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
      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete Partner"
        description="Are you sure you want to delete this partner?"
      />
    </>
  );
};
export default Partners;
