import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  ClipboardDocumentCheckIcon,
  PencilIcon,
  TagIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {useAppSelector} from '../../../../../redux/hook';

const PartnerAnalytics = () => {
  const [token] = useThemeToken();
  const {data: PartnerData} = useAppSelector((state) => state.partner);

  const analyticsData = [
    {
      key: 1,
      primary: (
        <Typography name="Heading 3/Medium">{PartnerData?.length}</Typography>
      ),
      secondry: 'Partners',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: (
        <Typography name="Heading 3/Medium">{PartnerData?.length}</Typography>
      ),
      secondry: 'Partner Programs',
      icon: (
        <ClipboardDocumentCheckIcon width={24} color={token?.colorSuccess} />
      ),
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <Typography name="Heading 3/Medium">20</Typography>,
      secondry: 'Deal Registrations',
      icon: <PencilIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <Typography name="Heading 3/Medium">05</Typography>,
      secondry: 'Quotes',
      icon: <TagIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <Typography name="Heading 3/Medium">30</Typography>,
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

export default PartnerAnalytics;
