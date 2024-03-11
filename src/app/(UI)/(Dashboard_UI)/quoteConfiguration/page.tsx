/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Typography from '@/app/components/common/typography';
// eslint-disable-next-line import/no-extraneous-dependencies

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {EditFilled, SearchOutlined} from '@ant-design/icons';
import {EyeIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddQuoteConiguration from './addQuoteConfiguration';
import {
  deleteQuoteConfiguration,
  getAllNanonetsModel,
} from '../../../../../redux/actions/nanonets';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading, filteredByDate: filteredData} = useAppSelector(
    (state) => state.quote,
  );
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [allQuoteConfigData, setAllQuoteConfigData] = useState<any>();
  const [configData, setConfigData] = useState<boolean>(false);

  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getAllNanonetsModel()).then((payload: any) => {
      setAllQuoteConfigData(payload?.payload);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllNanonetsModel()).then((payload: any) => {
        setAllQuoteConfigData(payload?.payload);
      });
    }, 1000);
  }, [!showModal]);

  useEffect(() => {
    setConfigData(allQuoteConfigData);
  }, [allQuoteConfigData]);

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const deleteQuoteConfig = async (id: number) => {
    await dispatch(deleteQuoteConfiguration(deleteIds));
    setTimeout(() => {
      dispatch(getAllNanonetsModel());
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          OEM
        </Typography>
      ),
      dataIndex: 'oem',
      key: 'oem',
      width: 130,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Distributer
        </Typography>
      ),
      dataIndex: 'distributer',
      key: 'distributer',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Model ID
        </Typography>
      ),
      dataIndex: 'model_id',
      key: 'model_id',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <EditFilled
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setShowModal((p) => !p);
              setFormValue(record);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds(record?.id);
              setShowModalDelete(true);
              // setShowModal((p) => !p);
            }}
          />
        </Space>
      ),
    },
  ];

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <Typography
          name="Body 4/Medium"
          cursor="pointer"
          color={token?.colorTextBase}
        >
          All
        </Typography>
      ),
      key: '1',
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        {/* <QuoteAnalytics quoteData={quoteData} deletedQuote={deletedQuote} /> */}
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Quotes Configuration
            </Typography>
          </Col>
          <Col>
            <div
              style={{
                display: 'flex',
                width: '40%',
                gap: '8px',
              }}
            >
              <OsButton
                text="Add Quote Cnfiguration"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setShowModal((p) => !p);
                  setFormValue({});
                }}
              />
            </div>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: tabItem?.label,
              children: (
                <OsTable
                  key={tabItem?.key}
                  columns={columns}
                  dataSource={configData}
                  scroll
                  loading={loading}
                  locale=""
                  rowSelection={rowSelection}
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>
      <OsModal
        // loading={loading}
        body={
          <AddQuoteConiguration
            setFormValue={setFormValue}
            formValue={formValue}
            setShowModal={setShowModal}
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
      />

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteQuoteConfig}
        heading="Delete Quote Configuration"
        description="Are you sure you want to delete this Quote Configuration?"
      />
    </>
  );
};

export default AllQuote;
