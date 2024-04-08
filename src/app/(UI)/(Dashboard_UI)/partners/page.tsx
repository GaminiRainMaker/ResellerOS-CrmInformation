/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
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
import {getAssignPartnerProgramByOrganization} from '../../../../../redux/actions/assignPartnerProgram';
import {
  // deletePartner,
  getAllPartnerTemp,
} from '../../../../../redux/actions/partner';
import {getAllPartnerProgram} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {SeparatedData} from '../superAdminPartner/page';
import PartnerAnalytics from './partnerAnalytics';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {data: PartnerData, loading} = useAppSelector((state) => state.partner);
  const {data: PartnerProgramData, loading: Programloading} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const {
    data: AssignPartnerProgramData,
    loading: AssignPartnerProgramDataloading,
  } = useAppSelector((state) => state.assignPartnerProgram);
  const {userInformation} = useAppSelector((state) => state.user);
  const [finalPartnerProgramData, setFinalPartnerProgramData] = useState<any>();

  useEffect(() => {
    dispatch(getAllPartnerTemp());
    dispatch(getAllPartnerProgram());
  }, []);

  useEffect(() => {
    dispatch(
      getAssignPartnerProgramByOrganization({
        organization: userInformation?.organization,
      }),
    );
  }, [userInformation]);

  const partnerObjects: any[] = [];
  AssignPartnerProgramData?.forEach((entry: any) => {
    const partner = entry.PartnerProgram.Partner;
    partnerObjects.push(partner);
  });

  useEffect(() => {
    const separatedData: SeparatedData = {};
    PartnerProgramData?.forEach((item: any) => {
      const partnerId = item.partner;
      const partnerName = item.Partner?.partner;
      if (!separatedData[partnerId]) {
        separatedData[partnerId] = {
          partner_id: partnerId,
          title: partnerName,
          data: [],
        };
      }
      separatedData[partnerId]?.data.push(item);
    });
    setFinalPartnerProgramData(Object.values(separatedData));
  }, [PartnerProgramData]);

  const deleteSelectedIds = async () => {
    const data = {id: deleteIds};
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

  const PartnerProgramColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Programs
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

      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
      label: <Typography name="Body 4/Regular">Partners</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={partnerObjects}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Partner Programs</Typography>,
      key: '2',
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
                        loading={Programloading}
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
      key: '3',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={PartnerData?.requested}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
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
        loading={loading}
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
