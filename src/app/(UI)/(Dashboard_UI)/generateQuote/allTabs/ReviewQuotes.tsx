'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapse from '@/app/components/common/os-collapse';
import OSDialog from '@/app/components/common/os-dialog';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import RaiseConcern from '@/app/components/common/os-raise-concern';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {
  convertToNumber,
  updateTables,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, Suspense, useEffect, useState} from 'react';
import GreenCheckIcon from '../../../../../../public/assets/static/greenCheckIcon.svg';
import RaiseConcernImg from '../../../../../../public/assets/static/raiseConcern.svg';
import {
  UpdateQuoteFileById,
  getQuoteFileByQuoteId,
  getQuoteFileCount,
  quoteFileVerification,
} from '../../../../../../redux/actions/quoteFile';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setConcernQuoteLineItemData} from '../../../../../../redux/slices/quotelineitem';
import {getProfitabilityByQuoteId} from '../../../../../../redux/actions/profitability';
import {setProfitability} from '../../../../../../redux/slices/profitability';
import {
  setQuoteFileDataCount,
  setQuoteFileUnverifiedById,
} from '../../../../../../redux/slices/quoteFile';
import GlobalLoader from '@/app/components/common/os-global-loader';
import CommonSelect from '@/app/components/common/os-select';

const ReviewQuotes: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  getQuoteDetailById,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const getQuoteID = searchParams.get('id');
  const isView = searchParams.get('isView');
  const {abbreviate} = useAbbreviationHook(0);
  const [form] = Form.useForm();
  const {userInformation} = useAppSelector((state) => state.user);
  const {loading: quoteFileDataLoading, quoteFileUnverifiedById} =
    useAppSelector((state) => state.quoteFile);
  const [showRaiseConcernModal, setShowRaiseConcernModal] =
    useState<boolean>(false);
  const [showVerificationFileModal, setShowVerificationFileModal] =
    useState<boolean>(false);
  const [buttonType, setButtonType] = useState<string>('');
  const [api, contextHolder] = notification.useNotification();
  const [nanonetsLoading, setNanonetsLoading] = useState<boolean>(false);
  const [showExportAs, setShowExportAs] = useState<boolean>(false);
  const [showExportToTable, setShowExportToTable] = useState<boolean>(false);
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [conditionsForTheButtons, setConditionsForTheButtons] = useState<any>();
  const [fileData, setFileData] = useState<any>();
  const [reviewQuotesData, setReviewQuotesData] = useState<any>();
  const [finalReviewCol, setFinalReviewCol] = useState<any>();
  const [fileVerificationLoading, setFileVerificationLoading] = useState(false);
  const [pageChange, setPageChange] = useState<any>();

  const filterDataByValue = (data: any, filterValue: any) => {
    const groupedData: any = {};
    data?.forEach((item: any) => {
      let name: any;
      if (filterValue === 'Product Family') {
        name = item?.Product?.product_family || 'Unassigned';
      } else if (filterValue === 'Pricing Method') {
        name = item?.pricing_method || 'Unassigned';
      } else if (filterValue === 'File Name') {
        name = item?.file_name;
      } else if (filterValue === 'Vendor/Disti') {
        name = item?.QuoteConfiguration?.Distributor?.distributor;
      } else if (filterValue === 'OEM') {
        name = item?.QuoteConfiguration?.Oem?.oem;
      }

      if (name) {
        const convertToTitleCase = (input: string) => {
          return input
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char: any) => char?.toUpperCase());
        };

        if (name?.includes('_') || name === name?.toLowerCase()) {
          name = convertToTitleCase(name);
        }

        if (!groupedData[name]) {
          groupedData[name] = {
            title: name,
            id: item?.id,
            QuoteLineItem: [],
            maunalAdded: item?.manual_file,
            totalAdjustedPrice: 0,
          };
        }

        item?.QuoteLineItems.forEach((quoteLineItem: any) => {
          groupedData[name].QuoteLineItem.push(quoteLineItem);
          groupedData[name].totalAdjustedPrice += Number(
            useRemoveDollarAndCommahook(
              quoteLineItem?.adjusted_price &&
                typeof quoteLineItem?.adjusted_price === 'number'
                ? quoteLineItem?.adjusted_price
                : 0,
            ) *
              useRemoveDollarAndCommahook(
                quoteLineItem?.quantity &&
                  typeof quoteLineItem?.quantity === 'number'
                  ? quoteLineItem?.quantity
                  : 0,
              ),
          );
        });
      }
    });
    console.log('45643534', groupedData);

    setReviewQuotesData(Object.values(groupedData));
    let newArrForPaggination: any = [];

    Object.values(groupedData)?.map((items: any) => {
      newArrForPaggination?.push({
        name: items?.name,
        current: 1,
        pageSize:
          items?.QuoteLineItem?.length < 10
            ? 10
            : items?.QuoteLineItem?.length < 20
              ? 20
              : items?.QuoteLineItem?.length < 30
                ? 30
                : items?.QuoteLineItem?.length < 31 ||
                    items?.QuoteLineItem?.length < 51
                  ? 50
                  : 100,
        total: 0,
      });
    });
    setPageChange(newArrForPaggination);
  };

  useEffect(() => {
    filterDataByValue(quoteFileUnverifiedById, selectedFilter);
  }, [quoteFileUnverifiedById, selectedFilter]);

  const openNotificationWithIcon = () => {
    api.warning({
      message: 'Please Add Concern!',
      description:
        'We are here to assist you! Please write your concern regarding this quote to us.',
    });
  };

  const locale = {
    emptyText: <EmptyContainer title="No data." />,
  };

  const InputDetailQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: any, record: any, index: number) => (
        <Typography name="Body 4/Medium">{index + 1}</Typography>
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
      sorter: (a: any, b: any) => a.quantity - b.quantity,
      render: (text: any, record: any) => (
        <Typography name="Body 4/Medium">{convertToNumber(text)}</Typography>
      ),
      width: 120,
    },
    {
      title: 'MSRP ($)',
      dataIndex: 'list_price',
      key: 'list_price',
      sorter: (a: any, b: any) => a.list_price - b.list_price,
      width: 187,
      render: (text: number) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">
            {convertToNumber(value)}
            {/* {`${abbreviate(Number(value ?? 0))}`} */}
          </Typography>
        );
      },
    },
    {
      title: 'Cost ($)',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      sorter: (a: any, b: any) => a.adjusted_price - b.adjusted_price,
      width: 187,
      render: (text: any) => {
        const value = useRemoveDollarAndCommahook(text ? text : 0);
        return (
          <Typography name="Body 4/Medium">
            {convertToNumber(value)}
            {/* {text === null ? 0.0 : `${abbreviate(value ?? 0.0)}`} */}
          </Typography>
        );
      },
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render(text: any, record: any) {
        return {
          children: (
            <CommonSelect
              disabled={true}
              allowClear
              style={{width: '200px', height: '36px'}}
              placeholder="Select"
              defaultValue={text ?? record?.Product?.product_family}
            />
          ),
        };
      },
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
    },
  ];

  useEffect(() => {
    const newArr: any = [];
    InputDetailQuoteLineItemcolumns?.forEach((itemCol: any) => {
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
    setFinalReviewCol(newArr);
  }, [tableColumnDataShow]);

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
      id: fileData?.id,
    };

    await dispatch(UpdateQuoteFileById(data));
    dispatch(setConcernQuoteLineItemData(fileData));
    if (buttonType === 'primary') {
      router?.push(
        `/fileEditor?id=${getQuoteID}&fileId=${fileData?.id}&quoteExist=true`,
      );
      setShowRaiseConcernModal(false);
      form?.resetFields();
    } else if (buttonType === 'fourth') {
      await dispatch(quoteFileVerification({id: fileData?.id}));
      await dispatch(getQuoteFileCount(Number(getQuoteID)));
      await dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
      setShowRaiseConcernModal(false);
      form?.resetFields();
    } else if (buttonType === 'fifth') {
      setShowRaiseConcernModal(false);
      form?.resetFields();
      router?.push(
        `manualFileEditor?id=${getQuoteID}&fileId=${fileData?.id}&manualFlow=false`,
      );
    } else {
      setShowRaiseConcernModal(false);
      form?.resetFields();
      router?.push(
        `/fileEditor?id=${getQuoteID}&fileId=${fileData?.id}&quoteExist=false&manualFlow=false`,
      );
    }
    setShowExportAs(false);
    setConditionsForTheButtons({
      exportAs: false,
      exportTable: false,
      maunalExport: false,
    });
    setShowExportToTable(false);
    setShowSubmitButton(false);
  };

  const updateAllTablesData = async () => {
    setFileVerificationLoading(true);
    try {
      await updateTables(
        getQuoteID,
        fileData,
        fileData?.QuoteLineItem,
        userInformation,
        dispatch,
      );
      getQuoteDetailById();
    } catch (error) {
      console.error('Error updating tables:', error);
    } finally {
      setTimeout(() => {
        setFileVerificationLoading(false);
        setShowVerificationFileModal(false);
      }, 2000);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalLoader loading={quoteFileDataLoading}>
        {contextHolder}
        {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
          !selectedFilter ? (
            <div>
              <OsTableWithOutDrag
                loading={quoteFileDataLoading}
                columns={finalReviewCol}
                dataSource={quoteFileUnverifiedById?.[0]?.QuoteLineItems}
                scroll
                locale={locale}
                defaultPageSize={
                  quoteFileUnverifiedById?.[0]?.QuoteLineItems?.length
                }
              />
            </div>
          ) : selectedFilter && reviewQuotesData?.length > 0 ? (
            <>
              {reviewQuotesData?.map((finalDataItem: any, index: number) => {
                return (
                  <OsCollapse
                    key={index}
                    items={[
                      {
                        key: index,
                        label: (
                          <Row justify="space-between">
                            <Col span={10}>
                              <p>{finalDataItem?.title}</p>
                            </Col>
                            <Col span={4}>
                              <p>
                                Line Items:{' '}
                                {finalDataItem?.QuoteLineItem?.length}
                              </p>
                            </Col>
                            <Col span={4}>
                              <p>
                                Total Cost: $
                                {abbreviate(
                                  Number(
                                    finalDataItem?.totalAdjustedPrice ?? 0.0,
                                  ),
                                )}
                              </p>
                            </Col>
                            <Col
                              span={4}
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
                                        if (isView === 'true') {
                                          notification.open({
                                            message:
                                              "You can't use in view mode.",
                                            type: 'info',
                                          });
                                        } else {
                                          setShowVerificationFileModal(true);
                                          setFileData(finalDataItem);
                                        }
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
                                        if (isView === 'true') {
                                          notification.open({
                                            message:
                                              "You can't use in view mode.",
                                            type: 'info',
                                          });
                                        } else {
                                          if (!finalDataItem?.maunalAdded) {
                                            if (
                                              finalDataItem?.QuoteLineItem
                                                ?.length === 0
                                            ) {
                                              setConditionsForTheButtons({
                                                ...conditionsForTheButtons,
                                                exportAs: false,
                                              });
                                              setShowExportAs(false);
                                            } else {
                                              setConditionsForTheButtons({
                                                ...conditionsForTheButtons,
                                                exportAs: true,
                                              });
                                              setShowExportAs(true);
                                            }
                                            if (
                                              !finalDataItem?.title
                                                ?.toLowerCase()
                                                ?.split('.')
                                                ?.includes('pdf')
                                            ) {
                                              setConditionsForTheButtons({
                                                ...conditionsForTheButtons,
                                                exportTable: false,
                                              });
                                              setShowExportToTable(false);
                                            } else {
                                              setConditionsForTheButtons({
                                                ...conditionsForTheButtons,
                                                exportTable: true,
                                              });
                                              setShowExportToTable(true);
                                            }
                                            if (
                                              finalDataItem?.QuoteLineItem
                                                ?.length === 0 &&
                                              !finalDataItem?.title
                                                ?.toLowerCase()
                                                ?.split('.')
                                                ?.includes('pdf')
                                            ) {
                                              setConditionsForTheButtons({
                                                ...conditionsForTheButtons,
                                                maunalExport: true,
                                              });
                                              setShowSubmitButton(true);
                                            } else {
                                              setConditionsForTheButtons({
                                                ...conditionsForTheButtons,
                                                maunalExport: false,
                                              });
                                              setShowSubmitButton(false);
                                            }
                                          }
                                          if (finalDataItem?.maunalAdded) {
                                            setConditionsForTheButtons({
                                              ...conditionsForTheButtons,
                                              exportAs: false,
                                              exportTable: false,
                                              maunalExport: true,
                                            });
                                            setShowSubmitButton(true);
                                            setShowExportToTable(false);
                                            setShowExportAs(false);
                                          }

                                          setShowRaiseConcernModal(true);
                                          setFileData(finalDataItem);
                                        }
                                        e?.stopPropagation();
                                      }}
                                    />
                                  }
                                />
                              </Space>
                            </Col>
                          </Row>
                        ),
                        children: (
                          <OsTableWithOutDrag
                            loading={quoteFileDataLoading}
                            columns={finalReviewCol}
                            dataSource={finalDataItem?.QuoteLineItem}
                            scroll
                            locale={locale}
                            defaultPageSize={
                              finalDataItem?.QuoteLineItem?.length
                            }
                            setPageChange={setPageChange}
                            pageChange={pageChange}
                            uniqueId={finalDataItem?.name}
                          />
                        ),
                      },
                    ]}
                  />
                );
              })}
            </>
          ) : (
            <EmptyContainer
              title={
                selectedFilter
                  ? `There is no data for ${selectedFilter}.`
                  : 'There is no data.'
              }
            />
          )
        ) : (
          <EmptyContainer
            title="There is no columns for Review Quotes"
            subTitle="Please update the columns from the Admin Configuration Tab or request the admin to do so."
          />
        )}

        <OsModal
          loading={quoteFileDataLoading}
          thirdLoading={nanonetsLoading}
          body={
            <RaiseConcern
              title="Report an issue"
              description="We are here to assist you! Please write your concern regarding this quote to us. Also, you can update the quote manually."
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
          thirdButtonText={
            // conditionsForTheButtons?.exportTable ? 'Export File to Tables' : ''
            showExportToTable ? 'Export File to Tables' : ''
          }
          primaryButtonText={
            // conditionsForTheButtons?.exportAs ? 'Edit Data As-Is' : ''
            showExportAs ? 'Edit Data As-Is' : ''
          }
          fourthButtonText={
            // conditionsForTheButtons?.maunalExport ? 'Submit Issue' : ''
            showSubmitButton ? 'Submit Issue' : ''
          }
          fifthButtonText={'Update Manually'}
          onOk={() => {
            form?.submit();
            setButtonType('primary');
          }}
          thirdButtonfunction={() => {
            form?.submit();
          }}
          fourthButtonfunction={() => {
            form?.submit();
            setButtonType('fourth');
          }}
          fifthButtonfunction={() => {
            form?.submit();
            setButtonType('fifth');
          }}
        />

        <OsModal
          loading={fileVerificationLoading}
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
      </GlobalLoader>
    </Suspense>
  );
};

export default ReviewQuotes;
