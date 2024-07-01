'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useEffect, useState} from 'react';
import {
  insertQuoteConfiguration,
  queryQuoteConfiguration,
} from '../../../../../redux/actions/quoteConfiguration';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import getColumns from './tableColumns';

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
    const finalArr: any = [];
    let indexError = -1;
    for (let i = 0; i < quoteConfig.length; i++) {
      const dataItem: any = quoteConfig[i];
      const index = finalArr.findIndex(
        (item: any) =>
          item.distributor_id === dataItem.distributor_id &&
          item.oem_id === dataItem.oem_id,
      );
      if (index === -1) {
        finalArr.push(dataItem);
      } else {
        indexError = index;
      }
    }
    if (indexError === -1) {
      finalArr?.forEach((dataItem: any) => {
        dispatch(insertQuoteConfiguration(dataItem)).then((d) => {
          if (d?.payload) {
            dispatch(queryQuoteConfiguration({}));
          }
        });
      });
    } else {
      const arr: any = [...quoteConfig];
      const obj = {...arr[indexError]};
      obj.error = true;
      arr[indexError] = obj;
      setQuoteConfig(arr);
    }
  };

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
  const quoteConfigurationColumns = getColumns(token, setQuoteConfig, form);
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
                text="Save"
                buttontype="PRIMARY"
                clickHandler={() => {
                  handleButtonClick();
                }}
              />
            </Space>
          </Col>
        </Row>
        <div
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <Form layout="vertical" form={form}>
            <OsTable
              columns={quoteConfigurationColumns}
              dataSource={quoteConfig}
              scroll
              loading={loading}
              locale={locale}
              tablePageSize={50}
              scrolly={500}
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
                distributor_id: null,
                oem_id: null,
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
