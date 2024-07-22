/* eslint-disable react-hooks/rules-of-hooks */
import {Space} from '@/app/components/common/antd/Space';
import OsStatusWrapper from '@/app/components/common/os-status';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
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
          Change Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => {
        if (text === 'Pending') {
          return (
            <Space size={10}>
              <Typography
                color={token?.colorSuccessActive}
                cursor="pointer"
                name="Body 3/Bold"
                onClick={() => {
                  setShowApproveModal(true);
                  setSelectedId && setSelectedId([record?.id]);
                  setRecordData(record);
                }}
              >
                Approve
              </Typography>

              <Typography
                color={token?.colorErrorActive}
                cursor="pointer"
                name="Body 3/Bold"
                onClick={() => {
                  setShowRejectModal(true);
                  setSelectedId && setSelectedId([record?.id]);
                  setRecordData(record);
                }}
              >
                Reject
              </Typography>
            </Space>
          );
        } else {
          return (
            <span style={{display: 'flex', justifyContent: 'center'}}>
              <OsStatusWrapper value={text} />
            </span>
          );
        }
      },
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
          Change Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          color={token?.colorLink}
          cursor="pointer"
          name="Body 3/Bold"
          onClick={() => {
            setShowRejectModal(true);
            setSelectedId && setSelectedId([record?.id]);
            setRecordData(record);
          }}
        >
          Reject
        </Typography>
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
          Change Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          color={token?.colorLink}
          cursor="pointer"
          name="Body 3/Bold"
          onClick={() => {
            setShowApproveModal(true);
            setSelectedId && setSelectedId([record?.id]);
            setRecordData(record);
          }}
        >
          Approve
        </Typography>
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
