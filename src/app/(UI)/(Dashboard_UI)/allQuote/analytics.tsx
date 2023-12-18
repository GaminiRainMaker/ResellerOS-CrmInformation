import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  QueueListIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';

const QuoteAnalytics = (props: any) => {
  const {quoteData, deletedQuote} = props;
  const [token] = useThemeToken();
  const completedQuote = quoteData?.filter((item: any) => item?.is_completed);
  const draftedQuote = quoteData?.filter((item: any) => item?.is_drafted);
  const recentQuote = quoteData?.filter(
    (item: any) => !item?.is_drafted && !item?.is_completed,
  );
  const analyticsData = [
    {
      key: 1,
      primary: <div>{quoteData?.length}</div>,
      secondry: 'Total Quotes',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{completedQuote?.length}</div>,
      secondry: 'Completed',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{recentQuote?.length}</div>,
      secondry: 'Drafts',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>{draftedQuote?.length}</div>,
      secondry: 'In Progress',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <div>{deletedQuote?.length}</div>,
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  return (
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
  );
};

export default QuoteAnalytics;
