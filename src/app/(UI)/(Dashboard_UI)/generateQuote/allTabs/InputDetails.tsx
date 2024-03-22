/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapse from '@/app/components/common/os-collapse';
import OSDialog from '@/app/components/common/os-dialog';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import RaiseConcern from '@/app/components/common/os-raise-concern';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {selectDataForProduct} from '@/app/utils/CONSTANTS';
import {useRemoveDollarAndCommahook} from '@/app/utils/base';
import {CheckIcon, TrashIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import GreenCheckIcon from '../../../../../../public/assets/static/greenCheckIcon.svg';
import RaiseConcernImg from '../../../../../../public/assets/static/raiseConcern.svg';
import {
  getAllBundle,
  updateBundleQuantity,
} from '../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../redux/actions/product';
import {
  DeleteQuoteLineItemById,
  getQuoteLineItemByQuoteId,
  getQuoteLineItemByQuoteIdandBundleIdNull,
  updateQuoteLineItemConcern,
  updateQuoteLineItemVerified,
} from '../../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {InputDetailTabInterface} from '../generateQuote.interface';

const InputDetails: FC<InputDetailTabInterface> = ({
  tableColumnDataShow,
  setIsDeleteInputDetailModal,
  isDeleteInputDetailModal,
  setFinalInputColumn,
  finalInputColumn,
  selectedFilter,
  familyFilter,
  setFamilyFilter,
  setSelectedRowIds,
  selectTedRowIds,
  setQuoteLineItemExist,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {abbreviate} = useAbbreviationHook(0);
  const [form] = Form.useForm();
  // const [finalInputColumn, setFinalInputColumn] = useState<any>();
  const {
    quoteLineItemByQuoteID,
    loading,
    data: dataNullForBundle,
  } = useAppSelector((state) => state.quoteLineItem);
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] = useState<any>(
    quoteLineItemByQuoteID,
  );
  const [quoteLineItemByQuoteData1, setQuoteLineItemByQuoteData1] =
    useState<any>(quoteLineItemByQuoteID);
  const [showRaiseConcernModal, setShowRaiseConcernModal] =
    useState<boolean>(false);
  const [showVerificationFileModal, setShowVerificationFileModal] =
    useState<boolean>(false);
  const [fileLineItemIds, setFileLineItemIds] = useState<number[]>([]);
  const [buttonType, setButtonType] = useState<string>('');
  const {data: bundleData} = useAppSelector((state) => state.bundle);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.warning({
      message: 'Please Add Concern!',
      description:
        'We are here to assist you! Please write your concern regarding this quote to us.',
    });
  };
  const locale = {
    emptyText: <EmptyContainer title="There is no data for Input Details" />,
  };

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };

  const renderRequiredInput = (field: string) => {
    const requiredField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (requiredField?.is_required) {
      return true;
    }
    return false;
  };

  const updateBundleQuantityData = async (data: any) => {
    await dispatch(updateBundleQuantity(data));
    dispatch(getAllBundle(getQuoteID));
  };
  useEffect(() => {
    dispatch(getAllBundle(getQuoteID));
    dispatch(getQuoteLineItemByQuoteIdandBundleIdNull(Number(getQuoteID)));
  }, []);
  const deleteQuoteLineItems = () => {
    if (selectTedRowIds) {
      const data = {Ids: selectTedRowIds};
      dispatch(DeleteQuoteLineItemById(data));
      setSelectedRowIds([]);
      setTimeout(() => {
        dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID))).then(
          (d: any) => {
            setQuoteLineItemByQuoteData(d?.payload);
          },
        );
      }, 2000);
    }
    setIsDeleteInputDetailModal(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowIds(selectedRowKeys);
    },
  };

  const InputDetailQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: any, record: any) => (
        <OsInput
          disabled={renderEditableInput('#Line')}
          style={{
            height: '36px',
          }}
          placeholder={text}
          value={
            !selectTedRowIds?.includes(record?.id)
              ? text * (record?.Bundle?.quantity ? record?.Bundle?.quantity : 1)
              : quoteLineItemByQuoteData?.line_number
          }
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_number: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 130,
    },
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 187,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <Form.Item
          className="formmarginBottom"
          name={`Quantity ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('Qty'),
              message: 'This Field id Required',
            },
          ]}
          initialValue={text}
        >
          <OsInput
            style={{
              height: '36px',
            }}
            placeholder="0"
            disabled={renderEditableInput('Qty')}
            type="number"
            value={
              !selectTedRowIds?.includes(record?.id)
                ? text *
                  (record?.Bundle?.quantity ? record?.Bundle?.quantity : 1)
                : quoteLineItemByQuoteData?.quantity
            }
            onChange={(v) => {
              setQuoteLineItemByQuoteData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, quantity: v?.target?.value};
                  }
                  return prevItem;
                }),
              );
            }}
          />
        </Form.Item>
      ),
      width: 120,
    },
    {
      title: 'MSRP',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 187,
      render: (text: number) => {
        const value = useRemoveDollarAndCommahook(text);
        return (
          <Typography name="Body 4/Medium">
            {`$ ${abbreviate(value ?? 0)}`}
            {/* {record?.Bundle?.quantity ? record?.Bundle?.quantity : 1} */}
          </Typography>
        );
      },
    },
    {
      title: 'Cost',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      width: 187,
      render: (text: any) => {
        // const totalAddedPrice = record?.Product?.adjusted_price
        //   ?.slice(1, record?.Product?.adjusted_price?.length)
        //   .replace(',', '');
        // // eslint-disable-next-line no-unsafe-optional-chaining
        // const ExactPriceForOne = totalAddedPrice / record?.Product?.quantity;
        // let bundleQuantity: any = 1;
        // bundleQuantity = record?.Bundle ? record?.Bundle?.quantity : 1;
        // const totalQuantity = record?.quantity * bundleQuantity;
        // const TotalPrice = totalQuantity * ExactPriceForOne;
        const value = useRemoveDollarAndCommahook(text);
        return (
          <Typography name="Body 4/Medium">
            {`$ ${abbreviate(value ?? 0)}`}
          </Typography>
        );
      },
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render(text: any, record: any) {
        return {
          props: {
            style: {
              background: selectTedRowIds?.includes(record?.id)
                ? '#E8EBEE'
                : ' ',
            },
          },
          children: (
            <Form.Item
              className="formmarginBottom"
              name={`product_family ${record?.id}`}
              rules={[
                {
                  required: renderRequiredInput('Product Family'),
                  message: 'This Field id Required',
                },
              ]}
              initialValue={text}
            >
              <CommonSelect
                disabled={renderEditableInput('Product Family')}
                allowClear
                style={{width: '200px'}}
                placeholder="Select"
                defaultValue={record?.Product?.product_family}
                options={selectDataForProduct}
                onChange={(e) => {
                  const data = {id: record?.product_id, product_family: e};
                  dispatch(updateProductFamily(data));
                }}
              />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setSelectedRowIds([record?.id]);
              setIsDeleteInputDetailModal(true);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (selectedFilter === 'Product Family') {
      const finalFamilyArr: any = [];
      let productsArr: any = [];
      let professionalServiceArr: any = [];
      let maintenanceArr: any = [];
      let subscriptionArr: any = [];
      let unassignedArr: any = [];

      if (dataNullForBundle?.[0] && dataNullForBundle?.[0]?.length > 0) {
        productsArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family === 'Products',
        );
        professionalServiceArr = dataNullForBundle?.[0]?.filter(
          (item: any) =>
            item?.Product?.product_family === 'Professional Services',
        );
        maintenanceArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family === 'Maintenance',
        );
        subscriptionArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family === 'Subscriptions',
        );
        unassignedArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family == null,
        );
      }
      if (productsArr && productsArr?.length > 0) {
        const obj: any = {
          name: 'Products',
          QuoteLineItem: productsArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (professionalServiceArr && professionalServiceArr?.length > 0) {
        const obj: any = {
          name: 'Professional Services',
          QuoteLineItem: professionalServiceArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (maintenanceArr && maintenanceArr?.length > 0) {
        const obj: any = {
          name: 'Maintenances',
          QuoteLineItem: maintenanceArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (unassignedArr && subscriptionArr?.length > 0) {
        const obj: any = {
          name: 'Subscriptions',
          QuoteLineItem: subscriptionArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (unassignedArr && unassignedArr?.length > 0) {
        const obj: any = {
          name: 'Unassigned',
          QuoteLineItem: unassignedArr,
        };
        finalFamilyArr?.push(obj);
      }
      setFamilyFilter(finalFamilyArr);
    }
  }, [selectedFilter]);

  useEffect(() => {
    const newArr: any = [];
    InputDetailQuoteLineItemcolumns?.map((itemCol: any) => {
      let shouldPush = false;
      tableColumnDataShow?.forEach((item: any) => {
        if (item?.field_name === itemCol?.title) {
          shouldPush = true;
        }
      });
      if (
        itemCol?.dataIndex === 'actions' ||
        itemCol?.dataIndex?.includes('actions.')
      ) {
        shouldPush = true;
      }
      if (shouldPush) {
        newArr?.push(itemCol);
      }
    });
    setFinalInputColumn(newArr);
  }, [tableColumnDataShow]);

  useEffect(() => {
    dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID))).then((d: any) => {
      setQuoteLineItemByQuoteData(d?.payload);
      if (d?.payload && d?.payload?.length > 0) {
        setQuoteLineItemExist(true);
      }
    });
  }, [getQuoteID]);

  useEffect(() => {
    const separatedData: any = {};
    quoteLineItemByQuoteID?.forEach((item: any) => {
      const fileName = item?.file_name;
      if (!separatedData[fileName]) {
        separatedData[fileName] = {
          id: item.id,
          title: fileName,
          data: [],
          dataLength: 0,
          totalAdjustedPrice: 0,
          dataIds: [],
        };
      }
      separatedData[fileName].data.push(item);
      separatedData[fileName].dataLength++;
      separatedData[fileName].totalAdjustedPrice += parseFloat(
        item.adjusted_price.replace(/[$,]/g, ''),
      );
      separatedData[fileName].dataIds.push(item.id);
    });
    const result = Object.values(separatedData);
    setQuoteLineItemByQuoteData1(result);
  }, [quoteLineItemByQuoteID]);

  const addConcernData = () => {
    const raiseIssueData = form?.getFieldsValue();
    const updatedIssue =
      raiseIssueData?.other_issue || raiseIssueData?.issue_type;

    if (!raiseIssueData) {
      openNotificationWithIcon();
      return;
    }
    const data = {
      issue_type: updatedIssue,
      affected_columns: raiseIssueData?.issue_type === 'Unread Column/Unmatched Column' ? raiseIssueData?.affected_columns : null,
      id: fileLineItemIds,
    };
    dispatch(updateQuoteLineItemConcern(data));
    if (buttonType === 'primary') {
      router?.push(`/fileEditor?id=${getQuoteID}&quoteExist=false`);
    } else {
      router?.push(`/updation`);
    }
    setShowRaiseConcernModal(false);
    form?.resetFields();
  };

  const fileVerification = () => {
    // this API also call after table updatation.
    dispatch(updateQuoteLineItemVerified({ids: fileLineItemIds})).then((d) => {
      if (d) {
        dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID)));
        setShowVerificationFileModal(false);
      }
    });
  };

  return (
    <>
      {contextHolder}
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        <>
          <Form>
            {bundleData && bundleData?.length > 0 ? (
              <>
                {' '}
                {bundleData?.map((item: any, index: any) => (
                  <OsCollapse
                    key={item?.id}
                    items={[
                      {
                        key: '1',
                        label: (
                          <>
                            <Space
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <p>{item?.name}</p>
                              <p>Lines:{item?.QuoteLineItems?.length}</p>
                              <p>Desc: {item?.description}</p>
                              <p>
                                Quantity:
                                <OsInput
                                  defaultValue={item?.quantity}
                                  style={{width: '60px'}}
                                  onChange={(e: any) => {
                                    const data = {
                                      id: item?.id,
                                      quantity: e.target.value,
                                    };
                                    updateBundleQuantityData(data);
                                  }}
                                />
                              </p>
                            </Space>
                          </>
                        ),
                        // children: item?.children,
                        children: (
                          <OsTableWithOutDrag
                            loading={loading}
                            // rowSelection={rowSelection}
                            columns={finalInputColumn}
                            dataSource={item?.QuoteLineItems || []}
                            scroll
                            rowSelection={rowSelection}
                            locale={locale}
                          />
                        ),
                      },
                    ]}
                  />
                ))}{' '}
                {selectedFilter ? (
                  <>
                    {familyFilter?.map((item: any, index: any) => (
                      <OsCollapse
                        key={item?.id}
                        items={[
                          {
                            key: item?.id,
                            label: (
                              <>
                                <Space
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                  }}
                                >
                                  <p>{item?.name}</p>
                                </Space>
                              </>
                            ),
                            // children: item?.children,
                            children: (
                              <OsTableWithOutDrag
                                loading={loading}
                                columns={finalInputColumn}
                                dataSource={item?.QuoteLineItem || []}
                                scroll
                                rowSelection={rowSelection}
                                locale={locale}
                              />
                            ),
                          },
                        ]}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {dataNullForBundle?.[0]?.length > 0 &&
                      dataNullForBundle?.[0] && (
                        <OsCollapse
                          items={[
                            {
                              key: '1',
                              label: (
                                <>
                                  <Space
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'start',
                                    }}
                                  >
                                    <p>Unassigned</p>
                                  </Space>
                                </>
                              ),
                              // children: item?.children,
                              children: (
                                <OsTableWithOutDrag
                                  loading={loading}
                                  columns={finalInputColumn}
                                  dataSource={dataNullForBundle?.[0] || []}
                                  scroll
                                  rowSelection={rowSelection}
                                  locale={locale}
                                />
                              ),
                            },
                          ]}
                        />
                      )}
                  </>
                )}{' '}
              </>
            ) : (
              <>
                {selectedFilter ? (
                  <>
                    {' '}
                    {familyFilter?.map((item: any, index: any) => (
                      <OsCollapse
                        key={item?.id}
                        items={[
                          {
                            key: item.id,
                            label: (
                              <>
                                <Space
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                  }}
                                >
                                  <p>{item?.name}</p>
                                </Space>
                              </>
                            ),
                            children: (
                              <OsTableWithOutDrag
                                loading={loading}
                                columns={finalInputColumn}
                                dataSource={item?.QuoteLineItem || []}
                                scroll
                                rowSelection={rowSelection}
                                locale={locale}
                              />
                            ),
                          },
                        ]}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {quoteLineItemByQuoteData1?.map((item: any) => (
                      <OsCollapse
                        items={[
                          {
                            key: '1',
                            label: (
                              <>
                                <Row justify="space-between">
                                  <Col>
                                    <p>{item?.title}</p>
                                  </Col>
                                  <Col>
                                    <p>Line Items: {item?.dataLength}</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      Total Cost: {item?.totalAdjustedPrice}
                                    </p>
                                  </Col>
                                  <Col>
                                    <Space>
                                      <CheckIcon
                                        width={25}
                                        color={token?.colorSuccess}
                                        onClick={(e) => {
                                          e?.stopPropagation();
                                          setShowVerificationFileModal(true);
                                          setFileLineItemIds(item?.dataIds);
                                        }}
                                      />
                                      <XMarkIcon
                                        width={25}
                                        color={token?.colorError}
                                        onClick={(e) => {
                                          e?.stopPropagation();
                                          setShowRaiseConcernModal(true);
                                          setFileLineItemIds(item?.dataIds);
                                        }}
                                      />
                                    </Space>
                                  </Col>
                                </Row>
                              </>
                            ),
                            children: (
                              <OsTableWithOutDrag
                                columns={finalInputColumn}
                                dataSource={item?.data || []}
                                rowSelection={rowSelection}
                                scroll
                                loading={loading}
                                locale={locale}
                              />
                            ),
                          },
                        ]}
                      />
                    ))}
                  </>
                )}{' '}
              </>
            )}
          </Form>
        </>
      ) : (
        <EmptyContainer
          title="There is no columns for Input Details"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}

      <DeleteModal
        setShowModalDelete={setIsDeleteInputDetailModal}
        setSelectedRowIds={setSelectedRowIds}
        showModalDelete={isDeleteInputDetailModal}
        deleteSelectedIds={deleteQuoteLineItems}
        description="Are you sure you want to delete this QuoteLineItem?"
        heading="Delete QuoteLineItem"
      />

      <OsModal
        loading={loading}
        body={
          <RaiseConcern
            title="Report an issue"
            description="We are here to assist you ! Please write your concern regarding this quote to us. Also, you can update the quote manually."
            image={RaiseConcernImg}
            form={form}
            onClick={addConcernData}
          />
        }
        bodyPadding={40}
        width={638}
        open={showRaiseConcernModal}
        onCancel={() => {
          setShowRaiseConcernModal(false);
        }}
        destroyOnClose
        thirdButtonText="Export File to Tables"
        primaryButtonText="Edit Data As-Is"
        onOk={() => {
          form?.submit();
          setButtonType('primary');
        }}
        thirdButtonfunction={() => {
          form?.submit();
        }}
      />

      <OsModal
        loading={loading}
        body={
          <OSDialog
            title="Are you sure want to verified this file?"
            description="Please acknowledge before proceeding."
            image={GreenCheckIcon}
          />
        }
        bodyPadding={40}
        width={638}
        open={showVerificationFileModal}
        onCancel={() => {
          setShowVerificationFileModal(false);
        }}
        destroyOnClose
        secondaryButtonText="Cancel"
        primaryButtonText="Yes"
        onOk={() => {
          fileVerification();
        }}
        singleButtonInCenter
      />
    </>
  );
};

export default InputDetails;
