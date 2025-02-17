/* eslint-disable no-nested-ternary */
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
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import OsDrawer from '@/app/components/common/os-drawer';
import OsButton from '@/app/components/common/os-button';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

import {getAllContract} from '../../../../../redux/actions/contract';
import {
  deleteContractProduct,
  getAllContractProduct,
  insertContractProduct,
} from '../../../../../redux/actions/contractProduct';
import AddContractProduct from './AddContractProduct';

const ContractProductMain: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [contractObject, setContractObject] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const {data: contactProductData, loading} = useAppSelector(
    (state) => state.contractProduct,
  );

  const [showButtonForContract, setShowButtonForContract] =
    useState<boolean>(false);
  const {data: contactData} = useAppSelector((state) => state.contract);

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [recordId, setRecordId] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [contractProductFinalData, setContractProductFinalData] =
    useState<any>();

  useEffect(() => {
    dispatch(getAllContractProduct());
    dispatch(getAllContract());
  }, []);

  const finalOptionsForContract = contactData
    ?.filter((item: any) => {
      // Apply the organization filter only if the role is not "superAdmin"
      if (userInformation?.rRole !== 'superAdmin') {
        return item?.organization === userInformation?.organization;
      }
      return true; // Allow all items if the user is "superAdmin"
    })
    .map((option: any) => ({
      label: option?.contract,
      value: option?.id,
    }));

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Add New Contract Product"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  console.log('32423423', showButtonForContract);
  const ContractProductColumns = [
    {
      title: 'Contract Product Name',
      dataIndex: 'contract_product_name',
      key: 'contract_product_name',
      render: (text: string) => <CustomTextCapitalization text={text} />,
      width: 250,
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
      width: 180,
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
      width: 180,
    },
    {
      title: 'Contract Product Price',
      dataIndex: 'contract_price',
      key: 'contract_price',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
      width: 180,
    },

    {
      title: 'Product Number',
      dataIndex: 'product_number',
      key: 'product_number',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
      width: 180,
    },

    {
      title: 'Contract Product Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text: string) => <CustomTextCapitalization text={text} />,
      width: 250,
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
                organization: record?.organization,
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
      width: 150,
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
    const newArr: any = [];
    if (!openDrawer) {
      FormData?.product_id?.map((items: any) => {
        const newObj: any = {
          ...FormData,
        };
        delete FormData?.product_id;
        newObj.product_id = items;

        // Add organization logic
        newObj.organization =
          userInformation?.Role !== 'superAdmin'
            ? userInformation?.organization
            : FormData?.organization;

        newArr?.push(newObj);
      });
    }
    const newObj: any = {
      ...FormData,
    };
    newObj.organization =
      userInformation?.Role !== 'superAdmin'
        ? userInformation?.organization
        : FormData?.organization;
    if (recordId) {
      newObj.id = recordId;
    }
    await dispatch(insertContractProduct(!openDrawer ? newArr : newObj));
    dispatch(getAllContractProduct());
    setContractObject('');
    setShowModal(false);
    setOpenDrawer(false);
    setRecordId('');
    form?.resetFields();
  };

  useEffect(() => {
    if (userInformation?.Role === 'superAdmin') {
      setContractProductFinalData(contactProductData);
    } else {
      const finalData = contactProductData?.filter(
        (item: any) => item?.organization === userInformation?.organization,
      );
      setContractProductFinalData(finalData);
    }
  }, [contactProductData]);

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
        <OsTable
          columns={ContractProductColumns}
          dataSource={contractProductFinalData || []}
          scroll
          locale={locale}
          loading={loading}
        />
      </Space>

      <OsModal
        body={
          finalOptionsForContract?.length === 0 ? (
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
              optionsForContract={finalOptionsForContract}
              onFinish={updatebillDetails}
              form={form}
              drawer={false}
              setShowButtonForContract={setShowButtonForContract}
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
          showButtonForContract
            ? finalOptionsForContract?.length === 0
              ? 'Add Contract'
              : 'Add'
            : ''
        }
        onOk={() => {
          if (finalOptionsForContract?.length === 0) {
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
              loading={loading}
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
          optionsForContract={finalOptionsForContract}
          onFinish={updatebillDetails}
          setShowButtonForContract={setShowButtonForContract}
          form={form}
          drawer
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
