import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DocumentPlusIcon,
  QueueListIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';

const QuoteAnalytics = (props: any) => {
  const {quoteData, deletedQuote} = props;
  const [token] = useThemeToken();
  const editedQuotes = quoteData?.filter((d: any) => d?.issue_type !== null);

  const completedQuote = editedQuotes?.filter(
    (item: any) => item?.status === 'Completed',
  );
  const draftedQuote = editedQuotes?.filter(
    (item: any) => item?.Quote?.status === 'Drafts',
  );
  const inProgressQuote = editedQuotes?.filter(
    (item: any) => item?.Quote?.status === 'In Progress',
  );

  const analyticsData = [
    {
      key: 1,
      primary: <div>{editedQuotes?.length}</div>,
      secondry: 'Edited Quotes',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{quoteData?.length}</div>,
      secondry: 'Edited Files',
      icon: <DocumentPlusIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 3,
      primary: <div>{completedQuote?.length}</div>,
      secondry: 'Completed',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 4,
      primary: <div>{draftedQuote?.length}</div>,
      secondry: 'Drafts',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 5,
      primary: <div>{inProgressQuote?.length}</div>,
      secondry: 'In Progress',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
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
