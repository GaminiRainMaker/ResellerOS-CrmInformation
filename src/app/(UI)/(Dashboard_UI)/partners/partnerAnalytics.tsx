/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  PencilIcon,
  TagIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';

const PartnerAnalytics = () => {
  const [token] = useThemeToken();
  const {data: PartnerData} = useAppSelector((state) => state.partner);
  const {data: PartnerProgramData} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const {userInformation} = useAppSelector((state) => state.user);
  const [activeCount, setActiveCount] = useState<number>(0);
  const [inActiveCount, setInActiveCount] = useState<number>(0);

  console.log('PartnerData', PartnerData);

  useEffect(() => {
    if (PartnerData && PartnerData?.approved) {
      const {active, inactive} = PartnerData?.approved.reduce(
        (counts: any, entry: any) => {
          if (entry.is_active) {
            counts.active++;
          } else {
            counts.inactive++;
          }

          return counts;
        },
        {active: 0, inactive: 0},
      );
      setActiveCount(active);
      setInActiveCount(inactive);
    }
  }, [PartnerData]);

  const analyticsData = [
    {
      key: 1,
      primary: (
        <Typography name="Heading 3/Medium">
          {PartnerData?.approved?.length}
        </Typography>
      ),
      secondry: 'Partners',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: (
        <Typography name="Heading 3/Medium">
          {PartnerProgramData?.length}
        </Typography>
      ),
      secondry: 'Partner Programs',
      icon: (
        <ClipboardDocumentCheckIcon width={24} color={token?.colorSuccess} />
      ),
      iconBg: token?.colorSuccessBg,
    },
    userInformation?.SuperAdmin
      ? {
          key: 3,
          primary: (
            <Typography name="Heading 3/Medium">{activeCount}</Typography>
          ),
          secondry: 'Active',
          icon: <CheckCircleIcon width={24} color={token?.colorLink} />,
          iconBg: token?.colorLinkActive,
        }
      : {
          key: 3,
          primary: <Typography name="Heading 3/Medium">20</Typography>,
          secondry: 'Deal Registrations',
          icon: <PencilIcon width={24} color={token?.colorLink} />,
          iconBg: token?.colorLinkActive,
        },
    userInformation?.SuperAdmin
      ? {
          key: 4,
          primary: (
            <Typography name="Heading 3/Medium">{inActiveCount}</Typography>
          ),
          secondry: 'InActive',
          icon: <ClockIcon width={24} color={token?.colorWarning} />,
          iconBg: token?.colorWarningBg,
        }
      : {
          key: 4,
          primary: <Typography name="Heading 3/Medium">05</Typography>,
          secondry: 'Quotes',
          icon: <TagIcon width={24} color={token?.colorWarning} />,
          iconBg: token?.colorWarningBg,
        },
    {
      key: 5,
      primary: <Typography name="Heading 3/Medium">{0}</Typography>,
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
