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
import {updateTables, useRemoveDollarAndCommahook} from '@/app/utils/base';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import GreenCheckIcon from '../../../../../../public/assets/static/greenCheckIcon.svg';
import RaiseConcernImg from '../../../../../../public/assets/static/raiseConcern.svg';
import {
  UpdateQuoteFileById,
  getQuoteFileByQuoteId,
  getQuoteFileCount,
} from '../../../../../../redux/actions/quoteFile';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setConcernQuoteLineItemData} from '../../../../../../redux/slices/quotelineitem';
import {getProfitabilityByQuoteId} from '../../../../../../redux/actions/profitability';
import {setProfitability} from '../../../../../../redux/slices/profitability';
import {setQuoteFileDataCount} from '../../../../../../redux/slices/quoteFile';

const ReviewQuotes: FC<any> = ({tableColumnDataShow, selectedFilter}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {abbreviate} = useAbbreviationHook(0);
  const [form] = Form.useForm();
  const {userInformation} = useAppSelector((state) => state.user);
  const {loading: quoteFileDataLoading, data: quoteFileData} = useAppSelector(
    (state) => state.quoteFile,
  );
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

  const [fileData, setFileData] = useState<any>();
  const [reviewQuotesData, setReviewQuotesData] = useState<any>();
  const [finalReviewCol, setFinalReviewCol] = useState<any>();
  const [fileVerificationLoading, setFileVerificationLoading] = useState(false);

  const filterDataByValue = (data: any, filterValue: any) => {
    const groupedData: any = {};
    data?.forEach((item: any) => {
      let name: any;
      if (filterValue === 'Product Family') {
        name = item?.Product?.product_family || 'Unassigned';
      } else if (filterValue === 'Pricing Method') {
        name = item?.pricing_method;
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
            totalAdjustedPrice: 0,
          };
        }

        item?.QuoteLineItems.forEach((quoteLineItem: any) => {
          groupedData[name].QuoteLineItem.push(quoteLineItem);
          groupedData[name].totalAdjustedPrice += Number(
            useRemoveDollarAndCommahook(quoteLineItem?.adjusted_price ?? 0) *
              useRemoveDollarAndCommahook(quoteLineItem?.quantity ?? 0),
          );
        });
      }
    });

    setReviewQuotesData(Object.values(groupedData));
  };

  useEffect(() => {
    filterDataByValue(quoteFileData, selectedFilter);
  }, [quoteFileData, selectedFilter]);

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

  const InputDetailQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: any) => (
        <Typography name="Body 4/Medium">{text}</Typography>
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
        <Typography name="Body 4/Medium">{text ?? 0}</Typography>
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
            {`${abbreviate(Number(value ?? 0))}`}
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
        const value = useRemoveDollarAndCommahook(text);
        return (
          <Typography name="Body 4/Medium">
            {text === null ? 0.0 : `${abbreviate(value ?? 0.0)}`}
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
      setShowRaiseConcernModal(false);
      form?.resetFields();
    } else {
      setShowRaiseConcernModal(false);
      form?.resetFields();
      router?.push(
        `/fileEditor?id=${getQuoteID}&fileId=${fileData?.id}&quoteExist=false`,
      );
    }
    setShowExportAs(false);
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
      await dispatch(getQuoteFileCount(Number(getQuoteID))).then((d: any) => {
        if (d?.payload) {
          dispatch(setQuoteFileDataCount(d?.payload));
        }
      });
      await dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
      await dispatch(getProfitabilityByQuoteId(Number(getQuoteID))).then(
        (d: any) => {
          if (d?.payload) {
            dispatch(setProfitability(d?.payload));
          }
        },
      );
    } catch (error) {
      console.error('Error updating tables:', error);
    } finally {
      setFileVerificationLoading(false);
      setShowVerificationFileModal(false);
    }
  };

  return (
    <>
      {contextHolder}
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        selectedFilter && reviewQuotesData?.length > 0 ? (
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
                              Line Items: {finalDataItem?.QuoteLineItem?.length}
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
                                      setShowVerificationFileModal(true);
                                      setFileData(finalDataItem);
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
                                        finalDataItem?.QuoteLineItem?.length ===
                                        0
                                      ) {
                                        setShowExportAs(false);
                                      } else {
                                        setShowExportAs(true);
                                      }
                                      if (
                                        !finalDataItem?.title
                                          ?.split('.')
                                          ?.includes('pdf')
                                      ) {
                                        setShowExportToTable(false);
                                      } else {
                                        setShowExportToTable(true);
                                      }
                                      if (
                                        finalDataItem?.QuoteLineItem?.length ===
                                          0 &&
                                        !finalDataItem?.title
                                          ?.split('.')
                                          ?.includes('pdf')
                                      ) {
                                        setShowSubmitButton(true);
                                      } else {
                                        setShowSubmitButton(false);
                                      }
                                      e?.stopPropagation();
                                      setShowRaiseConcernModal(true);
                                      setFileData(finalDataItem);
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
                        />
                      ),
                    },
                  ]}
                />
              );
            })}
          </>
        ) : (
          <EmptyContainer title={`There is no data for ${selectedFilter}`} />
        )
      ) : (
        <EmptyContainer
          title="There is no columns for Review Quotes"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}

      <OsModal
        loading={quoteFileDataLoading}
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
        fourthButtonText={showSubmitButton ? 'Submit' : ''}
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
    </>
  );
};

export default ReviewQuotes;
