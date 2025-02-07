/* eslint-disable react-hooks/rules-of-hooks */
import {Space} from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import OsStatusWrapper from '@/app/components/common/os-status';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {formatDate, handleDate} from '@/app/utils/base';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Checkbox, GlobalToken} from 'antd';
import {SetStateAction} from 'react';

function newQuoteMappingColumns(
  token: GlobalToken,
  router: any,
  setShowApproveModal: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setShowRejectModal: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setSelectedId: any,
  setRecordData: any,
) {
  const columns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Doc Headers
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {' '}
          {formatStatus(
            text === 'product_code'
              ? 'SKU'
              : text === 'adjusted_price'
                ? 'Cost'
                : text === 'list_price'
                  ? 'MSRP'
                  : text,
          )}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Line Item Headers
        </Typography>
      ),
      dataIndex: 'quote_header',
      key: 'quote_header',
      width: 220,
      render: (text: string) => (
        <CustomTextCapitalization
          text={
            text === 'adjusted_price'
              ? 'Cost'
              : text === 'list_price'
                ? 'MSRP'
                : text
          }
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested Date
        </Typography>
      ),
      dataIndex: 'date',
      key: 'date',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {text
            ? handleDate(text, true)
            : formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Document
        </Typography>
      ),
      dataIndex: 'quote_file_id',
      key: 'quote_file_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            window.open(record?.QuoteFile?.pdf_url);
          }}
          style={{cursor: 'pointer'}}
        >
          {record?.QuoteFile?.file_name}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Salesforce
        </Typography>
      ),
      dataIndex: 'is_salesforce',
      key: 'is_salesforce',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox disabled checked={record?.is_salesforce ? true : false} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Life Boat Salesforce
        </Typography>
      ),
      dataIndex: 'life_boat_salesforce',
      key: 'life_boat_salesforce',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox
          disabled
          checked={record?.life_boat_salesforce ? true : false}
        />
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
      width: 173,
      render: (text: string) => {
        return (
          <span style={{display: 'flex', justifyContent: 'center'}}>
            <OsStatusWrapper value={text} />
          </span>
        );
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Actions
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => (
        <Space size={20}>
          <AvatarStyled
            shape="square"
            background={token?.colorSuccess}
            size={28}
            icon={
              <CheckIcon
                width={25}
                color={token?.colorBgContainer}
                onClick={() => {
                  setShowApproveModal(true);
                  setSelectedId && setSelectedId([record?.id]);
                  setRecordData(record);
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
                onClick={() => {
                  setShowRejectModal(true);
                  setSelectedId && setSelectedId([record?.id]);
                  setRecordData(record);
                }}
              />
            }
          />
        </Space>
      ),
    },
  ];

  return columns;
}
function approvedQuoteMappingColumns(
  token: GlobalToken,
  router: any,
  setShowRejectModal: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setSelectedId: any,
  setRecordData: any,
) {
  const columns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Doc Headers
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {' '}
          {record?.is_salesforce
            ? formatStatus(text)
            : formatStatus(
                text === 'product_code'
                  ? 'SKU'
                  : text === 'adjusted_price'
                    ? 'Cost'
                    : text === 'list_price'
                      ? 'MSRP'
                      : text,
              )}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Line Item Headers
        </Typography>
      ),
      dataIndex: 'quote_header',
      key: 'quote_header',
      width: 220,
      render: (text: string, record: any) => (
        <CustomTextCapitalization
          text={
            text === 'adjusted_price'
              ? 'Cost'
              : text === 'list_price'
                ? 'MSRP'
                : text
          }
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested Date
        </Typography>
      ),
      dataIndex: 'date',
      key: 'date',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {text
            ? handleDate(text, true)
            : formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Approved Date
        </Typography>
      ),
      dataIndex: 'status_date',
      key: 'status_date',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {text ? handleDate(text, true) : handleDate(handleDate(), true)}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Document
        </Typography>
      ),
      dataIndex: 'quote_file_id',
      key: 'quote_file_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            window.open(record?.QuoteFile?.pdf_url);
          }}
          style={{cursor: 'pointer'}}
        >
          {record?.QuoteFile?.file_name}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Salesforce
        </Typography>
      ),
      dataIndex: 'is_salesforce',
      key: 'is_salesforce',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox disabled checked={record?.is_salesforce ? true : false} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Life Boat Salesforce
        </Typography>
      ),
      dataIndex: 'life_boat_salesforce',
      key: 'life_boat_salesforce',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox
          disabled
          checked={record?.life_boat_salesforce ? true : false}
        />
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
      width: 173,
      render: (text: string) => {
        return (
          <span style={{display: 'flex', justifyContent: 'center'}}>
            <OsStatusWrapper value={text} />
          </span>
        );
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Actions
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AvatarStyled
            shape="square"
            background={token?.colorError}
            size={28}
            icon={
              <XMarkIcon
                width={25}
                color={token?.colorBgContainer}
                onClick={() => {
                  setShowRejectModal(true);
                  setSelectedId && setSelectedId([record?.id]);
                  setRecordData(record);
                }}
              />
            }
          />
        </div>
      ),
    },
  ];
  return columns;
}
function rejectQuoteMappingColumns(
  token: GlobalToken,
  router: any,
  setShowApproveModal: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setSelectedId: any,
  setRecordData: any,
) {
  const columns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Doc Headers
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {formatStatus(
            text === 'product_code'
              ? 'SKU'
              : text === 'adjusted_price'
                ? 'Cost'
                : text === 'list_price'
                  ? 'MSRP'
                  : text,
          )}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Line Item Headers
        </Typography>
      ),
      dataIndex: 'quote_header',
      key: 'quote_header',
      width: 220,
      render: (text: string) => (
        <CustomTextCapitalization
          text={
            text === 'adjusted_price'
              ? 'Cost'
              : text === 'list_price'
                ? 'MSRP'
                : text
          }
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested Date
        </Typography>
      ),
      dataIndex: 'date',
      key: 'date',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {text
            ? handleDate(text, true)
            : formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Rejected Date
        </Typography>
      ),
      dataIndex: 'status_date',
      key: 'status_date',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {text ? handleDate(text, true) : handleDate(handleDate(), true)}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Document
        </Typography>
      ),
      dataIndex: 'quote_file_id',
      key: 'quote_file_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            window.open(record?.QuoteFile?.pdf_url);
          }}
          style={{cursor: 'pointer'}}
        >
          {record?.QuoteFile?.file_name}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Salesforce
        </Typography>
      ),
      dataIndex: 'is_salesforce',
      key: 'is_salesforce',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox disabled checked={record?.is_salesforce ? true : false} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Life Boat Salesforce
        </Typography>
      ),
      dataIndex: 'life_boat_salesforce',
      key: 'life_boat_salesforce',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox
          disabled
          checked={record?.life_boat_salesforce ? true : false}
        />
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
      width: 173,
      render: (text: string) => {
        return (
          <span style={{display: 'flex', justifyContent: 'center'}}>
            <OsStatusWrapper value={text} />
          </span>
        );
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Reason for Rejection
        </Typography>
      ),
      dataIndex: 'reason',
      key: 'reason',
      width: 280,
      render: (text: string) => (
        <Typography cursor="pointer" name="Body 4/Medium">
          {text}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Actions
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AvatarStyled
            shape="square"
            background={token?.colorSuccess}
            size={28}
            icon={
              <CheckIcon
                width={25}
                color={token?.colorBgContainer}
                onClick={() => {
                  setShowApproveModal(true);
                  setSelectedId && setSelectedId([record?.id]);
                  setRecordData(record);
                }}
              />
            }
          />
        </div>
      ),
    },
  ];
  return columns;
}

export {
  approvedQuoteMappingColumns,
  newQuoteMappingColumns,
  rejectQuoteMappingColumns,
};
