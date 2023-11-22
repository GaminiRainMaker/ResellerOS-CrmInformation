'use client';

import Typography from '@/app/components/common/typography';
import React, {useEffect} from 'react';
import {Table} from '@/app/components/common/antd/Table';
import {useAppDispatch, useAppSelector} from '../../../../redux/hook';
import {getQuote} from '../../../../redux/actions/quote';

const Home = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state) => state.quote);

  useEffect(() => {
    dispatch(getQuote());
  }, []);

  const columns = [
    {
      title: 'Quote No',
      dataIndex: 'quote_no',
      key: 'quote_no',
    },
    {
      title: 'Quote Date',
      dataIndex: 'quote_date',
      key: 'quote_date',
    },
    {
      title: 'Shipping Amount',
      dataIndex: 'shipping_amount',
      key: 'shipping_amount',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
    },
  ];
  return (
    <div>
      <Typography name="Heading 1/Medium">Quote Data</Typography>
      <Table dataSource={data?.data} columns={columns} />;
    </div>
  );
};

export default Home;
