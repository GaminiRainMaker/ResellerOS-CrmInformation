'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import {Avatar, Form, Progress, Tag} from 'antd';
import {useEffect, useState} from 'react';
import {contactSales} from '../../../../../redux/actions/auth';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import ContactSales from './ContactSales';

import CommonSelect from '@/app/components/common/os-select';
import {Card} from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {CustomCardStyle} from './styled-components';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import OsButton from '@/app/components/common/os-button';
import {getQuotesByUserAndTimeframe} from '../../../../../redux/actions/quote';
import {calculateMetrics} from '@/app/utils/script';

const Dashboard = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const {isSubscribed, loading: cacheFlowLoading} = useAppSelector(
    (state) => state.cacheFLow,
  );
  const {loading} = useAppSelector((state) => state.auth);
  const {loading: quoteLoading} = useAppSelector((state) => state.quote);
  const {userInformation} = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState('Month');
  const [currentData, setCurrentData] = useState<any>();

  useEffect(() => {
    if (userInformation?.id) {
      dispatch(
        getQuotesByUserAndTimeframe({
          user_id: userInformation?.id,
          timeframe: timeframe,
        }),
      ).then((data) => {
        if (data?.payload) {
          const FinalData = calculateMetrics(data?.payload);
          if (FinalData) {
            console.log('FinalData', FinalData);
            setCurrentData(FinalData);
          }
        }
      });
    }
  }, [userInformation, timeframe]);

  const onFinish = () => {
    const data = form?.getFieldsValue();
    dispatch(contactSales(data)).then((d: any) => {
      if (d?.payload) {
        setShowModal(false);
        form.resetFields();
      }
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Data for Pie Chart
  const pieData = currentData
    ? [
        {name: 'Vendor Quotes', value: currentData.Converted.vendorQuotes},
        {name: 'Pages', value: currentData.Converted.totalPages},
        {name: 'Line Items', value: currentData.Converted.totalLineItems},
      ]
    : [];

  // Data for Bar Chart (Revenue and Gross Profit)
  const barData = currentData
    ? [
        {name: 'Revenue', value: currentData.AverageQuote.averageRevenue},
        {
          name: 'Gross Profit',
          value: currentData.AverageQuote.averageGrossProfit,
        },
      ]
    : [];
  const COLORS: string[] = [
    token?.colorPrimary,
    token?.colorInfo,
    token?.colorTextDisabled,
    '#2B759A',
    '#495D79',
    '#31576F',
  ];

  const selectOption = [
    {
      label: 'Day',
      value: 'Day',
    },
    {
      label: 'Week',
      value: 'Week',
    },
    {
      label: 'Month',
      value: 'Month',
    },
    {
      label: 'Year',
      value: 'Year',
    },
  ];

  const ContactData = [
    {
      key: 1,
      title: 'Phone Numbers',
      data1: '+15854990061',
      data2: '+16102458921',
      icon: <PhoneIcon width={20} color={token?.colorLinkHover} />,
    },
    {
      key: 2,
      title: 'Email Address',
      data1: 'info@reselleros.com',
      data2: 'support@reselleros.com',
      icon: <EnvelopeIcon width={20} color={token?.colorLinkHover} />,
    },
    {
      key: 3,
      title: 'Headquarters',
      data1: '123 Main Street, Anytown, USA, 12345',
      icon: <MapPinIcon width={20} color={token?.colorLinkHover} />,
    },
  ];

  return (
    <GlobalLoader loading={quoteLoading}>
      {isSubscribed &&
      userInformation?.Role === 'reseller' &&
      (userInformation?.DealReg || userInformation?.QuoteAI) ? (
        <Tag
          style={{
            display: 'flex',
            padding: '20px',
            borderRadius: '4px',
            border: `1px solid ${token?.colorSuccess}`,
          }}
          color="success"
        >
          <Row justify="space-between" style={{width: '100%'}} align="middle">
            <Col span={12}>
              <>
                <Avatar
                  size={24}
                  style={{
                    marginTop: '-12px',
                    marginRight: '5px',
                    background: 'none',
                  }}
                  icon={
                    <CheckBadgeIcon width={24} color={token?.colorSuccess} />
                  }
                />

                <Space direction="vertical" size={0}>
                  <Typography color={token?.colorSuccess} name="Heading 3/Bold">
                    Subscribed User
                  </Typography>
                </Space>
              </>
            </Col>
          </Row>
        </Tag>
      ) : isSubscribed &&
        !userInformation?.DealReg &&
        !userInformation?.QuoteAI ? (
        <Tag
          style={{
            display: 'flex',
            padding: '20px',
            borderRadius: '4px',
            border: `1px solid ${token?.colorSuccess}`,
          }}
          color="success"
        >
          <Row justify="space-between" style={{width: '100%'}} align="middle">
            <Col span={12}>
              <>
                <Avatar
                  size={24}
                  style={{
                    marginTop: '-12px',
                    marginRight: '5px',
                    background: 'none',
                  }}
                  icon={
                    <CheckBadgeIcon width={24} color={token?.colorSuccess} />
                  }
                />

                <Space direction="vertical" size={0}>
                  <Typography color={token?.colorSuccess} name="Heading 3/Bold">
                    Subscribed Organization
                  </Typography>
                  <Typography
                    color={token?.colorSuccess}
                    name="Body 3/Medium"
                    as="span"
                  >
                    Our organization holds an active subscription. To gain
                    access to the quote and deal registration features, please
                    contact the organizational team or the admin!
                  </Typography>
                </Space>
              </>
            </Col>
          </Row>
        </Tag>
      ) : (
        <>
          <Space direction="vertical" style={{width: '100%'}}>
            <Tag
              style={{
                display: 'flex',
                padding: '20px',
                borderRadius: '4px',
                border: `1px solid ${token?.colorError}`,
              }}
              color="error"
            >
              <Row
                justify="space-between"
                style={{width: '100%'}}
                align="middle"
              >
                <Col span={12}>
                  <>
                    <Avatar
                      size={24}
                      style={{
                        marginTop: '-12px',
                        marginRight: '5px',
                        background: 'none',
                      }}
                      icon={
                        <InformationCircleIcon
                          width={24}
                          color={token?.colorError}
                        />
                      }
                    />

                    <Space direction="vertical" size={0}>
                      <Typography
                        color={token?.colorError}
                        name="Heading 3/Bold"
                      >
                        Unsubscribed User
                      </Typography>

                      <Typography
                        color={token?.colorError}
                        name="Body 3/Medium"
                        as="span"
                      >
                        Unlock premium features and exclusive content by
                        subscribing to our web application today!
                      </Typography>
                    </Space>
                  </>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    color={token?.colorLink}
                    name="Button 1"
                    style={{fontWeight: 700}}
                    hoverOnText
                  >
                    Subscribe Now
                  </Typography>
                </Col>
              </Row>
            </Tag>
          </Space>
        </>
      )}
      <br />
      <br />
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <Typography name="Heading 3/Bold">
            {' '}
            This {timeframe}'s Metrics
          </Typography>
        </Col>
        <Col>
          <Space direction="vertical" size={0}>
            <Typography name="Body 4/Medium">Timeframe:</Typography>
            <CommonSelect
              options={selectOption}
              style={{width: '200px'}}
              placeholder="Select Dealreg Forms"
              onChange={(value) => setTimeframe(value)}
              defaultValue={'Month'}
            />
          </Space>
        </Col>
      </Row>

      {currentData && (
        <div style={{padding: '16px'}}>
          {/* Metrics and Charts Grid */}
          <Row gutter={16} style={{marginBottom: '32px'}}>
            <Col span={12}>
              <Card title="You've Converted">
                <Typography name="Body 4/Regular" as="div">
                  Vendor Quotes: {currentData.Converted.vendorQuotes}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Pages: {currentData.Converted.totalPages}{' '}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Line Items: {currentData.Converted.totalLineItems}{' '}
                </Typography>
                <br />
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="You've Quoted">
                <Typography name="Body 4/Regular" as="div">
                  Customers: {currentData.Quoted.totalCustomers}{' '}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Revenue: ${currentData.Quoted.totalRevenue}{' '}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Gross Profit: ${currentData.Quoted.grossProfit}{' '}
                </Typography>
                <br />
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={Object?.entries(currentData.Quoted).map(
                      ([key, value]) => ({
                        name: key,
                        value,
                      }),
                    )}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                      {Object.entries(currentData).map(
                        ([key, value], index) => (
                          <Cell
                            key={key}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ),
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{marginBottom: '32px'}}>
            <Col span={12}>
              <Card title="You've Earned">
                <Typography name="Body 4/Regular" as="div">
                  Hours of Time: {currentData.Earned.hoursOfTime}{' '}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Gross Profit: ${currentData.Earned.grossProfit}
                </Typography>
                <br />
                <br />
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={[
                      {
                        name: 'Gross Profit',
                        value: currentData.Earned.vendorQuotes,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                      <Cell fill={COLORS[3]} />{' '}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Average per Quote">
                <Typography name="Body 4/Regular" as="div">
                  Revenue: ${currentData.AverageQuote.averageRevenue}{' '}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Gross Profit: ${currentData.AverageQuote.averageGrossProfit}{' '}
                </Typography>
                <Typography name="Body 4/Regular" as="div">
                  Profit Margin:
                  {currentData.AverageQuote.averageProfitMargin}%{' '}
                </Typography>
                <Progress
                  percent={currentData.AverageQuote.averageProfitMargin}
                  status="active"
                  strokeColor={'#31576F'}
                />
                <br />
                <br />
                <ResponsiveContainer width="100%" height={158}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                      {barData.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      <Row justify="space-between">
        <Col>
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            Get In Touch
          </Typography>
        </Col>
        <Col>
          <OsButton
            text="Testing Azure AI"
            buttontype="PRIMARY"
            clickHandler={() => {
              window?.open('/azzureAi?excel=false');
            }}
          />
        </Col>
        <Col>
          <OsButton
            text="Testing Excel"
            buttontype="PRIMARY"
            clickHandler={() => {
              window?.open('/azzureAi?excel=true');
            }}
          />
        </Col>
        <Col>
          <OsButton
            text="Contact Us"
            buttontype="PRIMARY"
            clickHandler={() => {
              setShowModal(true);
            }}
          />
        </Col>
      </Row>
      <br />
      <CustomCardStyle>
        <Space direction="vertical" size={24}>
          <span>
            <Typography name="Body 1/Bold" color={token?.colorPrimary} as="div">
              Contact Sales
            </Typography>
            <Typography name="Body 3/Medium" color={token?.colorPrimaryText}>
              For seamless access to our web application's premium features and
              exclusive benefits, reach out to our dedicated sales team today.
              Whether you're seeking enhanced functionality, personalized
              assistance, or specialized packages tailored to your needs, our
              experts are here to guide you through the subscription process.
              Contact us now to elevate your experience and maximize the value
              of our platform.
            </Typography>
          </span>
          <Row justify="space-between" gutter={[16, 16]}>
            {ContactData?.map((ContactDataItem) => {
              return (
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={8}
                  xxl={8}
                  key={ContactDataItem?.key}
                >
                  <Space direction="vertical" size={4}>
                    <Typography name="Body 1/Bold" color={token?.colorPrimary}>
                      {ContactDataItem?.title}
                    </Typography>
                    <Space>
                      {ContactDataItem?.data1 && (
                        <Space align="center">
                          <AvatarStyled
                            icon={ContactDataItem?.icon}
                            background={token?.colorInfoHover}
                            size={36}
                          />

                          <Typography
                            key={ContactDataItem?.key}
                            name="Body 3/Medium"
                            color={'#575757'}
                            ellipsis
                            maxWidth={250}
                            as="div"
                            tooltip
                          >
                            {ContactDataItem?.data1}
                          </Typography>
                        </Space>
                      )}
                      {ContactDataItem?.data2 && (
                        <Space align="center">
                          <AvatarStyled
                            icon={ContactDataItem?.icon}
                            background={token?.colorInfoHover}
                            size={36}
                          />

                          <Typography
                            key={ContactDataItem?.key}
                            name="Body 3/Medium"
                            color={'#575757'}
                            ellipsis
                            maxWidth={200}
                            as="div"
                            tooltip
                          >
                            {ContactDataItem?.data2}
                          </Typography>
                        </Space>
                      )}
                    </Space>
                  </Space>
                </Col>
              );
            })}
          </Row>
        </Space>
      </CustomCardStyle>

      <OsModal
        loading={loading}
        body={<ContactSales form={form} onFinish={onFinish} />}
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        onOk={form.submit}
        primaryButtonText="Send Query"
        footerPadding={30}
      />
    </GlobalLoader>
  );
};

export default Dashboard;
