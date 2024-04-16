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

const DealRegAnalytics = (props: any) => {
  const [token] = useThemeToken();

  const analyticsData = [
    {
      key: 1,
      primary: (
        <Typography name="Heading 3/Medium">{props?.data?.length}</Typography>
      ),
      secondry: 'Total Forms',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: (
        <Typography name="Heading 3/Medium">{props?.data?.length}</Typography>
      ),
      secondry: 'Partners',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 3,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Completed',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 4,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
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

export default DealRegAnalytics;
