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
import {Checkbox, Descriptions, Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsButton from '@/app/components/common/os-button';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  insertFormula,
  deleteFormula,
  getAllFormulas,
} from '../../../../../redux/actions/formulas';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsDrawer from '@/app/components/common/os-drawer';
import AddFormula from './addFormula';
import {
  changeTheALpabetsFromFormula,
  formatStatus,
} from '@/app/utils/CONSTANTS';
import React from 'react';

const FormulaMain: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadingContract, setLoadingContract] = useState<boolean>(false);
  const {data: formulaData} = useAppSelector((state) => state.formulas);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<any>();
  const [selectValue, setSelectValue] = useState<{
    oem_id: number | null;
    distributor_id: number | null;
    is_active: boolean | null;
  }>({
    oem_id: null,
    distributor_id: null,
    is_active: false,
  });

  useEffect(() => {
    setLoadingContract(true);
    dispatch(getAllFormulas());
    setLoadingContract(false);
  }, []);
  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton={'Add New Formula'}
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const FormulaColumn = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Formula',
      dataIndex: 'formula',
      width: '400px',
      key: 'formula',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (text: boolean) => <Checkbox disabled checked={text} />,
    },
    {
      title: 'OEM/Distributor',
      dataIndex: 'oem_id',
      key: 'oem_id',
      render: (text: string, record: any, index: number) => (
        <Space size={18}>
          {record?.Oem
            ? formatStatus(record?.Oem?.oem)
            : record?.Distributor
              ? formatStatus(record?.Distributor?.distributor)
              : '----'}
        </Space>
      ),
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
                title: record?.title,
                description: record?.description,
                formula: record?.formula,
              });
              setSelectValue({
                is_active: record?.is_active,
                oem_id: record?.oem_id,
                distributor_id: record?.distributor_id,
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

  const AddNewFormula = async () => {
    setOpenDrawer(false);
    const FormData = form?.getFieldsValue();
    let newObj: any = {
      ...FormData,
    };
    if (recordId) {
      newObj.id = recordId;
    }
    if (newObj.is_active !== null) {
      newObj.is_active = selectValue?.is_active;
    }
    if (selectValue?.oem_id) {
      newObj.oem_id = selectValue?.oem_id;
    }
    if (selectValue?.distributor_id) {
      newObj.distributor_id = selectValue?.distributor_id;
    }
    setLoadingContract(true);
    let result = changeTheALpabetsFromFormula(newObj?.formula);
    delete newObj.formula;
    newObj.formula = result;
    await dispatch(insertFormula(newObj));
    dispatch(getAllFormulas());
    form?.resetFields();
    setLoadingContract(false);
    setShowModal(false);
    setSelectValue({
      is_active: false,
      oem_id: null,
      distributor_id: null,
    });
  };

  const deleteContractById = async () => {
    await dispatch(deleteFormula(Number(deleteId)));
    dispatch(getAllFormulas());
    setShowModalDelete(false);
    setDeleteId('');
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Stored Formulas
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <OsButton
              text="Add Formula"
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
            columns={FormulaColumn}
            dataSource={formulaData || []}
            scroll
            locale={locale}
            loading={loadingContract}
          />
        </Row>
      </Space>

      <OsModal
        body={
          <AddFormula
            onFinish={AddNewFormula}
            form={form}
            drawer={false}
            setSelectValue={setSelectValue}
            selectValue={selectValue}
          />
        }
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setSelectValue({
            is_active: false,
            oem_id: null,
            distributor_id: null,
          });
          form?.resetFields();
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
            Edit Formula
          </Typography>
        }
        placement="right"
        onClose={() => {
          setOpenDrawer(false);
          form?.resetFields();
          setSelectValue({
            is_active: false,
            oem_id: null,
            distributor_id: null,
          });
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
        <AddFormula
          onFinish={AddNewFormula}
          form={form}
          drawer={true}
          setSelectValue={setSelectValue}
          selectValue={selectValue}
        />
      </OsDrawer>

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteId}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteContractById}
        description="Are you sure you want to delete this formula?"
        heading="Delete Formula"
      />
    </>
  );
};
export default FormulaMain;
