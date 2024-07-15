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

const QuoteAnalytics = () => {
  const {filteredByDate: filteredData} = useAppSelector((state) => state.quote);
  const [token] = useThemeToken();
  const {userInformation} = useAppSelector((state) => state.user);

  const allQuotes = filteredData?.filter((item: any) =>
    userInformation?.Admin
      ? filteredData
      : item?.user_id === userInformation?.id ||
        item?.approver_id === userInformation?.id,
  );
  const draftedQuote = filteredData?.filter((item: any) =>
    userInformation?.Admin
      ? item?.status === 'Drafts'
      : item?.status === 'Drafts' && userInformation?.id === item?.user_id,
  );

  const inProgressQuote = filteredData?.filter((item: any) =>
    userInformation?.Admin
      ? item?.status === 'In Progress'
      : item?.status === 'In Progress' && userInformation?.id === item?.user_id,
  );
  const needsReviewQuote = filteredData?.filter((item: any) =>
    userInformation?.Admin
      ? item?.status === 'Needs Review'
      : item?.status === 'Needs Review' &&
        userInformation?.id === item?.user_id,
  );

  const approvedQuotes = filteredData?.filter((item: any) =>
    userInformation?.Admin
      ? item?.status === 'Approved'
      : item?.status === 'Approved' && userInformation?.id === item?.user_id,
  );

  const analyticsData = [
    {
      key: 1,
      primary: <div>{allQuotes?.length}</div>,
      secondry: 'Total Quotes',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{draftedQuote?.length}</div>,
      secondry: 'Drafts',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 3,
      primary: <div>{inProgressQuote?.length}</div>,
      secondry: 'In Progress',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 4,
      primary: <div>{needsReviewQuote?.length}</div>,
      secondry: 'Needs Review',
      icon: <DocumentPlusIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 5,
      primary: <div>{approvedQuotes?.length}</div>,
      secondry: 'Approved',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
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
