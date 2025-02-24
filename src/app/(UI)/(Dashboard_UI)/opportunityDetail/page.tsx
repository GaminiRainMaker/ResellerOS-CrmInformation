/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-nested-ternary */

'use client';

import AddQuote from '@/app/components/common/addQuote';
import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddOpportunity from '@/app/components/common/os-add-opportunity';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import EmptyContainer from '@/app/components/common/os-empty-container';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OpportunityAnalyticCard from '@/app/components/common/os-opportunity-analytic-card';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {
  convertToNumber,
  currencyFormatter,
  formatDate,
  getResultedValue,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import { Checkbox, Form } from 'antd';
import { TabsProps } from 'antd/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, Suspense, useEffect, useState } from 'react';
// eslint-disable-next-line import/order
import {
  deleteOpportunity,
  getOpportunityById,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import OsModal from '@/app/components/common/os-modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import CommonSelect from '@/app/components/common/os-select';
import {
  countrupickList,
  EnergyStarFlagpicklist,
  EPEATFlagPickList,
  pricingMethod,
  selectDataForProduct,
  TAAFlagPickList,
} from '@/app/utils/CONSTANTS';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import OsInput from '@/app/components/common/os-input';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import { getProfitabilityByQuoteId } from '../../../../../redux/actions/profitability';
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import { tabItems } from '../allQuote/constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { updateQuoteCustomerId } from '../../../../../redux/actions/quote';

const OpportunityDetails: FC<any> = ({
  scrollx = 1000,
  scrolly = 1000,
}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('id');
  const { loading, opportunityById: opportunityData } = useAppSelector(
    (state) => state.Opportunity,
  );
  const { abbreviate } = useAbbreviationHook(0);

  const [oppSyncValue, setOppSyncValue] = useState<any>();
  const [oppSyncValueHave, setOppSyncValueHave] = useState<any>();
  const [oppSyncValueLoading, setOppSyncValueLoading] = useState<boolean>(true);

  const { userInformation } = useAppSelector((state) => state.user);
  const [formValue, setFormValue] = useState<any>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [customerValue, setCustomerValue] = useState<number>();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [finalDealRegData, setFinalDealRegData] = useState<React.Key[]>([]);
  const [statusValue, setStatusValue] = useState<string>('All');
  const isView = getResultedValue();
  const [profitibiltyDataForSynced, setProfitibiltyDataForSynced] =
    useState<any>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const isDealReg = userInformation?.DealReg ?? false;

  const { loading: QuoteLoading } = useAppSelector((state) => state.quote);
  useEffect(() => {
    dispatch(getOpportunityById(opportunityId));
  }, []);

  const OpportunityObjectData = {
    id: opportunityData?.id,
    title: opportunityData?.title,
    amount: opportunityData?.amount,
    customer: opportunityData?.Customer?.name,
    quotes: opportunityData?.Quotes,
    stages: opportunityData?.stages,
    opportunity: opportunityData,
    synced_quote: opportunityData?.synced_quote,
  };

  useEffect(() => {
    if (showDrawer) {
      form.setFieldsValue({
        stages: opportunityData?.stages,
        customer_id: opportunityData?.customer_id,
        title: opportunityData?.title,
        amount: opportunityData?.amount,
      });
    }
  }, [showDrawer]);

  const ProfitabilityQuoteLineItemcolumns = [
    {
      title: 'Line Number',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string) => (
        <OsInput disabled style={{ height: '36px' }} defaultValue={text} />
      ),
      width: 111,
    },
    {
      title: 'Product Code',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 120,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: any, b: any) => a.quantity - b.quantity,
      render: (text: string) => (
        <OsInputNumber
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          defaultValue={text ?? 0.0}
          disabled
          style={{ height: '36px', textAlignLast: 'right' }}
          min={1}
        />
      ),
      width: 120,
    },
    {
      title: 'MSRP ($)',
      dataIndex: 'list_price',
      key: 'list_price',
      sorter: (a: any, b: any) => a.list_price - b.list_price,
      render: (text: string) => (
        <OsInputNumber
          min={0}
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          disabled
          style={{ height: '36px', textAlignLast: 'right', width: '100%' }}
          defaultValue={text ?? 0.0}
        />
      ),
      width: 150,
    },
    {
      title: 'Cost ($)',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      sorter: (a: any, b: any) => a.adjusted_price - b.adjusted_price,
      render: (text: string) => (
        <OsInputNumber
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          min={0}
          style={{ height: '36px', textAlignLast: 'right', width: '100%' }}
          disabled
          defaultValue={text ?? 0.0}
        />
      ),
      width: 150,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 290,
      render: (text: number) => (
        <Typography name="Body 4/Medium" style={{ color: '#0D0D0D' }}>
          {text}
        </Typography>
      ),
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render: (text: any, record: any) => (
        <CommonSelect
          disabled
          style={{ width: '200px', height: '36px' }}
          placeholder="Select"
          defaultValue={text ?? record?.Product?.product_family}
          options={selectDataForProduct}
        />
      ),
    },
    {
      title: 'Pricing Method',
      dataIndex: 'pricing_method',
      key: 'pricing_method',
      width: 200,
      render: (text: string) => (
        <CommonSelect
          disabled
          style={{ width: '100%', height: '36px' }}
          placeholder="Select"
          defaultValue={text}
          options={pricingMethod}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      sorter: (a: any, b: any) => a.line_amount - b.line_amount,
      width: 150,
      render: (text: string) => (
        <OsInputNumber
          min={0}
          disabled
          style={{ height: '36px', textAlignLast: 'center', width: '100%' }}
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          defaultValue={text ?? 0.0}
        />
      ),
    },
    {
      title: 'Unit Price ($)',
      dataIndex: 'unit_price',
      key: 'unit_price',
      sorter: (a: any, b: any) => a.unit_price - b.unit_price,
      width: 150,
      render: (text: number) => (
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {abbreviate(text ?? 0)}
        </Typography>
      ),
    },
    {
      title: 'Extended Price ($)',
      dataIndex: 'exit_price',
      key: 'exit_price',
      sorter: (a: any, b: any) => a.exit_price - b.exit_price,
      width: 190,
      render: (text: number) => (
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          ${abbreviate(text) ?? 0}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit ($)',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      sorter: (a: any, b: any) => a.gross_profit - b.gross_profit,
      width: 150,
      render: (text: number) => (
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {abbreviate(text) ?? 0}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit %',
      dataIndex: 'gross_profit_percentage',
      key: 'gross_profit_percentage',
      sorter: (a: any, b: any) =>
        a.gross_profit_percentage - b.gross_profit_percentage,
      width: 150,
      render: (text: number) => (
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {abbreviate(text ?? 0)}
        </Typography>
      ),
    },
    {
      title: 'Bundle Cost',
      dataIndex: 'bundle_cost',
      key: 'bundle_cost',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Extended Price',
      dataIndex: 'bundle_ext_price',
      key: 'bundle_ext_price',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Gross Profit',
      dataIndex: 'bundle_gp',
      key: 'bundle_gp',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Gross Profit (%)',
      dataIndex: 'bundle_gp_percentage',
      key: 'bundle_gp_percentage',
      render: (text: any) => {
        const value = text || 0; // Default to 0 if no value
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Taa Flag',
      dataIndex: 'taa_flag',
      key: 'taa_flag',
      width: 250,
      render: (text: any, record: any) => (
        <CommonSelect
          disabled
          style={{ width: '200px', height: '36px' }}
          placeholder="Select"
          defaultValue={text ?? record?.taa_flag}
          options={TAAFlagPickList}
        />
      ),
    },
    {
      title: 'Epeat Flag',
      dataIndex: 'epeat_flag',
      key: 'epeat_flag',
      width: 250,
      render: (text: any, record: any) => (
        <CommonSelect
          disabled
          style={{ width: '200px', height: '36px' }}
          placeholder="Select"
          defaultValue={text ?? record?.epeat_flag}
          options={EPEATFlagPickList}
        />
      ),
    },
    {
      title: 'Country Of Origin',
      dataIndex: 'country_of_origin',
      key: 'country_of_origin',
      width: 250,
      render: (text: any, record: any) => (
        <CommonSelect
          disabled
          style={{ width: '200px', height: '36px' }}
          placeholder="Select"
          defaultValue={text ?? record?.country_of_origin}
          options={countrupickList}
        />
      ),
    },
    {
      title: 'Energy Star Flag',
      dataIndex: 'energy_star_flag',
      key: 'energy_star_flag',
      width: 250,
      render: (text: any, record: any) => (
        <CommonSelect
          disabled
          style={{ width: '200px', height: '36px' }}
          placeholder="Select"
          defaultValue={text ?? record?.energy_star_flag}
          options={EnergyStarFlagpicklist}
        />
      ),
    },
    {
      title: 'Bundle MSRP',
      dataIndex: 'bundle_msrp',
      key: 'bundle_msrp',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Name',
      dataIndex: 'bundle_name',
      key: 'bundle_name',
      width: 150,
    },
    {
      title: 'Bundle Rebate',
      dataIndex: 'bundle_rebate',
      key: 'bundle_rebate',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Rebate Amount',
      dataIndex: 'bundle_rebate_amount',
      key: 'bundle_rebate_amount',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Unit Price',
      dataIndex: 'bundle_unit_price',
      key: 'bundle_unit_price',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Gross Profit Amount',
      dataIndex: 'bundle_gross_profit_amount',
      key: 'bundle_gross_profit_amount',
      render: (text: any) => {
        const value = text ? useRemoveDollarAndCommahook(text) : 0;
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
    {
      title: 'Bundle Gross Profit Percentage',
      dataIndex: 'bundle_gross_profit_percentage',
      key: 'bundle_gross_profit_percentage',
      render: (text: any) => {
        const value = text || 0; // Default to 0 if no value
        return (
          <Typography name="Body 4/Medium">{convertToNumber(value)}</Typography>
        );
      },
      width: 150,
    },
  ];

  useEffect(() => {
    setOppSyncValueLoading(true);

    if (
      activeTab &&
      opportunityData?.Quotes &&
      opportunityData?.Quotes.length > 0
    ) {
      const quoteItems =
        activeTab === '3'
          ? opportunityData?.Quotes?.filter((item: any) =>
            userInformation?.Admin
              ? item?.status?.includes('In Progress')
              : userInformation?.id === item?.user_id &&
              item?.status?.includes('In Progress'),
          )
          : activeTab === '5'
            ? opportunityData?.Quotes?.filter((item: any) =>
              userInformation?.Admin
                ? item?.status?.includes('Needs Review') &&
                item?.user_id !== userInformation?.id
                : item?.status?.includes('Needs Review') &&
                item?.approver_id === userInformation?.id,
            )
            : activeTab === '4'
              ? opportunityData?.Quotes?.filter((item: any) =>
                userInformation?.Admin
                  ? item?.status?.includes('Needs Review')
                  : item?.status?.includes('Needs Review') &&
                  item?.completed_by === userInformation?.id,
              )
              : activeTab === '1'
                ? userInformation?.Admin
                  ? opportunityData?.Quotes
                  : opportunityData?.Quotes?.filter(
                    (item: any) => item?.user_id === userInformation?.id,
                  )
                : activeTab === '6'
                  ? opportunityData?.Quotes?.filter((item: any) =>
                    userInformation?.Admin
                      ? item?.status?.includes('Approved')
                      : item?.status?.includes('Approved') &&
                      item?.user_id === userInformation?.id,
                  )
                  : activeTab === '7'
                    ? opportunityData?.Quotes?.filter((item: any) =>
                      userInformation?.Admin
                        ? item?.status?.includes('Rejected')
                        : item?.status?.includes('Rejected') &&
                        item?.user_id === userInformation?.id,
                    )
                    : activeTab === '2'
                      ? opportunityData?.Quotes?.filter((item: any) =>
                        userInformation?.Admin
                          ? item?.status?.includes('Drafts')
                          : userInformation?.id === item?.user_id &&
                          item?.status?.includes('Drafts'),
                      )
                      : [];
      setActiveQuotes(quoteItems);
      setOppSyncValue(opportunityData?.synced_quote);
      dispatch(
        getProfitabilityByQuoteId(Number(opportunityData?.synced_quote)),
      )?.then((payload: any) => {
        setProfitibiltyDataForSynced(payload?.payload);
      });
      setOppSyncValueHave(opportunityData?.id);
      setTimeout(() => {
        setOppSyncValueLoading(false);
      }, 2000);
    } else {
      setActiveQuotes([]);
      setTimeout(() => {
        setOppSyncValueLoading(false);
      }, 2000);
    }
  }, [activeTab, opportunityData?.Quotes]);

  const processDealRegData = (dealRegData: any[], status: string) => {
    const finalData = userInformation?.Admin
      ? dealRegData
      : dealRegData?.filter(
        (dealRegDataItem: any) =>
          dealRegDataItem?.user_id === userInformation?.id,
      );

    const filteredDealRegData =
      status === 'All'
        ? finalData
        : finalData?.filter((item: any) => item?.status === status);

    return filteredDealRegData;
  };

  useEffect(() => {
    const separatedData = processDealRegData(
      opportunityData?.DealRegs,
      statusValue,
    );
    setFinalDealRegData(separatedData);
  }, [opportunityData?.DealRegs, statusValue]);
  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/crmOpportunity');
          }}
        >
          Opportunities
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => { }}
        >
          {OpportunityObjectData?.title}
        </Typography>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        buttonContainer={
          <>
            {activeTab === 1 && (
              <AddQuote
                uploadFileData={uploadFileData}
                setUploadFileData={setUploadFileData}
                loading={QuoteLoading}
                buttonText="Add Quote"
              />
            )}
          </>
        }
      />
    ),
  };

  const dealRegLocal = {
    emptyText: <EmptyContainer title="No Files" />,
  };
  const oppLinesLOcal = {
    emptyText: <EmptyContainer title="No Opportunity Lines" />,
  };

  const deleteSelectedIds = async () => {
    const data = { Ids: deleteIds };
    await dispatch(deleteOpportunity(data));
    router.push('/crmOpportunity');
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const Quotecolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            router.push(
              `/generateQuote?id=${record.id}&isView=${getResultedValue()}`,
            );
          }}
          hoverOnText
          color={token?.colorInfo}
        >
          {record?.file_name ??
            formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Name
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Synced
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string, record: any) => (
        <Checkbox disabled checked={record?.id === oppSyncValue} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <OsStatusWrapper value={text} />
        </span>
      ),
    },
  ];

  const updateOpportunityData = async () => {
    const FormDAta = form.getFieldsValue();
    const finalData = {
      ...FormDAta,
      id: opportunityId,
    };
    const result = {
      customer_id: finalData?.customer_id,
      id: opportunityData?.Quotes?.map((item: any) => item.id),
    };
    if (result?.id?.length > 0) await dispatch(updateQuoteCustomerId(result));
    await dispatch(updateOpportunity(finalData))?.then((d: any) => {
      if (d?.payload) {
        dispatch(getOpportunityById(opportunityId));
        setShowDrawer(false);
        form.resetFields();
      }
    });
  };

  const dealRegFormColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          style={{ cursor: 'pointer' }}
          hoverOnText
          color={token?.colorInfo}
          onClick={() => {
            router.push(
              `/dealRegDetail?id=${record.id}&opportunityId=${record.opportunity_id}&customerId=${record.customer_id}&contactId=${record.contact_id}`,
            );
          }}
        >
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      width: 187,
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Account
        </Typography>
      ),
      dataIndex: 'account',
      key: 'account',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/accountDetails?id=${record?.Customer?.id}`);
          }}
          hoverOnText
        >
          {record?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner
        </Typography>
      ),
      dataIndex: 'partner_id',
      key: 'partner_id',
      width: 187,
      render: (text: string, record: any) => (
        <CustomTextCapitalization text={record?.Partner?.partner} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program_id',
      key: 'partner_program_id',
      width: 187,
      render: (text: string, record: any) => (
        <CustomTextCapitalization
          text={record?.PartnerProgram?.partner_program}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Created By
        </Typography>
      ),
      dataIndex: 'created_by',
      key: 'created_by',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.User?.first_name && record?.User?.last_name
            ? `${record.User?.first_name} ${record.User?.last_name}`
            : record?.User?.first_name
              ? record.User?.first_name
              : record?.User?.user_name}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <OsStatusWrapper value={text} />
        </div>
      ),
    },
  ];

  const dealRegTabItems: TabsProps['items'] = [
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setStatusValue('All')}>
          All
        </Typography>
      ),
      key: '1',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
        // <OsTable
        //   columns={dealRegFormColumns}
        //   dataSource={finalDealRegData}
        //   scroll
        //   loading={false}
        //   paginationProps={false}
        //   locale={dealRegLocal}
        // />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setStatusValue('New')}>
          New
        </Typography>
      ),
      key: '9',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
        // <OsTable
        //   columns={dealRegFormColumns}
        //   dataSource={finalDealRegData}
        //   scroll
        //   loading={false}
        //   paginationProps={false}
        //   locale={dealRegLocal}
        // />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('In Progress')}
        >
          In Progress
        </Typography>
      ),
      key: '2',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Submitted')}
        >
          Submitted
        </Typography>
      ),
      key: '3',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Approved')}
        >
          Approved
        </Typography>
      ),
      key: '4',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Rejected')}
        >
          Rejected
        </Typography>
      ),
      key: '5',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Expired')}
        >
          Expired
        </Typography>
      ),
      key: '6',
      children: (
        <div>
          <OsTable
            loading={false}
            columns={dealRegFormColumns && dealRegFormColumns.length > 0
              ? dealRegFormColumns.map((items: any) => ({
                ...items,
                title: (
                  <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                    {items?.title}
                  </Typography>
                ),
                width: 230,  // Set fixed width for the columns
              }))
              : []}
            dataSource={finalDealRegData}
            locale={dealRegLocal}
            scroll={{
              x: 'max-content', // Enable horizontal scroll
              y: 1000  // Optional vertical scroll
            }}
            style={{ tableLayout: 'auto' }}  // Let the table manage column width
          />
        </div>
      ),
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <OsBreadCrumb items={menuItems} />

        <OpportunityAnalyticCard
          setFormValue={setFormValue}
          setOpen={setShowDrawer}
          OpportunityData={OpportunityObjectData}
          setDeleteIds={setDeleteIds}
          setShowModalDelete={setShowModalDelete}
        />
        <Row justify="space-between" align="middle" style={{ marginTop: '10px' }}>
          <Col>
            <Typography name="Heading 3/Medium">All Quotes</Typography>
          </Col>
          <Col style={{ float: 'right' }}>
            <AddQuote
              uploadFileData={uploadFileData}
              setUploadFileData={setUploadFileData}
              loading={QuoteLoading}
              buttonText="Add Quote"
              setShowToggleTable={setShowToggleTable}
              showToggleTable={showToggleTable}
              Quotecolumns={Quotecolumns}
              opportunityId={opportunityData?.id}
              customerId={opportunityData?.customer_id}
            />
          </Col>
        </Row>
        <Row
          style={{
            background: 'white',
            padding: '8px 12px',
            borderRadius: '12px',
          }}
        >
          <OsTabs
            style={{ margin: '0px' }}
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            items={
              tabItems &&
              tabItems?.map((tabItem: any, index: number) => ({
                key: `${index + 1}`,
                label: (
                  <Typography
                    name="Body 4/Medium"
                    cursor="pointer"
                    color={token?.colorTextBase}
                  >
                    {tabItem.label}
                  </Typography>
                ),
                children: (
                  <>
                    {!oppSyncValueLoading && (
                      <div style={{ overflowX: 'auto' }}>
                        <OsTable
                          key={tabItem?.key}
                          loading={oppSyncValueLoading}
                          columns={Quotecolumns && Quotecolumns.length > 0
                            ? Quotecolumns.map((items: any) => ({
                              ...items,
                              title: (
                                <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                                  {items?.title}
                                </Typography>
                              ),
                              width: 230,  // Set fixed width for the columns
                            }))
                            : []}
                          dataSource={activeQuotes}
                          locale={locale}
                          scroll={{
                            x: 'max-content', // Enable horizontal scroll
                            y: 1000  // Optional vertical scroll
                          }}
                          style={{ tableLayout: 'auto' }}  // Let the table manage column width
                        />
                      </div>
                      // <OsTable
                      //   key={tabItem?.key}
                      //   columns={Quotecolumns}
                      //   dataSource={activeQuotes}
                      //   loading={oppSyncValueLoading}
                      //   locale={locale}
                      // />
                    )}
                  </>
                ),
                ...tabItem,
              }))
            }
          />
        </Row>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginTop: '10px', display: 'flex' }}
        >
          <Col style={{ marginBottom: '30px' }}>
            <Typography name="Heading 3/Medium">Opportunity Lines</Typography>
          </Col>
          <div style={{ overflowX: 'auto' }}>
            <OsTable
              loading={false}
              columns={ProfitabilityQuoteLineItemcolumns && ProfitabilityQuoteLineItemcolumns.length > 0
                ? ProfitabilityQuoteLineItemcolumns.map((items: any) => ({
                  ...items,
                  title: (
                    <Typography name="Body 4/Medium" className="dragHandler" color={token?.colorPrimaryText}>
                      {items?.title}
                    </Typography>
                  ),
                  width: 230,  // Set fixed width for the columns
                }))
                : []}
              dataSource={profitibiltyDataForSynced}
              locale={oppLinesLOcal}
              scroll={{
                x: 'max-content', // Enable horizontal scroll
                y: 1000  // Optional vertical scroll
              }}
              style={{ tableLayout: 'auto' }}  // Let the table manage column width
            />
          </div>



        </Row>
        {isDealReg && (
          <>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginTop: '10px' }}
            >
              <Col>
                <Typography name="Heading 3/Medium">All DealReg</Typography>
              </Col>
              {/* {!isDealReg && ( */}
              <Col style={{ float: 'right' }}>
                <OsButton
                  text="New Registration"
                  buttontype="PRIMARY"
                  icon={<PlusIcon />}
                  clickHandler={() => setShowModal((p) => !p)}
                />
              </Col>
            </Row>
            <Row
              style={{
                background: 'white',
                padding: '8px 12px',
                borderRadius: '12px',
              }}
            >
              <OsTabs style={{ margin: '0px' }} items={dealRegTabItems} />
            </Row>
          </>
        )}
      </Space>

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Opportunity Details</Typography>
        }
        placement="right"
        onClose={() => {
          setShowDrawer(false);
          form.resetFields();
        }}
        open={showDrawer}
        width={450}
        footer={
          <OsButton
            loading={loading}
            btnStyle={{ width: '100%' }}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={form.submit}
          />
        }
      >
        <AddOpportunity
          form={form}
          onFinish={updateOpportunityData}
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
          drawer
          stageValue={opportunityData?.stages}
        />
      </OsDrawer>
      <OsModal
        bodyPadding={22}
        body={<NewRegistrationForm setShowModal={setShowModal} />}
        width={583}
        open={showModal}
        onOk={() => { }}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer={false}
      />

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this opportunity?"
        heading="Delete Opportunity"
      />
    </Suspense>
  );
};

export default OpportunityDetails;
