/* eslint-disable react-hooks/rules-of-hooks */
import {Space} from '@/app/components/common/antd/Space';
import OsStatusWrapper from '@/app/components/common/os-status';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {GlobalToken} from 'antd';
import {JSX, SetStateAction} from 'react';

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
          PDF Headers
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text}</Typography>
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
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested Date
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote PDF Document
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            // router.push(
            //   `/generateQuote?id=${record?.Quote?.id}&inReviewQuote=${false}`,
            // );
          }}
        >
          {record?.Quote?.file_name ??
            formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
          PDF Headers
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text}</Typography>
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
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested Date
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote PDF Document
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            // router.push(
            //   `/generateQuote?id=${record?.Quote?.id}&inReviewQuote=${false}`,
            // );
          }}
        >
          {record?.Quote?.file_name ??
            formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
          PDF Headers
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text}</Typography>
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
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested Date
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote PDF Document
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            // router.push(
            //   `/generateQuote?id=${record?.Quote?.id}&inReviewQuote=${false}`,
            // );
          }}
        >
          {record?.Quote?.file_name ??
            formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
  newQuoteMappingColumns,
  approvedQuoteMappingColumns,
  rejectQuoteMappingColumns,
};
