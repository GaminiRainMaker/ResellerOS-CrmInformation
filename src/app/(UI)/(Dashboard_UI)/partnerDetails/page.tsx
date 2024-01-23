/* eslint-disable no-nested-ternary */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {PartnerData} from '@/app/utils/CONSTANTS';
import {useRouter} from 'next/navigation';

import CommonDatePicker from '@/app/components/common/os-date-picker';
import {
  ClipboardDocumentCheckIcon,
  DocumentCheckIcon,
  PlusIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const PartnerDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();

  const BreadCrumbItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router.push(`/partners`);
          }}
        >
          Partners
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
          onClick={() => {}}
        >
          Cisco
        </Typography>
      ),
    },
  ];

  const analyticsData = [
    {
      key: 1,
      primary: <Typography name="Heading 3/Medium">Cisco</Typography>,
      secondry: 'IT Services partner',
    },
    {
      key: 2,
      primary: <div>{30}</div>,
      secondry: 'Total Partner Programs',
      icon: (
        <ClipboardDocumentCheckIcon width={36} color={token?.colorSuccess} />
      ),
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{30}</div>,
      secondry: 'Total Registrations',
      icon: <DocumentCheckIcon width={36} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
    {
      key: 4,
      primary: <div>{125}</div>,
      secondry: 'Total Quotes',
      icon: <TagIcon width={36} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
  ];

  const dropDownItemss = [
    {
      key: '1',
      label: (
        <Typography name="Body 3/Regular">Bundle Configuration</Typography>
      ),
    },
  ];

  const PartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      width: 270,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'generated_date',
      key: 'generated_date',
      width: 212,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
        </Typography>
      ),
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 437,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer
        </Typography>
      ),
      dataIndex: 'customer',
      key: 'customer',
      width: 214,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 231,
      render: (text: string, record: any) => <OsStatusWrapper value={text} />,
    },
    {
      title: 'Template',
      dataIndex: 'actions',
      key: 'actions',
      width: 112,
      render: (text: string) => (
        <Typography name="Caption Bold" color={token?.colorLink}>
          View
        </Typography>
      ),
    },
  ];

  const QuoteColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          File Name
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 270,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'generated_date',
      key: 'generated_date',
      width: 212,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
        </Typography>
      ),
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 437,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer
        </Typography>
      ),
      dataIndex: 'customer',
      key: 'customer',
      width: 214,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 231,
      render: (text: string, record: any) => {
        const statusValue = record.is_completed
          ? 'Completed'
          : record?.is_drafted
            ? 'In Progress'
            : 'Drafts';
        return <OsStatusWrapper value="Completed" />;
      },
    },
    {
      title: 'Quote',
      dataIndex: 'actions',
      key: 'actions',
      width: 112,
      render: (text: string) => (
        <Typography name="Body 4/Regular" color={token?.colorLink}>
          View
        </Typography>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Create Quotes"
        // onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const PartnerTabItems = [
    {
      label: 'All',
      key: '1',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={PartnerData}
          //   rowSelection={}
          scroll
          //   loading={}
        />
      ),
    },
  ];

  const QuoteTabItems = [
    {
      label: 'All',
      key: '1',
      children: (
        <OsTable
          columns={QuoteColumns}
          dataSource={[]}
          //   rowSelection={}
          scroll
          //   loading={}
          locale={locale}
        />
      ),
    },
  ];

  return (
    <Space style={{width: '100%'}} size={24} direction="vertical">
      <OsBreadCrumb items={BreadCrumbItems} />

      <Row gutter={[16, 16]} justify="center">
        {analyticsData?.map((item: any) => (
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <DetailAnalyticCard
              primaryText={item?.primary}
              secondaryText={item?.secondry}
              fallbackIcon={item?.icon}
              iconBg={item?.iconBg}
            />
          </Col>
        ))}
      </Row>
      <Row justify="space-between">
        <Col>
          <Typography name="Heading 3/Medium">Partner Programs</Typography>
        </Col>
        <Col>
          <div
            style={{
              display: 'flex',
              width: '40%',
              gap: '8px',
            }}
          >
            <OsButton
              text="Request Partner"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
            />

            <Space>
              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </div>
        </Col>
      </Row>

      <Row style={{background: 'white', padding: '24px', borderRadius: '12px'}}>
        <OsTabs
          onChange={(e) => {
            // setActiveTab(e);
          }}
          //   activeKey={activeTab}
          tabBarExtraContent={
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">From Date</Typography>
                <CommonDatePicker
                  // value={''}
                  placeholder="MM/DD/YYYY"
                  // onChange={(v: any) => {
                  //   setFromDate(v);
                  // }}
                />
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">To Date</Typography>
                <CommonDatePicker
                  // value={toDate}
                  placeholder="MM/DD/YYYY"
                  // onChange={(v: any) => {
                  //   setToDate(v);
                  // }}
                />
              </Space>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color={token?.colorLink}
                  // onClick={handleReset}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          }
          items={PartnerTabItems.map((tabItem: any, index: number) => ({
            key: `${index + 1}`,
            label: tabItem?.label,
            ...tabItem,
          }))}
        />
      </Row>

      <Row justify="space-between">
        <Col>
          <Typography name="Heading 3/Medium">Quotes</Typography>
        </Col>
        <Col>
          <div
            style={{
              display: 'flex',
              width: '40%',
              gap: '8px',
            }}
          >
            <OsButton
              text="Create Quote"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
            />

            <Space>
              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </div>
        </Col>
      </Row>

      <Row style={{background: 'white', padding: '24px', borderRadius: '12px'}}>
        <OsTabs
          onChange={(e) => {
            // setActiveTab(e);
          }}
          //   activeKey={activeTab}
          tabBarExtraContent={
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">From Date</Typography>
                <CommonDatePicker
                  // value={''}
                  placeholder="MM/DD/YYYY"
                  // onChange={(v: any) => {
                  //   setFromDate(v);
                  // }}
                />
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">To Date</Typography>
                <CommonDatePicker
                  // value={toDate}
                  placeholder="MM/DD/YYYY"
                  // onChange={(v: any) => {
                  //   setToDate(v);
                  // }}
                />
              </Space>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color={token?.colorLink}
                  // onClick={handleReset}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          }
          items={QuoteTabItems.map((tabItem: any, index: number) => ({
            key: `${index + 1}`,
            label: tabItem?.label,
            ...tabItem,
          }))}
        />
      </Row>
    </Space>
  );
};

export default PartnerDetails;
