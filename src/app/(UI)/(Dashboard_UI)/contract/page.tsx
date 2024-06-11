/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddContract from './addContract';
import OsButton from '@/app/components/common/os-button';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {
  deleteContract,
  getAllContract,
  insertContract,
} from '../../../../../redux/actions/contract';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';

const ContractMain: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contractObject, setContractObject] = useState<any>();
  const [loadingContract, setLoadingContract] = useState<boolean>(false);
  const {data: contactData} = useAppSelector((state) => state.contract);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();

  useEffect(() => {
    setLoadingContract(true);
    dispatch(getAllContract());
    setLoadingContract(false);
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

  const ContractColumns = [
    {
      title: ' Contract Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },

    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },

    {
      title: 'Contract Type',
      dataIndex: 'contract_type_record',
      key: 'contract_type_record',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <Space size={18}>
          <OsButton
            buttontype="PRIMARY"
            text="Edit"
            clickHandler={() => {
              setContractObject(record);
              setShowModal(true);
            }}
          />
        </Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteId(record?.id);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const AddNewContract = async () => {
    setLoadingContract(true);
    await dispatch(insertContract(contractObject));
    dispatch(getAllContract());
    setLoadingContract(false);
    setContractObject('');
    setShowModal(false);
  };

  const deleteContractById = async () => {
    await dispatch(deleteContract(Number(deleteId)));
    dispatch(getAllContract());
    setShowModalDelete(false);
    setDeleteId('');
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Contract
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
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
            dataSource={contactData || []}
            scroll
            locale={locale}
            loading={loadingContract}
          />
        </Row>
      </Space>

      <OsModal
        body={
          <AddContract
            setContractObject={setContractObject}
            contractObject={contractObject}
          />
        }
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setContractObject('');
        }}
        footer
        primaryButtonText="Add"
        onOk={AddNewContract}
        footerPadding={30}
      />

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={deleteId}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteContractById}
        description="Are you sure you want to delete this contract?"
        heading="Delete Contract"
      />
    </>
  );
};
export default ContractMain;
