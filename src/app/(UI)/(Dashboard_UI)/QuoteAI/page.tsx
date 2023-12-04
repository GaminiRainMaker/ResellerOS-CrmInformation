'use client';

import OsTable from '@/app/components/common/os-table';
import type {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const QuoteAI: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <OsTable rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default QuoteAI;
