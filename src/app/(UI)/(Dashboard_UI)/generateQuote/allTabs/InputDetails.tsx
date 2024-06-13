/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
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
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import RaiseConcern from '@/app/components/common/os-raise-concern';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {selectDataForProduct} from '@/app/utils/CONSTANTS';
import {updateTables, useRemoveDollarAndCommahook} from '@/app/utils/base';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import GreenCheckIcon from '../../../../../../public/assets/static/greenCheckIcon.svg';
import RaiseConcernImg from '../../../../../../public/assets/static/raiseConcern.svg';
import {getAllBundle} from '../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../redux/actions/product';
import {
  UpdateQuoteFileById,
  getQuoteFileByQuoteId,
} from '../../../../../../redux/actions/quoteFile';
import {
  DeleteQuoteLineItemById,
  getQuoteLineItemByQuoteId,
  getQuoteLineItemByQuoteIdandBundleIdNull,
} from '../../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setConcernQuoteLineItemData} from '../../../../../../redux/slices/quotelineitem';
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
  setActiveTab,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {abbreviate} = useAbbreviationHook(0);
  const [form] = Form.useForm();
  const {
    quoteLineItemByQuoteID,
    loading,
    data: dataNullForBundle,
  } = useAppSelector((state) => state.quoteLineItem);
  const [dataForQuoteLineItemsAll, setDataForQuoteLineItemsAll] =
    useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const {loading: quoteFileDataLoading, data: quoteFileData} = useAppSelector(
    (state) => state.quoteFile,
  );
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] = useState<any>(
    quoteLineItemByQuoteID,
  );
  const [quoteLineItemByQuoteData1, setQuoteLineItemByQuoteData1] =
    useState<any>(quoteFileData);
  const [showRaiseConcernModal, setShowRaiseConcernModal] =
    useState<boolean>(false);
  const [showVerificationFileModal, setShowVerificationFileModal] =
    useState<boolean>(false);
  const [fileLineItemIds, setFileLineItemIds] = useState<number[]>([]);
  const [buttonType, setButtonType] = useState<string>('');
  const [fileData, setFileData] = useState<any>();
  const [api, contextHolder] = notification.useNotification();
  const [nanonetsLoading, setNanonetsLoading] = useState<boolean>(false);
  const [confirmedData, setConfirmedData] = useState<boolean>(false);
  const [defaultDataShow, setDefaultDataShow] = useState<boolean>(true);
  const [showExportAs, setShowExportAs] = useState<boolean>(true);
  const [showExportToTable, setShowExportToTable] = useState<boolean>(true);

  const openNotificationWithIcon = () => {
    api.warning({
      message: 'Please Add Concern!',
      description:
        'We are here to assist you! Please write your concern regarding this quote to us.',
    });
  };
  const locale = {
    emptyText: <EmptyContainer title="There are no Quotes to review" />,
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

  useEffect(() => {
    dispatch(getAllBundle(getQuoteID));
    dispatch(getQuoteLineItemByQuoteIdandBundleIdNull(Number(getQuoteID)));
  }, [getQuoteID]);

  useEffect(() => {
    setQuoteLineItemByQuoteData(quoteLineItemByQuoteID);
  }, [quoteLineItemByQuoteID]);

  const deleteQuoteLineItems = () => {
    if (selectTedRowIds) {
      const data = {Ids: selectTedRowIds};
      dispatch(DeleteQuoteLineItemById(data));
      setSelectedRowIds([]);
      // setTimeout(() => {
      //   dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID))).then(
      //     (d: any) => {
      //       setQuoteLineItemByQuoteData(d?.payload);
      //     },
      //   );
      // }, 2000);
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
      render: (text: any, record: any, index: number) => (
        <OsInput
          disabled={renderEditableInput('#Line')}
          style={{
            height: '36px',
          }}
          placeholder={text}
          value={index + 1}
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <Form.Item
          className="formmarginBottom"
          name={`Quantity ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('Quantity'),
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
            disabled={renderEditableInput('Quantity')}
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
      title: 'MSRP ($)',
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
      title: 'Cost ($)',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      width: 187,
      render: (text: any) => {
        const value = useRemoveDollarAndCommahook(text);
        return (
          <Typography name="Body 4/Medium">
            {text === null ? 0.0 : `$ ${abbreviate(value ?? 0.0)}`}
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
                  // window?.location?.reload();
                  dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
                }}
              />
            </Form.Item>
          ),
        };
      },
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   width: 94,
    //   render: (text: string, record: any) => (
    //     <Space size={18}>
    //       <TrashIcon
    //         height={24}
    //         width={24}
    //         color={token.colorError}
    //         style={{cursor: 'pointer'}}
    //         onClick={() => {
    //           setSelectedRowIds([record?.id]);
    //           setIsDeleteInputDetailModal(true);
    //         }}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    if (selectedFilter === 'Product Family') {
      const finalFamilyArr: any = [];
      let productsArr: any = [];
      let professionalServiceArr: any = [];
      let maintenanceArr: any = [];
      let subscriptionArr: any = [];
      let unassignedArr: any = [];

      if (dataForQuoteLineItemsAll && dataForQuoteLineItemsAll?.length > 0) {
        console.log('finalFamilyArrfinalFamilyArr', dataNullForBundle);
        productsArr = dataForQuoteLineItemsAll?.filter(
          (item: any) => item?.Product?.product_family === 'Products',
        );
        professionalServiceArr = dataForQuoteLineItemsAll?.filter(
          (item: any) =>
            item?.Product?.product_family === 'Professional Services',
        );
        maintenanceArr = dataForQuoteLineItemsAll?.filter(
          (item: any) => item?.Product?.product_family === 'Maintenance',
        );
        subscriptionArr = dataForQuoteLineItemsAll?.filter(
          (item: any) => item?.Product?.product_family === 'Subscriptions',
        );
        unassignedArr = dataForQuoteLineItemsAll?.filter(
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
    } else if (!selectedFilter) {
      setDefaultDataShow(false);
    } else if (selectedFilter === 'File Name') {
      setDefaultDataShow(true);
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
    dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
    dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID)));
  }, [getQuoteID, defaultDataShow]);

  useEffect(() => {
    const separatedData: any = {};
    quoteFileData?.forEach((item: any) => {
      const fileName = item.file_name;
      if (!separatedData[fileName]) {
        separatedData[fileName] = {
          id: item.id,
          title: fileName,
          totalAdjustedPrice: 0,
          totalCount: 0,
          quoteFile: item?.quote_file,
          pdfUrl: item?.pdf_url,
          quoteLineItems: [],
        };
      }

      item?.QuoteLineItems?.forEach((quoteLineItem: any) => {
        separatedData[fileName].quoteLineItems.push(quoteLineItem);
        separatedData[fileName].totalCount++;
        separatedData[fileName].totalAdjustedPrice += Number(
          quoteLineItem?.adjusted_price * quoteLineItem?.quantity,
        );
      });
    });

    const result = Object.values(separatedData);
    const combinedArr: any = [];
    if (quoteFileData && quoteFileData?.length > 0) {
      quoteFileData?.forEach((itemOut: any) => {
        itemOut?.QuoteLineItems?.map((itemss: any) => {
          combinedArr?.push(itemss);
        });
      });
    }
    setDataForQuoteLineItemsAll(combinedArr);

    setQuoteLineItemByQuoteData1(result);
  }, [quoteFileData, defaultDataShow]);

  const addConcernData = async () => {
    const raiseIssueData = form?.getFieldsValue();
    const updatedIssue =
      raiseIssueData?.other_issue || raiseIssueData?.issue_type;

    if (!raiseIssueData) {
      openNotificationWithIcon();
      return;
    }
    const data = {
      issue_type: updatedIssue,
      affected_columns:
        raiseIssueData?.issue_type === 'Unread Column/Unmatched Column'
          ? raiseIssueData?.affected_columns
          : null,
      id: fileLineItemIds,
    };
    dispatch(UpdateQuoteFileById(data));
    dispatch(setConcernQuoteLineItemData(fileData));
    if (buttonType === 'primary') {
      router?.push(
        `/fileEditor?id=${getQuoteID}&fileId=${fileLineItemIds}&quoteExist=true`,
      );
      setShowRaiseConcernModal(false);
      form?.resetFields();
    } else {
      setShowRaiseConcernModal(false);
      form?.resetFields();
      router?.push(
        `/fileEditor?id=${getQuoteID}&fileId=${fileLineItemIds}&quoteExist=false`,
      );
    }
  };

  const updateAllTablesData = async () => {
    setConfirmedData(true);
    const isState = await updateTables(
      fileData,
      fileData?.quoteLineItems,
      userInformation,
      dispatch,
    );
    if (isState) {
      setConfirmedData(false);
      dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
    }
    setTimeout(() => {
      // setActiveTab('2');
      location?.reload();
    }, 1000);
    setShowVerificationFileModal(false);
  };

  return (
    <>
      {contextHolder}
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        <>
          <Form>
            <>
              {defaultDataShow ? (
                <GlobalLoader loading={quoteFileDataLoading}>
                  {quoteLineItemByQuoteData1?.length > 0 ? (
                    quoteLineItemByQuoteData1?.map((item: any) => {
                      return (
                        <OsCollapse
                          items={[
                            {
                              key: '1',
                              label: (
                                <>
                                  <Row justify="space-between">
                                    <Col span={6}>
                                      <p>{item?.title}</p>
                                    </Col>
                                    <Col span={6}>
                                      <p>Line Items: {item?.totalCount}</p>
                                    </Col>
                                    <Col span={6}>
                                      <p>
                                        Total Cost: $
                                        {abbreviate(
                                          item?.totalAdjustedPrice ?? 0.0,
                                        )}
                                      </p>
                                    </Col>
                                    <Col
                                      span={6}
                                      style={{
                                        justifyContent: 'end',
                                        display: 'flex',
                                      }}
                                    >
                                      <Space>
                                        <AvatarStyled
                                          shape="square"
                                          background={token?.colorSuccess}
                                          size={28}
                                          icon={
                                            <CheckIcon
                                              width={25}
                                              color={token?.colorBgContainer}
                                              onClick={(e) => {
                                                e?.stopPropagation();
                                                setShowVerificationFileModal(
                                                  true,
                                                );
                                                setFileLineItemIds(item?.id);
                                                setFileData(item);
                                              }}
                                            />
                                          }
                                        />
                                        <AvatarStyled
                                          shape="square"
                                          background={token?.colorError}
                                          size={28}
                                          icon={
                                            <XMarkIcon
                                              width={25}
                                              color={token?.colorBgContainer}
                                              onClick={(e) => {
                                                if (
                                                  item?.quoteLineItems
                                                    ?.length === 0
                                                ) {
                                                  setShowExportAs(false);
                                                }
                                                if (
                                                  item?.title?.split('.')[1] !==
                                                  'pdf'
                                                ) {
                                                  setShowExportToTable(false);
                                                }

                                                // setShowExportAs
                                                e?.stopPropagation();
                                                setShowRaiseConcernModal(true);
                                                setFileLineItemIds(item?.id);

                                                setFileData(item);
                                              }}
                                            />
                                          }
                                        />
                                      </Space>
                                    </Col>
                                  </Row>
                                </>
                              ),
                              children: (
                                <OsTableWithOutDrag
                                  columns={finalInputColumn}
                                  dataSource={item?.quoteLineItems || []}
                                  rowSelection={rowSelection}
                                  scroll
                                  loading={false}
                                  locale={locale}
                                />
                              ),
                            },
                          ]}
                        />
                      );
                    })
                  ) : (
                    <OsTableWithOutDrag
                      columns={finalInputColumn}
                      scroll
                      loading={false}
                      locale={locale}
                    />
                  )}
                </GlobalLoader>
              ) : (
                <OsTableWithOutDrag
                  columns={finalInputColumn}
                  dataSource={quoteLineItemByQuoteData || []}
                  rowSelection={rowSelection}
                  scroll
                  loading={false}
                  locale={locale}
                />
              )}
            </>
          </Form>
        </>
      ) : (
        <EmptyContainer
          title="There is no columns for Review Quotes"
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
        thirdLoading={nanonetsLoading}
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
          form?.resetFields();
        }}
        destroyOnClose
        thirdButtonText={showExportToTable ? 'Export File to Tables' : ''}
        primaryButtonText={showExportAs ? 'Edit Data As-Is' : ''}
        onOk={() => {
          form?.submit();
          setButtonType('primary');
        }}
        thirdButtonfunction={() => {
          form?.submit();
        }}
      />

      <OsModal
        loading={confirmedData}
        body={
          <OSDialog
            title="Are you sure you want to verify this file?"
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
          updateAllTablesData();
        }}
        singleButtonInCenter
      />
    </>
  );
};

export default InputDetails;
