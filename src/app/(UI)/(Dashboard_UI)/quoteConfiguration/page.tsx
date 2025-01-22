'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Button, Form, notification} from 'antd';
import {useEffect, useState} from 'react';
import {
  insertQuoteConfiguration,
  queryQuoteConfiguration,
} from '../../../../../redux/actions/quoteConfiguration';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import getColumns from './tableColumns';
import {getAllApprovedPartnerForQuoteConfiq} from '../../../../../redux/actions/partner';
import {formatStatus, partnerOptions} from '@/app/utils/CONSTANTS';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const {loading, data: quoteConfigData} = useAppSelector(
    (state) => state.quoteConfig,
  );
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [optionsForPartner, setOptionsFOrPartner] = useState<any>();
  const [api, contextHolder] = notification.useNotification();
  const [quoteConfig, setQuoteConfig] = useState([]);

  const getPartnerListData = async () => {
    await dispatch(
      getAllApprovedPartnerForQuoteConfiq({newArrCheckTONotExist: []}),
    )?.then((payload: any) => {
      let arrOfPartnerss: any = [];
      if (payload?.payload) {
        payload?.payload?.map((items: any) => {
          arrOfPartnerss?.push({
            label: formatStatus(items?.partner),
            value: items?.id,
          });
        });
      }
      setOptionsFOrPartner(arrOfPartnerss);
    });
  };
  useEffect(() => {
    dispatch(queryQuoteConfiguration({}));
    getPartnerListData();
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
            getPartnerListData();
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

  const [renderColumnData, setRenderColumnData] = useState<any>();

  const addNewColumnDataa = (optionsForPartner: any) => {
    if (optionsForPartner && optionsForPartner?.length > 0) {
      const RenderColumns = [
        {
          title: (
            <Typography
              name="Body 4/Medium"
              className="dragHandler"
              color={token?.colorPrimaryText}
            >
              Distributor
            </Typography>
          ),
          dataIndex: 'distributor',
          key: 'distributor',
          width: 187,
          render: (text: string, record: any, index: number) => (
            <>
              <CommonSelect
                options={optionsForPartner}
                style={{width: '100%'}}
                disabled={record?.oem_id}
                defaultValue={
                  record?.distributor_id &&
                  formatStatus(record?.Partner?.partner)
                }
                onChange={(value: any) => {
                  setQuoteConfig((prev: any) =>
                    prev.map((prevItem: any, prevIndex: any) => {
                      if (prevIndex === index) {
                        const obj = {
                          ...prevItem,
                          partner_id: value,
                          distributor_id: value,
                        };

                        return obj;
                      }
                      return prevItem;
                    }),
                  );
                }}
              />

              {record.error && (
                <Typography name="Body 4/Regular" color={token?.colorError}>
                  Duplicate Entry
                </Typography>
              )}
            </>
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
            <>
              <CommonSelect
                style={{width: '100%'}}
                disabled={record?.distributor_id}
                options={optionsForPartner}
                defaultValue={
                  record?.oem_id && formatStatus(record?.Partner?.partner)
                }
                onChange={(value: any) => {
                  setQuoteConfig((prev: any) =>
                    prev.map((prevItem: any, prevIndex: any) => {
                      if (prevIndex === index) {
                        const obj = {
                          ...prevItem,
                          oem_id: value,
                          partner_id: value,
                        };

                        return obj;
                      }
                      return prevItem;
                    }),
                  );
                }}
              />

              {record.error && (
                <Typography name="Body 4/Regular" color={token?.colorError}>
                  Duplicate Entry
                </Typography>
              )}
            </>
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
              defaultValue={text}
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
          title: 'Action',
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
      setRenderColumnData(RenderColumns);
    }
  };
  useEffect(() => {
    addNewColumnDataa(optionsForPartner);
  }, [optionsForPartner, JSON?.stringify(optionsForPartner)]);

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
          {renderColumnData && (
            <OsTable
              columns={renderColumnData}
              dataSource={quoteConfig}
              scroll
              loading={loading}
              locale={locale}
              tablePageSize={50}
              scrolly={500}
            />
          )}
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
                partner_id: null,
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
