'use client';

import {Avatar} from '@/app/components/common/antd/Avatar';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import {Form, Tag} from 'antd';
import {useEffect, useState} from 'react';
import {contactSales} from '../../../../../redux/actions/auth';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import ContactSales from './ContactSales';
import {CustomCardStyle} from './styled-components';
import {fileDataa2, fileDataaJSON} from '@/app/utils/saleforce';

const Dashboard = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const {isSubscribed, loading: cacheFlowLoading} = useAppSelector(
    (state) => state.cacheFLow,
  );
  const {loading} = useAppSelector((state) => state.auth);
  const {userInformation} = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  return (
    <GlobalLoader loading={cacheFlowLoading}>
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
          <Space direction="vertical" size={24}>
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
                        // style={{display: 'flex', flexWrap: 'wrap'}}
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

            <Row justify="space-between">
              <Col>
                <Typography
                  name="Heading 3/Medium"
                  color={token?.colorPrimaryText}
                >
                  Get In Touch
                </Typography>
              </Col>
              <Col>
                <OsButton
                  text="Testing Azure AI"
                  buttontype="PRIMARY"
                  // loading={loading}
                  clickHandler={() => {
                    window?.open('/azzureAi?excel=false');
                  }}
                />
              </Col>
              <Col>
                <OsButton
                  text="Testing Excel"
                  buttontype="PRIMARY"
                  // loading={loading}
                  clickHandler={() => {
                    window?.open('/azzureAi?excel=true');
                  }}
                />
              </Col>
              <Col>
                <OsButton
                  text="Contact Us"
                  buttontype="PRIMARY"
                  // loading={loading}
                  clickHandler={() => {
                    setShowModal(true);
                  }}
                />
              </Col>
            </Row>

            <CustomCardStyle>
              <Space direction="vertical" size={24}>
                <span>
                  <Typography
                    name="Body 1/Bold"
                    color={token?.colorPrimary}
                    as="div"
                  >
                    Contact Sales
                  </Typography>
                  <Typography
                    name="Body 3/Medium"
                    color={token?.colorPrimaryText}
                  >
                    For seamless access to our web application's premium
                    features and exclusive benefits, reach out to our dedicated
                    sales team today. Whether you're seeking enhanced
                    functionality, personalized assistance, or specialized
                    packages tailored to your needs, our experts are here to
                    guide you through the subscription process. Contact us now
                    to elevate your experience and maximize the value of our
                    platform.
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
                          <Typography
                            name="Body 1/Bold"
                            color={token?.colorPrimary}
                          >
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
                          {/* <div style={{border: '1px solid grey'}} /> */}
                        </Space>
                      </Col>
                    );
                  })}
                </Row>
              </Space>
            </CustomCardStyle>
          </Space>
        </>
      )}

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
