import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {GlobalToken} from 'antd';
import {JSX, SetStateAction} from 'react';

function templateColumns(
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
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/opportunityDetail?id=${record?.Partner?.id}`);
          }}
          hoverOnText
        >
          {text ?? record?.Partner?.partner_program}
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
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 187,
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
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => statusWrapper(text),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Active
        </Typography>
      ),
      dataIndex: 'is_active',
      key: 'is_active',
      width: 187,
      render: (text: string, record: any) => <Switch />,
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
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
function standardAttributes(
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
          Attribute Label
        </Typography>
      ),
      dataIndex: 'label',
      key: 'label',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 187,
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
          Attribute Data Type
        </Typography>
      ),
      dataIndex: 'data_type',
      key: 'data_type',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Order
        </Typography>
      ),
      dataIndex: 'order',
      key: 'order',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Standard Attribute Section
        </Typography>
      ),
      dataIndex: 'standard_attribute_section',
      key: 'standard_attribute_section',
      width: 230,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{record?.AttributeSection?.name ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Active
        </Typography>
      ),
      dataIndex: 'is_active',
      key: 'is_active',
      width: 187,
      render: (text: boolean) => <Checkbox checked={text} />,
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Required
        </Typography>
      ),
      dataIndex: 'is_required',
      key: 'is_required',
      width: 187,
      render: (text: boolean) => <Checkbox checked={text} />,
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          View Only
        </Typography>
      ),
      dataIndex: 'is_view',
      key: 'is_view',
      width: 187,
      render: (text: boolean) => <Checkbox checked={text} />,
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
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

export {standardAttributes, templateColumns};
