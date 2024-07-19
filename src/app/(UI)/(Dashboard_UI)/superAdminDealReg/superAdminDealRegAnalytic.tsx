import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const SuperAdminDealRegAnalytic = ({data}: any) => {
  const [token] = useThemeToken();

  const activeTemplateCount: any = data?.getFormDataProgram?.filter(
    (getFormDataProgramItem: any) => getFormDataProgramItem?.form_data_active,
  );

  const analyticsData = [
    {
      key: 1,
      primary: (
        <Typography name="Heading 3/Medium">
          {data?.getFormDataProgram?.length ?? 0}
        </Typography>
      ),
      secondry: 'Templates',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: (
        <Typography name="Heading 3/Medium">
          {activeTemplateCount?.length ?? 0}
        </Typography>
      ),
      secondry: 'Active Templates',
      icon: <PencilIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 3,
      primary: (
        <Typography name="Heading 3/Medium">
          {data?.attributeSection?.length ?? 0}
        </Typography>
      ),
      secondry: 'Attributes Sections',
      icon: (
        <ClipboardDocumentCheckIcon width={24} color={token?.colorSuccess} />
      ),
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 4,
      primary: (
        <Typography name="Heading 3/Medium">
          {data?.attributeField?.length ?? 0}
        </Typography>
      ),
      secondry: 'Attributes Fields',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },

    {
      key: 5,
      primary: <Typography name="Heading 3/Medium">0</Typography>,
      secondry: 'Completed',
      icon: <CheckCircleIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 6,
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

export default SuperAdminDealRegAnalytic;
