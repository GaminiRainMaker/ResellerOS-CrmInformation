import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DocumentPlusIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import {useAppSelector} from '../../../../../redux/hook';

const EditedQuoteAnalytics = () => {
  const {data} = useAppSelector((state) => state.quoteFile);
  const [token] = useThemeToken();
  const editedQuotes = data?.filter((d: any) => d?.issue_type !== null);

  const completedQuote = data?.filter(
    (item: any) => item?.Quote?.status === 'Completed',
  );
  const draftedQuote = data?.filter(
    (item: any) => item?.Quote?.status === 'Drafts',
  );
  const inProgressQuote = data?.filter(
    (item: any) => item?.Quote?.status === 'In Progress',
  );
  const needsReviewsQuote = data?.filter(
    (item: any) => item?.Quote?.status === 'Needs Review',
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
      primary: <div>{data?.length}</div>,
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
      primary: <div>{needsReviewsQuote?.length}</div>,
      secondry: 'Needs Review',
      icon: <DocumentPlusIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 6,
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
            isNotification={false}
          />
        </Col>
      ))}
    </Row>
  );
};

export default EditedQuoteAnalytics;
