'use client';

import {Table} from '@/app/components/common/antd/Table';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {useEffect} from 'react';
import {getQuote} from '../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../redux/hook';
import {getQuoteLineItem} from '../../../../redux/actions/quotelineitem';

const Home = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state) => state.quote);
  const {data: quoteLineItemData} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [token] = useThemeToken();

  useEffect(() => {
    dispatch(getQuote());
    dispatch(getQuoteLineItem());
  }, []);

  const columns = [
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

  const quoteLineItemColumn = [
    {
      title: 'Quote Id',
      dataIndex: 'qoute_id',
      key: 'qoute_id',
    },
    {
      title: 'Line Number ',
      dataIndex: 'line_number',
      key: 'line_number',
    },
    {
      title: 'Product Code',
      dataIndex: 'product_code',
      key: 'product_code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'List Price',
      dataIndex: 'list_price',
      key: 'list_price',
    },
    {
      title: 'Adjusted Price',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Line Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <Typography name="Heading 1/Extra Bold" color={token?.colorPrimary}>
        Quote Data
      </Typography>
      <Table
        dataSource={data}
        columns={columns}
        style={{overflow: 'auto', margin: '2rem'}}
        pagination={false}
      />
      <br />
      <br />
      <br />
      <br />
      <Typography name="Heading 1/Extra Bold" color={token?.colorPrimary}>
        Quote Line Item
      </Typography>
      <Table
        dataSource={quoteLineItemData}
        columns={quoteLineItemColumn}
        style={{overflow: 'auto', margin: '2rem'}}
        pagination={false}
      />
    </div>
  );
};

export default Home;
