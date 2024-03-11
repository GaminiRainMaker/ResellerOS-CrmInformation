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
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Form, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import OsDistributorSelect from '@/app/components/common/os-distributor-select';
import OsOemSelect from '@/app/components/common/os-oem-select';
import OsInput from '@/app/components/common/os-input';
import {
  deleteQuoteConfiguration,
  getAllNanonetsModel,
} from '../../../../../redux/actions/nanonets';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddQuoteConiguration from './addQuoteConfiguration';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading, filteredByDate: filteredData} = useAppSelector(
    (state) => state.quote,
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [allQuoteConfigData, setAllQuoteConfigData] = useState<any>();
  const [configData, setConfigData] = useState<boolean>(false);

  const [data, setData] = useState([
    {
      id: 1,
      distributor: '',
      oem: '',
      model_id: '',
    },
  ]);

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
          Distributer
        </Typography>
      ),
      dataIndex: 'distributer',
      key: 'distributer',
      width: 187,
      render: (text: string, record: any) => {
        return <OsDistributorSelect isAddNewDistributor />;
      },
    },
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
      render: (text: string, record: any) => {
        return <OsOemSelect isAddNewOem />;
      },
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
        <OsInput placeholder="Write here" style={{height: '38px'}} />
      ),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 54,
      render: (text: string, record: any) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setData((prev) =>
                prev?.filter((prevItem) => prevItem?.id !== record?.id),
              );
            }}
          />
        </Space>
      ),
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
        </Row>
        <div
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <Form layout="vertical">
            <OsTable
              columns={columns}
              dataSource={data}
              scroll
              loading={loading}
              locale=""
              rowSelection={rowSelection}
            />
          </Form>
        </div>
        <Row justify="end">
          <OsButton
            text="Add Field"
            buttontype="PRIMARY"
            icon={<PlusIcon />}
            clickHandler={() => {
              setData([
                ...data,
                ...[
                  {
                    id: data.length + 1,
                    distributor: '',
                    oem: '',
                    model_id: '',
                  },
                ],
              ]);
            }}
          />
        </Row>
      </Space>
      <OsModal
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
