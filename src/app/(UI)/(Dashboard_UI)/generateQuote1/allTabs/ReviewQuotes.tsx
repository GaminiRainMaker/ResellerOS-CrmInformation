'use client';

import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapse from '@/app/components/common/os-collapse';
import OSDialog from '@/app/components/common/os-dialog';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import RaiseConcern from '@/app/components/common/os-raise-concern';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {updateTables, useRemoveDollarAndCommahook} from '@/app/utils/base';
import {Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import GreenCheckIcon from '../../../../../../public/assets/static/greenCheckIcon.svg';
import RaiseConcernImg from '../../../../../../public/assets/static/raiseConcern.svg';
import {UpdateQuoteFileById} from '../../../../../../redux/actions/quoteFile';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setConcernQuoteLineItemData} from '../../../../../../redux/slices/quotelineitem';

const ReviewQuotes: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  setIsDeleteInputDetailModal,
  isDeleteInputDetailModal,
  setFinalInputColumn,
  finalInputColumn,
  familyFilter,
  setFamilyFilter,
  setSelectedRowIds,
  selectTedRowIds,
  setQuoteLineItemExist,
  setActiveTab,
  activeTab,
  setCountOFFiles,
  countOfFiles,
}) => {
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
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(true);
  const [indexOfVerifyFile, setIndexOfVerifyFile] = useState<any>();
  const [reviewQuotesData, setReviewQuotesData] = useState<any>();
  const [finalReviewCol, setFinalReviewCol] = useState<any>();

  const filterDataByValue = (data: any, filterValue?: string) => {
    const groupedData: any = {};
    data?.forEach((item: any) => {
      let name;
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
            .replace(/\b\w/g, (char) => char?.toUpperCase());
        };

        if (name?.includes('_') || name === name?.toLowerCase()) {
          name = convertToTitleCase(name);
        }

        if (!groupedData[name]) {
          groupedData[name] = {name: name, QuoteLineItem: []};
        }
        groupedData[name].QuoteLineItem = groupedData[
          name
        ].QuoteLineItem.concat(item?.QuoteLineItems || []);
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
    } else if (buttonType === 'fourth') {
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
    let newArrr = [...quoteLineItemByQuoteData1];
    newArrr?.splice(indexOfVerifyFile, 1);
    setQuoteLineItemByQuoteData1(newArrr);
    let newCount = countOfFiles - 1;
    setCountOFFiles(newCount);
    setConfirmedData(true);
    const countOfLineItem = 0;

    const isState = await updateTables(
      getQuoteID,
      fileData,
      fileData?.quoteLineItems,
      userInformation,
      dispatch,
      countOfLineItem,
    );

    if (isState) {
      setConfirmedData(false);
      // dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
    }

    setTimeout(() => {
      setActiveTab('2');
    }, 1000);
    setShowVerificationFileModal(false);
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
                        <Space
                          style={{
                            display: 'flex',
                            justifyContent: 'start',
                          }}
                        >
                          <p>{finalDataItem?.name}</p>
                        </Space>
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

export default ReviewQuotes;
