import {Space} from '@/app/components/common/antd/Space';
import OsStatusWrapper from '@/app/components/common/os-status';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {formatDate, formatDateWithTime} from '@/app/utils/base';
import {
  CheckIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {GlobalToken} from 'antd';
import {JSX, SetStateAction} from 'react';

function getColumns(
  token: GlobalToken,
  editQuote: {(quoteId: string): void; (arg0: any): void},
  setDeleteIds: {(value: any): void; (arg0: any[]): void},
  setShowModalDelete: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  activeTab: any,
  updateStatus: any,
) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Quote Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography
          style={{color: token?.colorInfo}}
          hoverOnText
          name="Body 4/Regular"
          onClick={() => {
            editQuote(record.id);
          }}
        >
          {record?.file_name ??
            formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
      render: (text: string) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={activeTab === '5' ? 'In Review' : text} />
        </div>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Action
        </Typography>
      ),
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          {activeTab === '5' ? (
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
                      updateStatus(record?.id, 'Approved');
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
                      updateStatus(record?.id, 'Rejected');
                    }}
                  />
                }
              />
            </Space>
          ) : (
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
          )}
        </Space>
      ),
    },
  ];

  return columns;
}

function getSuperAdminQuoteColumns(
  token: GlobalToken,
  actionEye: {(value: string): void; (arg0: any): void},
) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Reseller Organization
        </Typography>
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 220,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Quote?.organization}
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
          Quote
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 230,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {text ?? formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
      width: 180,
      dataIndex: 'opportunity',
      key: 'opportunity',
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(
              `/opportunityDetail?id=${record?.Quote?.Opportunity?.id}`,
            );
          }}
          hoverOnText
        >
          {record?.Quote?.Opportunity?.title ?? '--'}
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
          Quote Created By
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/accountInfo?id=${record?.Quote?.User?.id}`);
          }}
          hoverOnText
        >
          {record?.Quote?.User?.user_name ?? '--'}
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
      render: (text: string, record: any) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={record?.Quote?.status} />
        </div>
      ),
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
              actionEye(record?.Quote?.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return columns;
}

export {getColumns, getSuperAdminQuoteColumns};
