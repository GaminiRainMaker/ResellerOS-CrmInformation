/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {selectDataForProduct} from '@/app/utils/CONSTANTS';
import {useRemoveDollarAndCommahook} from '@/app/utils/base';
import {TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  getAllBundle,
  updateBundleQuantity,
} from '../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../redux/actions/product';
import {
  DeleteQuoteLineItemById,
  getQuoteLineItemByQuoteId,
  getQuoteLineItemByQuoteIdandBundleIdNull,
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
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {abbreviate} = useAbbreviationHook(0);
  // const [finalInputColumn, setFinalInputColumn] = useState<any>();
  const {
    quoteLineItemByQuoteID,
    loading,
    data: dataNullForBundle,
  } = useAppSelector((state) => state.quoteLineItem);
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] = useState<any>(
    quoteLineItemByQuoteID,
  );
  const {data: bundleData} = useAppSelector((state) => state.bundle);
  const locale = {
    emptyText: <EmptyContainer title="There is no data for Input Details" />,
  };
  console.log('selectedFilter', selectedFilter, familyFilter);

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
      title: 'Product Code',
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
      width: 187,
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
      render: (text: any, record: any) => {
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

  console.log(
    'dataNullForBundledataNullForBundle',
    selectedFilter,
    dataNullForBundle,
  );
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
      let countForDel: any = 0;
      tableColumnDataShow?.filter((item: any) => {
        if (item?.field_name?.includes(itemCol?.title)) {
          newArr?.push(itemCol);
        } else if (itemCol?.title?.includes('Actions') && countForDel === 0) {
          newArr?.push(itemCol);
          // eslint-disable-next-line operator-assignment
          countForDel = countForDel + 1;
        }
      });
      // if (itemCol?.dataIndex?.includes('actions')) {
      //   newArr?.push(itemCol);
      // }
    });
    // actions
    setFinalInputColumn(newArr);
  }, [tableColumnDataShow]);

  useEffect(() => {
    dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID))).then((d: any) => {
      setQuoteLineItemByQuoteData(d?.payload);
    });
  }, [getQuoteID]);

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
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
                // item?.children
                <OsTableWithOutDrag
                  loading={loading}
                  columns={finalInputColumn}
                  dataSource={quoteLineItemByQuoteData || []}
                  scroll
                  rowSelection={rowSelection}
                  locale={locale}
                />
              )}{' '}
            </>
          )}
          {/* <OsTableWithOutDrag
            loading={loading}
            columns={finalInputColumn}
            dataSource={quoteLineItemByQuoteData}
            rowSelection={rowSelection}
            scroll
            locale={locale}
          /> */}
        </Form>
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
    </>
  );
};

export default InputDetails;
