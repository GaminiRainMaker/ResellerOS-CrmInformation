/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import { Form } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import AddContract from './addContract';
import OsButton from '@/app/components/common/os-button';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  deleteContract,
  getAllContract,
  insertContract,
} from '../../../../../redux/actions/contract';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsDrawer from '@/app/components/common/os-drawer';

const ContractMain: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contractObject, setContractObject] = useState<any>();
  const { data: contactData, loading } = useAppSelector((state) => state.contract);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<any>();
  const { userInformation } = useAppSelector((state) => state.user);
  const [contractFinalData, setContractFinalData] = useState<any>()

  useEffect(() => {
    dispatch(getAllContract());
  }, []);

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton={'Add New Contract'}
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  useEffect(() => {
    if (userInformation?.Role === 'superAdmin') {
      setContractFinalData(contactData)
    } else {
      const finalData = contactData?.filter((item: any) => item?.organization === userInformation?.organization)
      setContractFinalData(finalData)
    }
  }, [contactData])

  const ContractColumns = [
    {
      title: 'Contract Vehicle Name',
      dataIndex: 'contract_vehicle_name',
      key: 'contract_vehicle_name',
      render: (text: string) => <CustomTextCapitalization text={text} />,
      width: 150
    },

    {
      title: 'Contract',
      dataIndex: 'contract',
      key: 'contract',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ), width: 150
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            onClick={() => {
              setRecordId(record?.id);
              form.setFieldsValue({
                contract_vehicle_name: record?.contract_vehicle_name,
                contract: record?.contract,
                organization: record?.organization
              });
              setOpenDrawer(true);
            }}
            color={token.colorInfoBorder}
            style={{ cursor: 'pointer' }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDeleteId(record?.id);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ), width: 150
    },
  ];

  const AddNewContract = async () => {
    setOpenDrawer(false);
    const FormData = form?.getFieldsValue();
    let newObj: any = {
      ...FormData,
      organization: userInformation?.Role !== 'superAdmin' ? userInformation?.organization : FormData?.organization
    };
    if (recordId) {
      newObj.id = recordId;
    }
    await dispatch(insertContract(newObj));
    dispatch(getAllContract());
    setContractObject('');
    setShowModal(false);
    form?.resetFields();
  };

  const deleteContractById = async () => {
    await dispatch(deleteContract(Number(deleteId)));
    dispatch(getAllContract());
    setShowModalDelete(false);
    setDeleteId('');
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Contract
            </Typography>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <OsButton
              text="Add Contract"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
              clickHandler={() => setShowModal((p) => !p)}
            />
          </Col>
        </Row>

        <Row
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            overflow: 'auto',
          }}
        >
          <OsTable
            columns={ContractColumns}
            dataSource={contractFinalData || []}
            scroll
            locale={locale}
            loading={loading}
          />
        </Row>
      </Space>

      <OsModal
        body={
          <AddContract onFinish={AddNewContract} form={form} drawer={false} />
        }
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setContractObject('');
        }}
        footer
        primaryButtonText="Add"
        onOk={() => {
          form.submit();
        }}
        footerPadding={30}
      />

      <OsDrawer
        title={
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Edit Contract
          </Typography>
        }
        placement="right"
        onClose={() => {
          setOpenDrawer(false);
          form?.resetFields();
        }}
        open={openDrawer}
        width={450}
        footer={
          <Row style={{ width: '100%', float: 'right' }}>
            {' '}
            <OsButton
              loading={loading}
              btnStyle={{ width: '100%' }}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={() => {
                form.submit();
              }}
            />
          </Row>
        }
      >
        <AddContract onFinish={AddNewContract} form={form} drawer={true} />
      </OsDrawer>

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteId}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteContractById}
        description="Are you sure you want to delete this contract?"
        heading="Delete Contract"
      />
    </>
  );
};
export default ContractMain;
