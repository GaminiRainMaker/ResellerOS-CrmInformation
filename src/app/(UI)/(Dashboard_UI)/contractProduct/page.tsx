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
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

import OsButton from '@/app/components/common/os-button';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {
  deleteContractProduct,
  getAllContractProduct,
  insertContractProduct,
} from '../../../../../redux/actions/contractProduct';
import AddContractProduct from './AddContractProduct';
import {getAllContract} from '../../../../../redux/actions/contract';

const ContractProductMain: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contractObject, setContractObject] = useState<any>();
  const [loadingContract, setLoadingContract] = useState<boolean>(false);
  const {data: contactProductData} = useAppSelector(
    (state) => state.contractProduct,
  );
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [optionsForContract, setOptionsForContract] = useState<any>();
  useEffect(() => {
    setLoadingContract(true);
    dispatch(getAllContractProduct());
    dispatch(getAllContract())?.then((payload: any) => {
      let newOptionsArr: any = [];
      if (payload?.payload) {
        payload?.payload?.map((items: any) => {
          newOptionsArr?.push({label: items?.name, value: items?.id});
        });
      }
      setOptionsForContract(newOptionsArr);
    });
    setLoadingContract(false);
  }, []);
  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton={'Add New Contract Product'}
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const ContractProductColumns = [
    {
      title: 'Contract Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },

    {
      title: 'Contract Product Price',
      dataIndex: 'contract_price',
      key: 'contract_price',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },

    {
      title: 'Clin Type',
      dataIndex: 'clin_type',
      key: 'clin_type',
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

  const AddNewContractProduct = async () => {
    setLoadingContract(true);
    await dispatch(insertContractProduct(contractObject));
    dispatch(getAllContractProduct());
    setLoadingContract(false);
    setContractObject('');
    setShowModal(false);
  };

  const deleteContractById = async () => {
    await dispatch(deleteContractProduct(Number(deleteId)));
    dispatch(getAllContractProduct());
    setShowModalDelete(false);
    setDeleteId('');
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Contract Product
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <OsButton
              text="Add Contract Product"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
              clickHandler={() => setShowModal((p) => !p)}
            />
          </Col>
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTable
            columns={ContractProductColumns}
            dataSource={contactProductData || []}
            scroll
            locale={locale}
            loading={loadingContract}
          />
        </Row>
      </Space>

      <OsModal
        body={
          optionsForContract?.length === 0 ? (
            <Row
              justify="space-between"
              style={{
                padding: '24px 40px 20px 40px',
                backgroundColor: '#F0F4F7',
                borderRadius: '10px 10px 0px 0px',
                height: '100%',
                alignContent: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
              gutter={[0, 16]}
            >
              <Typography
                name="Body 1/Regular"
                align="left"
                color={token?.colorLinkHover}
              >
                Please Add Contract first to add contract product !
              </Typography>
            </Row>
          ) : (
            <AddContractProduct
              setContractObject={setContractObject}
              contractObject={contractObject}
              optionsForContract={optionsForContract}
            />
          )
        }
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setContractObject('');
        }}
        footer
        primaryButtonText={
          optionsForContract?.length === 0
            ? 'Add Contract'
            : contractObject?.id
              ? 'Update'
              : 'Add'
        }
        onOk={() => {
          if (optionsForContract?.length === 0) {
            router?.push('/contract');
          } else {
            AddNewContractProduct();
          }
        }}
        footerPadding={30}
      />

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={deleteId}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteContractById}
        description="Are you sure you want to delete this contract product?"
        heading="Delete Contract product"
      />
    </>
  );
};
export default ContractProductMain;
