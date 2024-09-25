import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import {useAppSelector} from '../../../../../redux/hook';

const DealRegAnalytics = () => {
  const [token] = useThemeToken();
  const {data: DealRegData} = useAppSelector((state) => state.dealReg);
  const {userInformation} = useAppSelector((state) => state.user);

  const finalData = userInformation?.Admin
    ? DealRegData
    : DealRegData?.filter(
        (dealRegDataItem: any) =>
          dealRegDataItem?.user_id === userInformation?.id,
      );

  const getUniqueCounts = (data: any) => {
    const uniqueOpportunityIds = new Set();
    const statusCounts = {
      'In Progress': 0,
      Submitted: 0,
    };

    data?.forEach((item: any) => {
      if (item?.opportunity_id !== null) {
        uniqueOpportunityIds?.add(item?.opportunity_id);
      }
      if (item?.status === 'In Progress') {
        statusCounts['In Progress']++;
      } else if (item?.status === 'Submitted') {
        statusCounts['Submitted']++;
      }
    });

    return {
      uniqueOpportunityCount: uniqueOpportunityIds.size,
      statusCounts: statusCounts,
    };
  };
  const counts = getUniqueCounts(finalData);

  const analyticsData = [
    {
      key: 1,
      primary: (
        <Typography name="Heading 3/Medium">
          {finalData?.length ?? 0}
        </Typography>
      ),
      secondry: 'Total Forms',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: (
        <Typography name="Heading 3/Medium">
          {counts?.uniqueOpportunityCount ?? 0}
        </Typography>
      ),
      secondry: 'Opportunity',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 3,
      primary: (
        <Typography name="Heading 3/Medium">
          {counts?.statusCounts?.['In Progress'] ?? 0}
        </Typography>
      ),
      secondry: 'In Progress',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 4,
      primary: (
        <Typography name="Heading 3/Medium">
          {' '}
          {counts?.statusCounts?.Submitted ?? 0}
        </Typography>
      ),
      secondry: 'Submitted',
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
            isNotification={false}
          />
        </Col>
      ))}
    </Row>
  );
};

export default DealRegAnalytics;
