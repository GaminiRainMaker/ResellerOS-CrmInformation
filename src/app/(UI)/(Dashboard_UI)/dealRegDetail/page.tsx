'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import DealRegCustomTabs from '@/app/components/common/os-custom-tab/DealRegCustomTabs';
import OsDropdown from '@/app/components/common/os-dropdown';
import Typography from '@/app/components/common/typography';
import {ArrowDownTrayIcon, PlusIcon} from '@heroicons/react/24/outline';
import {MenuProps} from 'antd';
import {useRouter} from 'next/navigation';

const DealRegDetail = () => {
  const [token] = useThemeToken();
  const router = useRouter();

  const tabs = [
    {
      key: 1,
      title: 'Cisco',
      progressbarPercentage: 20,
    },
    {
      key: 2,
      title: 'Dell',
      progressbarPercentage: 50,
    },
    {
      key: 3,
      title: 'Amazon',
      progressbarPercentage: 80,
    },
  ];

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/DealReg');
          }}
        >
          All Forms
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {
            // router?.push(`/generateQuote?id=${getQuoteID}`);
          }}
        >
          Cisco- Impress Technology- Precision
        </Typography>
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '2',
      label: <Typography name="Body 3/Regular">Edit Selected</Typography>,
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <OsBreadCrumb items={menuItems} />
        </Col>
        <Col>
          <Space size={8}>
            <OsButton
              text="Save"
              buttontype="SECONDARY"
              clickHandler={() => {}}
            />
            <OsButton
              text="Download"
              buttontype="SECONDARY"
              icon={
                <ArrowDownTrayIcon
                  width={24}
                  height={24}
                  color={token?.colorPrimary}
                />
              }
            />
            <OsButton
              text="Add New Form"
              buttontype="PRIMARY"
              icon={<PlusIcon width={24} />}
            />

            <OsDropdown menu={{items: dropDownItemss}} />
          </Space>
        </Col>
      </Row>
      <DealRegCustomTabs tabs={tabs} />
    </div>
  );
};

export default DealRegDetail;
