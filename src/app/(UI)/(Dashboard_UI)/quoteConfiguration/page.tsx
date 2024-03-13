'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDistributorSelect from '@/app/components/common/os-distributor-select';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsOemSelect from '@/app/components/common/os-oem-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useEffect, useState} from 'react';
import {
  insertQuoteConfiguration,
  queryQuoteConfiguration,
} from '../../../../../redux/actions/quoteConfiguration';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const {loading, data: quoteConfigData} = useAppSelector(
    (state) => state.quoteConfig,
  );
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [api, contextHolder] = notification.useNotification();
  const [quoteConfig, setQuoteConfig] = useState([]);

  useEffect(() => {
    dispatch(queryQuoteConfiguration({}));
  }, []);

  useEffect(() => {
    setQuoteConfig(quoteConfigData);
  }, [quoteConfigData]);

  const handleButtonClick = () => {
    quoteConfig?.forEach((dataItem: any) =>
      dispatch(insertQuoteConfiguration(dataItem)).then((d) => {
        if (d?.payload) {
          dispatch(queryQuoteConfiguration({}));
        }
      }),
    );
  };

  // const checkCombinationExists = (checkCombination: any) => {
  //   const exists = quoteConfigData.some(
  //     (item: any) =>
  //       item?.distributor_id === checkCombination.distributor_id &&
  //       item?.oem_id === checkCombination.oem_id,
  //   );
  //   if (exists) {
  //     openNotificationWithIcon();
  //   }
  // };

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
      render: (text: string, record: any, index: number) => (
        <OsDistributorSelect
          name={`distributor_${index}`}
          distributorValue={record?.distributor_id}
          isAddNewDistributor
          height={38}
          isRequired
          form={form}
          onChange={(value: any) => {
            form.resetFields([`oem_${index}`]);
            setQuoteConfig((prev: any) =>
              prev.map((prevItem: any, prevIndex: number) => {
                if (prevIndex === index) {
                  return {
                    ...prevItem,
                    distributor_id: value,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
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
      render: (text: string, record: any, index: number) => (
        <OsOemSelect
          // disabled
          name={`oem_${index}`}
          oemValue={record?.oem_id}
          isAddNewOem
          isRequired
          form={form}
          distributorValue={record?.distributor_id}
          onChange={(value: any) => {
            setQuoteConfig((prev: any) =>
              prev.map((prevItem: any, prevIndex: any) => {
                if (prevIndex === index) {
                  const obj = {
                    ...prevItem,
                    oem_id: value,
                  };

                  return obj;
                }
                return prevItem;
              }),
            );
          }}
        />
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
      render: (text: string, record: any, index: number) => (
        <OsInput
          name={`model_${index}`}
          placeholder="Write here"
          style={{height: '38px'}}
          value={text}
          onChange={(e) => {
            setQuoteConfig((prev: any) =>
              prev.map((prevItem: any, prevIndex: number) => {
                if (prevIndex === index) {
                  return {
                    ...prevItem,
                    model_id: e?.target?.value,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 54,
      render: (text: string, record: any, index: number) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setQuoteConfig((prev: any) =>
                prev.filter(
                  (prevItem: any, prevIndex: number) => prevIndex !== index,
                ),
              );
            }}
          />
        </Space>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Quote Configuration"
        subTitle="Please Add the fields."
      />
    ),
  };

  const deleteQuoteConfig = async (id: number) => {
    // await dispatch(deleteQuoteConfiguration(deleteIds));
    // setTimeout(() => {
    //   dispatch(getAllNanonetsModel());
    // }, 1000);
    // setDeleteIds([]);
    // setShowModalDelete(false);
  };

  return (
    <>
      {contextHolder}

      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Quotes Configuration
            </Typography>
          </Col>

          <Col>
            <Space size={8} direction="horizontal">
              <OsButton
                text="Cancel"
                buttontype="SECONDARY"
                clickHandler={() => {}}
              />

              <OsButton
                text="Save"
                buttontype="PRIMARY"
                clickHandler={() => {
                  handleButtonClick();
                }}
              />
              <Space>
                <OsDropdown menu={{items: []}} />
              </Space>
            </Space>
          </Col>
        </Row>
        <div
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <Form layout="vertical" form={form}>
            <OsTable
              columns={columns}
              dataSource={quoteConfig}
              scroll
              loading={loading}
              locale={locale}
            />
          </Form>
        </div>
        <Row justify="end">
          <OsButton
            text="Add Field"
            buttontype="PRIMARY"
            icon={<PlusIcon />}
            clickHandler={() => {
              const arr: any = [...quoteConfig];
              arr.push({
                distributor_id: '',
                oem_id: '',
                model_id: '',
              });
              setQuoteConfig(arr);
            }}
          />
        </Row>
      </Space>
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
