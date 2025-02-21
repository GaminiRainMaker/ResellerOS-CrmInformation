/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import DailogModal from '@/app/components/common/os-modal/DialogModal';
import CommonSelect from '@/app/components/common/os-select';
import { AvatarStyled } from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import { calculateMetrics } from '@/app/utils/script';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { contactSales } from '../../../../../redux/actions/auth';
import { activateTrailPhase } from '../../../../../redux/actions/license';
import { getQuotesByUserAndTimeframe } from '../../../../../redux/actions/quote';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import ContactSales from './ContactSales';
import { CustomCardStyle } from './styled-components';
import FileCard from '../demoBoard/FileCard';

const Dashboard = () => {
  const [token] = useThemeToken();
  const { abbreviate } = useAbbreviationHook(0);
  const [form] = Form.useForm();
  const [trialForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { loading: quoteLoading } = useAppSelector((state) => state.quote);
  const { loading: licenseLoading } = useAppSelector((state) => state.license);
  const { userInformation } = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTrailModal, setShowTrailModal] = useState<boolean>(false);
  const [showDownloadFileModal, setShowDownloadFileModal] =
    useState<boolean>(false);
  const [timeframe, setTimeframe] = useState('Month');
  const [currentData, setCurrentData] = useState<any>();
  const [trialFlowStep, setTrialFlowStep] = useState<string>('1');

  useEffect(() => {
    if (userInformation?.id) {
      dispatch(
        getQuotesByUserAndTimeframe({
          user_id: userInformation?.id,
          timeframe,
        }),
      ).then((data) => {
        if (data?.payload) {
          const FinalData = calculateMetrics(data?.payload);
          if (FinalData) {
            setCurrentData(FinalData);
          }
        }
      });
    }
  }, [userInformation, timeframe]);

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

  const enableTrailVersion = async () => {
    if (userInformation) {
      try {
        const data = await dispatch(
          activateTrailPhase({
            user_id: userInformation?.id,
            feature_name: 'QuoteAI',
          }),
        );
        if (data?.payload?.message) {
          window.location.reload();
          setShowTrailModal(false);
        }
        // else {
        //   notification?.open({
        //     message: `${data?.payload?.message}`,
        //     type: 'info',
        //   });
        // }
      } catch {
        setShowTrailModal(false);
      }
    }
  };
  const averagePerQuoteData = [
    {
      name: 'Per Quote',
      revenue: abbreviate(currentData?.AverageQuote?.averageRevenue) ?? 0,
      profit: currentData?.AverageQuote?.averageGrossProfit ?? 0,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          <p style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Per Quote</p>
          <p style={{ margin: '0', color: '#6B7280' }}>
            Other Revenue:{' '}
            <span style={{ color: '#6B7280' }}>${payload[0]?.value}</span>
          </p>
          <p style={{ margin: '0', color: '#1E40AF' }}>
            Gross Profit:{' '}
            <span style={{ color: '#1E40AF' }}>${payload[1]?.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  const trialOnFinish = () => {
    if (trialFlowStep === '1') {
      const trialFormValue = trialForm.getFieldsValue();
      console.log('trialFormValue', trialFormValue);
    } else if (trialFlowStep === '4') {
      setTrialFlowStep('0');
      setShowDownloadFileModal(false);
    }
    setTrialFlowStep((prevStep) => {
      const nextStep =
        Number(prevStep) < 4 ? String(Number(prevStep) + 1) : prevStep;
      return nextStep;
    });
  };

  return (
    <GlobalLoader loading={quoteLoading}>
      {/* {isSubscribed &&
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
            <br />
          </Space>
        </>
      )} */}
      <br />
      <br />
      <Row
        justify="space-between"
        align="middle"
        style={{ width: '100%', marginBottom: '20px' }}
      >
        <Col>
          <Typography name="Heading 3/Bold">
            {' '}
            This {timeframe}&apos;s Metrics
          </Typography>
        </Col>
        <Col>
          <Space direction="vertical" size={0}>
            <Typography name="Body 4/Medium">Timeframe:</Typography>
            <CommonSelect
              options={selectOption}
              style={{ width: '200px' }}
              placeholder="Select Dealreg Forms"
              onChange={(value) => setTimeframe(value)}
              defaultValue="Month"
            />
          </Space>
        </Col>
      </Row>
      <div
        style={{
          padding: '24px',
          background: 'white',
          borderRadius: '10px',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Row>
          <Col span={6} >
            <Typography name="Body 1/Bold">You&apos;ve Converted</Typography>

          </Col>
          <Col span={6} >
            <Typography name="Body 1/Bold">You&apos;ve Quoted</Typography>

          </Col>
          <Col span={6} >
            <Typography name="Body 1/Bold">You&apos;ve Earned</Typography>

          </Col>
          <Col span={6} >
            <Typography name="Body 1/Bold">Average per Quoted</Typography>

          </Col>
        </Row>
        <Row>
          <Col span={18} >
            <Row style={{ margin: "20px" }}>
              <Col span={8} >
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Converted?.vendorQuotes}
                </Typography>
                <Typography name="Body 4/Regular">VENDOR QUOTES</Typography>
              </Col>
              <Col span={8}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Quoted?.totalCustomers}
                </Typography>
                <Typography name="Body 4/Regular">CUSTOMERS</Typography>
              </Col>
              <Col span={8}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Earned?.hoursOfTime}{' '}
                </Typography>
                <Typography name="Body 4/Regular">HOURS OF TIME</Typography>
              </Col>
            </Row>
            <Row style={{ margin: "20px" }}>
              <Col span={8}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Converted?.totalPages}
                </Typography>
                <Typography name="Body 4/Regular">PAGES</Typography>
              </Col>
              <Col span={8}>
                <Typography name="Heading 2/Bold" as="div">
                  ${abbreviate(currentData?.Quoted?.totalRevenue ?? 0)}{' '}
                </Typography>
                <Typography name="Body 4/Regular">REVENUE</Typography>
              </Col>
              <Col span={8}>
                <Typography name="Heading 2/Bold" as="div">
                  {abbreviate(currentData?.Quoted?.grossProfit ?? 0)}{' '}
                </Typography>
                <Typography name="Body 4/Regular">GROSS PROFIT</Typography>
              </Col>

            </Row>
          </Col>
          <Col span={6} >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={averagePerQuoteData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="category" dataKey="name" />
                <YAxis
                  type="number"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" stackId="a" fill="#A0AEC0" />
                <Bar dataKey="profit" stackId="a" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        <Row>
          <Col span={6}><Typography name="Heading 2/Bold" as="div">
            {currentData?.Converted?.totalLineItems}
          </Typography>
            <Typography name="Body 4/Regular">LINE ITEMS</Typography></Col>
          <Col span={8}>     <Typography name="Heading 2/Bold" as="div">
            {abbreviate(currentData?.Quoted?.grossProfit ?? 0)}{' '}
          </Typography>
            <Typography name="Body 4/Regular">GROSS PROFIT</Typography></Col>
          <Col span={6} />
          <Col span={4}>    <Typography name="Heading 3/Bold" as="div">
            {currentData?.AverageQuote?.averageProfitMargin}%{' '}
          </Typography>
            <Typography name="Body 4/Regular">PROFIT MARGIN</Typography></Col>
        </Row>
        {/* <Row>
          <Col sm={24} md={14}>
            <Typography name="Body 1/Bold">You've Converted</Typography>
            <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Converted?.vendorQuotes}
                </Typography>
                <Typography name="Body 4/Regular">VENDOR QUOTES</Typography>
              </Col>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Converted?.totalPages}
                </Typography>
                <Typography name="Body 4/Regular">PAGES</Typography>
              </Col>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Converted?.totalLineItems}
                </Typography>
                <Typography name="Body 4/Regular">LINE ITEMS</Typography>
              </Col>
            </Row>
            <br />
            <br />
            <Typography name="Body 1/Bold">You've Quoted</Typography>
            <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Quoted?.totalCustomers}
                </Typography>
                <Typography name="Body 4/Regular">CUSTOMERS</Typography>
              </Col>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  ${abbreviate(currentData?.Quoted?.totalRevenue ?? 0)}{' '}
                </Typography>
                <Typography name="Body 4/Regular">REVENUE</Typography>
              </Col>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {abbreviate(currentData?.Quoted?.grossProfit ?? 0)}{' '}
                </Typography>
                <Typography name="Body 4/Regular">GROSS PROFIT</Typography>
              </Col>
            </Row>
            <br />
            <br />
            <Typography name="Body 1/Bold">You've Earned</Typography>
            <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {currentData?.Earned?.hoursOfTime}{' '}
                </Typography>
                <Typography name="Body 4/Regular">HOURS OF TIME</Typography>
              </Col>
              <Col span={12}>
                <Typography name="Heading 2/Bold" as="div">
                  {abbreviate(currentData?.Earned?.grossProfit ?? 0)}
                </Typography>
                <Typography name="Body 4/Regular">GROSS PROFIT</Typography>
              </Col>
            </Row>
          </Col>
          <Col sm={24} md={10}>
            <Typography name="Body 1/Bold">Average per Quoted</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={averagePerQuoteData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="category" dataKey="name" />
                <YAxis
                  type="number"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" stackId="a" fill="#A0AEC0" />
                <Bar dataKey="profit" stackId="a" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>

            <Row justify={'center'}>
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography name="Heading 3/Bold" as="div">
                  {currentData?.AverageQuote?.averageProfitMargin}%{' '}
                </Typography>
                <Typography name="Body 4/Regular">PROFIT MARGIN</Typography>
              </Col>
            </Row>
          </Col>
        </Row> */}
      </div>

      <Row justify="space-between">
        <Col>
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            Get In Touch
          </Typography>
        </Col>
        <Col>
          <OsButton
            text="Extended Trial Version"
            buttontype="PRIMARY"
            clickHandler={() => {
              setShowTrailModal(true);
            }}
          />
        </Col>
        <Col>
          <OsButton
            text="Download Trial Quotes Files"
            buttontype="PRIMARY"
            clickHandler={() => {
              setShowDownloadFileModal(true);
            }}
          />
        </Col>
        {/* <Col>
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
        </Col> */}
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
              For seamless access to our web application&apos;s premium features and
              exclusive benefits, reach out to our dedicated sales team today.
              Whether you&apos;re seeking enhanced functionality, personalized
              assistance, or specialized packages tailored to your needs, our
              experts are here to guide you through the subscription process.
              Contact us now to elevate your experience and maximize the value
              of our platform.
            </Typography>
          </span>
          <Row justify="space-between" gutter={[16, 16]}>
            {ContactData?.map((ContactDataItem) => (
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
                          color="#575757"
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
                          color="#575757"
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
            ))}
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

      <OsModal
        loading={false}
        body={<FileCard />}
        width={600}
        open={showDownloadFileModal}
        onCancel={() => {
          setShowDownloadFileModal(false);
        }}
        bodyPadding={20} />
      <DailogModal
        loading={licenseLoading}
        title="Extended Trial Version"
        subTitle="Are you sure to enable the extended trial?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        onOk={() => {
          enableTrailVersion();
        }}
        showDailogModal={showTrailModal}
        setShowDailogModal={setShowTrailModal}
      />

    </GlobalLoader>
  );
};

export default Dashboard;
