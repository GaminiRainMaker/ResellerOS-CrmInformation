import { Space } from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import { formatDate } from '@/app/utils/base';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { GlobalToken } from 'antd';
import { JSX, SetStateAction } from 'react';

function getColumns(
  token: GlobalToken,
  statusWrapper: {(item: any): JSX.Element; (arg0: any): any},
  editQuote: {(quoteId: string): void; (arg0: any): void},
  setDeleteIds: {(value: any): void; (arg0: any[]): void},
  setShowModalDelete: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          File Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {text ?? formatDate(record?.createdAt)}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Opportunity
        </Typography>
      ),
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/opportunityDetail?id=${record?.Opportunity?.id}`);
          }}
          hoverOnText
        >
          {record?.Opportunity?.title ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Customer Name
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
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
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => statusWrapper(record),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <EyeIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              editQuote(record.id);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds([record?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return columns;
}

export default getColumns;
