/* eslint-disable import/no-extraneous-dependencies */

'use client';

import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {FilePdfOutlined} from '@ant-design/icons';
import {
  ArrowDownTrayIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  ReceiptPercentIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import TabPane from 'antd/es/tabs/TabPane';
import {useEffect, useState} from 'react';
import {getQuote, insertQuote} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from './UploadFile';

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined; // Define the inner object structure
  };
}

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>({});

  const {data: quoteData} = useAppSelector((state) => state.quote);
  useEffect(() => {
    dispatch(getQuote());
    // dispatch(getQuoteLineItem());
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const analyticsData = [
    {
      key: 1,
      primary: '217',
      secondry: 'Line Items',
      icon: <DocumentTextIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorPrimaryHover,
    },
    {
      key: 2,
      primary: '$0.00',
      secondry: 'Quote Total',
      icon: <TagIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: '$734,308.14',
      secondry: 'Total Cost',
      icon: <CurrencyDollarIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: '$0.00',
      secondry: 'Total GP',
      icon: <BanknotesIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
    {
      key: 5,
      primary: '0%',
      secondry: 'Total GP%',
      icon: <ReceiptPercentIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 6,
      primary: '$21,966.00',
      secondry: 'Rebate Total',
      icon: <CreditCardIcon width={24} color={token?.colorLinkHover} />,
      iconBg: token?.colorInfoHover,
    },
  ];

  const TabPaneData = [
    {
      key: 1,
      name: 'Input Details',
      // tableData: s
    },
    {
      key: 2,
      name: 'Profitability',
    },
    {
      key: 3,
      name: 'Rebates',
    },
    {
      key: 4,
      name: 'Validation',
    },
    {
      key: 5,
      name: 'Matrix',
    },
  ];

  const selectData = [
    {value: 'item 1', label: 'Item 1'},
    {value: 'item 2', label: 'Item 2'},
    {value: 'item 3', label: 'Item 3'},
    {value: 'item 4', label: 'Item 4'},
  ];

  const Quotecolumns = [
    {
      title: 'Cage Code',
      dataIndex: 'cage_code',
      key: 'cage_code',
    },
    {
      title: 'Credit Cards',
      dataIndex: 'credit_cards',
      key: 'credit_cards',
    },
    {
      title: 'Customer Address',
      dataIndex: 'customer_address',
      key: 'customer_address',
    },
    {
      title: 'Customer City',
      dataIndex: 'customer_city',
      key: 'customer_city',
    },
    {
      title: 'Customer Contact',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
    },
    {
      title: 'Customer Email',
      dataIndex: 'customer_email',
      key: 'customer_email',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Customer Phone',
      dataIndex: 'customer_phone',
      key: 'customer_phone',
    },
    {
      title: 'Customer State',
      dataIndex: 'customer_state',
      key: 'customer_state',
    },
    {
      title: 'Total Price',
      dataIndex: 'customer_street',
      key: 'customer_street',
    },
    {
      title: 'Customer Zip',
      dataIndex: 'customer_zip',
      key: 'customer_zip',
    },

    {
      title: 'Deal Id',
      dataIndex: 'deal_id',
      key: 'deal_id',
    },
    {
      title: 'Distributor Address',
      dataIndex: 'distributor_address',
      key: 'distributor_address',
    },
    {
      title: 'Distributor City',
      dataIndex: 'distributor_city',
      key: 'distributor_city',
    },
    {
      title: 'Distributor Contact',
      dataIndex: 'distributor_contact',
      key: 'distributor_contact',
    },
    {
      title: 'Distributor Email',
      dataIndex: 'distributor_email',
      key: 'distributor_email',
    },
    {
      title: 'Distributor Fax',
      dataIndex: 'distributor_fax',
      key: 'distributor_fax',
    },

    {
      title: 'Distributor Name',
      dataIndex: 'distributor_name',
      key: 'distributor_name',
    },
    {
      title: 'Distributor Phone',
      dataIndex: 'distributor_phone',
      key: 'distributor_phone',
    },
    {
      title: 'Distributor State',
      dataIndex: 'distributor_state',
      key: 'distributor_state',
    },
    {
      title: 'Distributor Street',
      dataIndex: 'distributor_street',
      key: 'distributor_street',
    },
    {
      title: 'Distributor Zip',
      dataIndex: 'distributor_zip',
      key: 'distributor_zip',
    },

    {
      title: 'Duns Number',
      dataIndex: 'duns_number',
      key: 'duns_number',
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Fob Shipping',
      dataIndex: 'fob_shipping',
      key: 'fob_shipping',
    },
    {
      title: 'Ftin',
      dataIndex: 'ftin',
      key: 'ftin',
    },

    {
      title: 'Oem Name',
      dataIndex: 'oem_name',
      key: 'oem_name',
    },
    {
      title: 'Payment Terms',
      dataIndex: 'payment_terms',
      key: 'payment_terms',
    },
    {
      title: 'Quote Amount',
      dataIndex: 'quote_amount',
      key: 'quote_amount',
    },
    {
      title: 'Quote Date',
      dataIndex: 'quote_date',
      key: 'quote_date',
    },
    {
      title: 'Quote Number',
      dataIndex: 'quote_number',
      key: 'quote_number',
    },
    {
      title: 'Remit To',
      dataIndex: 'remit_to',
      key: 'remit_to',
    },
    {
      title: 'Reseller Address',
      dataIndex: 'reseller_address',
      key: 'reseller_address',
    },
    {
      title: 'Reseller City',
      dataIndex: 'reseller_city',
      key: 'reseller_city',
    },
    {
      title: 'Reseller Contact',
      dataIndex: 'reseller_contact',
      key: 'reseller_contact',
    },
    {
      title: 'Reseller Email',
      dataIndex: 'reseller_email',
      key: 'reseller_email',
    },
    {
      title: 'Reseller Name',
      dataIndex: 'reseller_name',
      key: 'reseller_name',
    },
    {
      title: 'Reseller Phone',
      dataIndex: 'reseller_phone',
      key: 'reseller_phone',
    },
    {
      title: 'Reseller State',
      dataIndex: 'reseller_state',
      key: 'reseller_state',
    },
    {
      title: 'Reseller Street',
      dataIndex: 'reseller_street',
      key: 'reseller_street',
    },
    {
      title: 'Reseller Zip',
      dataIndex: 'reseller_zip',
      key: 'reseller_zip',
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      key: 'shipping',
    },
    {
      title: 'Shipping Amount',
      dataIndex: 'shipping_amount',
      key: 'shipping_amount',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: 'UEI',
      dataIndex: 'uei',
      key: 'uei',
    },
  ];

  const addQuote = () => {
    const arrayOfTableObjects =
      uploadFileData?.data?.result?.[0]?.prediction?.filter(
        (item: any) => item.label === 'table',
      );
    const formattedData: FormattedData = {};
    arrayOfTableObjects?.[0]?.cells.forEach((item: any) => {
      const rowNum = item.row;
      if (!formattedData[rowNum]) {
        formattedData[rowNum] = {};
      }
      formattedData[rowNum][item.label?.toLowerCase()] = item.text;
    });
    const formattedArray = Object.values(formattedData);
    const labelOcrMap: any = {};
    uploadFileData?.data?.result?.[0]?.prediction?.forEach((item: any) => {
      labelOcrMap[item?.label?.toLowerCase()] = item?.ocr_text;
    });
    if (labelOcrMap) {
      dispatch(insertQuote(labelOcrMap)).then((d) => {
        if (d?.payload?.data?.id) {
          // const lineitemData = formattedArray?.map((item: any) => ({
          //   ...item,
          //   qoute_id: d?.payload?.data?.id,
          // }));
          // dispatch(insertQuoteLineItem(lineitemData));
        }
      });
    }
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row
          justify="space-between"
          style={{
            padding: '36px 24px',
            background: token?.colorBgContainer,
            borderRadius: '12px',
          }}
          gutter={[0, 16]}
        >
          {analyticsData?.map((item) => (
            <Col>
              <TableNameColumn
                primaryText={item?.primary}
                secondaryText={item?.secondry}
                fallbackIcon={item?.icon}
                iconBg={item?.iconBg}
              />
            </Col>
          ))}
        </Row>

        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Generated Quote
            </Typography>
          </Col>
          <Col>
            <div
              style={{
                display: 'flex',
                // justifyContent: 'space-evenly',
                width: '40%',
                gap: '8px',
              }}
            >
              <OsButton text="Save as Draft" buttontype="SECONDARY" />
              <OsButton
                text="Add Quote"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <OsButton text=" Mark as Complete" buttontype="PRIMARY" />

              <OsButton
                buttontype="PRIMARY_ICON"
                icon={<ArrowDownTrayIcon width={24} />}
              />
            </div>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            tabBarExtraContent={
              <Space direction="vertical" size={0}>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  Select Grouping
                </Typography>
                <Space size={12}>
                  <CommonSelect
                    style={{width: '319px'}}
                    placeholder="Select Grouping here"
                    options={selectData}
                  />
                  <OsButton
                    buttontype="PRIMARY_ICON"
                    icon={<EllipsisVerticalIcon width={24} />}
                  />
                </Space>
              </Space>
            }
          >
            {TabPaneData?.map((item) => (
              <TabPane
                tab={
                  <Typography
                    name="Body 4/Regular"
                    color={
                      activeTab === item?.key ? token?.colorPrimary : '#666666'
                    }
                  >
                    {item?.name}
                    <div
                      style={{
                        // eslint-disable-next-line eqeqeq
                        borderBottom:
                          // eslint-disable-next-line eqeqeq
                          activeTab == item?.key ? '2px solid #1C3557' : '',
                        marginTop: '3px',
                      }}
                    />
                  </Typography>
                }
                key={item?.key}
              >
                <OsTable
                  rowSelection={rowSelection}
                  columns={Quotecolumns}
                  dataSource={quoteData}
                  scroll
                />
              </TabPane>
            ))}
          </OsTabs>
        </Row>
      </Space>
      <OsModal
        body={<UploadFile setUploadFileData={setUploadFileData} />}
        width={608}
        primaryButtonText="Generate"
        secondaryButtonText="Save & Generate Individual Quotes"
        open={showModal}
        onOk={() => addQuote()}
        onCancel={() => setShowModal((p) => !p)}
      />
    </>
  );
};

export default GenerateQuote;
