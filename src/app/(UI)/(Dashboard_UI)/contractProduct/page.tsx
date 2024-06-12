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
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  deleteContractProduct,
  getAllContractProduct,
  insertContractProduct,
} from '../../../../../redux/actions/contractProduct';
import AddContractProduct from './AddContractProduct';
import {getAllContract} from '../../../../../redux/actions/contract';
import OsDrawer from '@/app/components/common/os-drawer';
import {getAllProduct} from '../../../../../redux/actions/product';

const ContractProductMain: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contractObject, setContractObject] = useState<any>();
  const [loadingContract, setLoadingContract] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const {data: contactProductData} = useAppSelector(
    (state) => state.contractProduct,
  );
  const [productOptions, setProductOptions] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [recordId, setRecordId] = useState<any>();
  const [optionsForContract, setOptionsForContract] = useState<any>();
  console.log('contactProductData', contactProductData);
  useEffect(() => {
    dispatch(getAllProduct())?.then((payload: any) => {
      let newProductOptions: any = [];
      if (payload?.payload) {
        payload?.payload?.map((items: any) => {
          newProductOptions?.push({
            label: items?.product_code,
            value: items.id,
          });
        });
      }
      setProductOptions(newProductOptions);
    });
  }, []);

  useEffect(() => {
    setLoadingContract(true);
    dispatch(getAllContractProduct());
    dispatch(getAllContract())?.then((payload: any) => {
      let newOptionsArr: any = [];
      if (payload?.payload) {
        payload?.payload?.map((items: any) => {
          newOptionsArr?.push({label: items?.contract, value: items?.id});
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
      dataIndex: 'contract_product_name',
      key: 'contract_product_name',
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },
    {
      title: 'Product Code',
      dataIndex: 'product_code',
      key: 'product_code',
      render: (text: string, record: any, index: number) => (
        <Typography name="Body 4/Regular">
          {record?.Product?.product_code ?? '--'}
        </Typography>
      ),
    },
    {
      title: 'Contract',
      dataIndex: 'contract',
      key: 'contract',
      render: (text: string, record: any, index: number) => (
        <Typography name="Body 4/Regular">
          {record?.Contract?.contract ?? '--'}
        </Typography>
      ),
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
      title: 'Product Number',
      dataIndex: 'product_number',
      key: 'product_number',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },

    {
      title: 'Contract Product Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text: string) => <CustomTextCapitalization text={text} />,
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
                Status: record?.Status,
                product_id: record?.product_id,
                contract_id: record?.contract_id,
                product_number: record?.product_number,
                contract_product_name: record?.contract_product_name,
                contract_price: record?.contract_price,
              });
              setOpenDrawer(true);
            }}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
          />
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

  const deleteContractById = async () => {
    await dispatch(deleteContractProduct(Number(deleteId)));
    dispatch(getAllContractProduct());
    setShowModalDelete(false);
    setDeleteId('');
  };
  const updatebillDetails = async () => {
    const FormData = form?.getFieldsValue();
    let newArr: any = [];
    if (!openDrawer) {
      FormData?.product_id?.map((items: any) => {
        let newObj: any = {
          ...FormData,
        };
        delete FormData?.product_id;
        newObj.product_id = items;
        newArr?.push(newObj);
      });
    }
    let newObj: any = {
      ...FormData,
    };
    if (recordId) {
      newObj.id = recordId;
    }
    setLoadingContract(true);
    await dispatch(insertContractProduct(!openDrawer ? newArr : newObj));
    dispatch(getAllContractProduct());
    setLoadingContract(false);
    setContractObject('');
    setShowModal(false);
    setOpenDrawer(false);
    setRecordId('');
    form?.resetFields();
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
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            overflow: 'auto',
          }}
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
              onFinish={updatebillDetails}
              form={form}
              drawer={false}
              productOptions={productOptions}
            />
          )
        }
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form?.resetFields();
        }}
        footer
        primaryButtonText={
          optionsForContract?.length === 0 ? 'Add Contract' : 'Add'
        }
        onOk={() => {
          if (optionsForContract?.length === 0) {
            router?.push('/contract');
          } else {
            // AddNewContractProduct();
            form.submit();
          }
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
            Edit Contract Product
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
          <Row style={{width: '100%', float: 'right'}}>
            {' '}
            <OsButton
              loading={loadingContract}
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={() => {
                form.submit();
              }}
            />
          </Row>
        }
      >
        <AddContractProduct
          setContractObject={setContractObject}
          contractObject={contractObject}
          optionsForContract={optionsForContract}
          onFinish={updatebillDetails}
          form={form}
          drawer={true}
          productOptions={productOptions}
        />
      </OsDrawer>
      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteId}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteContractById}
        description="Are you sure you want to delete this contract product?"
        heading="Delete Contract product"
      />
    </>
  );
};
export default ContractProductMain;
