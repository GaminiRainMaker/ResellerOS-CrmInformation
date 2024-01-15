import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DocumentCheckIcon,
  PencilIcon,
  QueueListIcon,
  TagIcon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const PartnerAnalytics = (props: any) => {
  const [token] = useThemeToken();

  const analyticsData = [
    {
      key: 1,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Partners',
      icon: <UsersIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Programs',
      icon: (
        <ClipboardDocumentCheckIcon width={24} color={token?.colorSuccess} />
      ),
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Registrations',
      icon: <PencilIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Quotes',
      icon: <TagIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Registered',
      icon: <DocumentCheckIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
    {
      key: 6,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Self-Registered',
      icon: (
        <ClipboardDocumentCheckIcon width={24} color={token?.colorLinkHover} />
      ),
      iconBg: token?.colorInfoHover,
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

export default PartnerAnalytics;
