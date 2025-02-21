'use client';

import AddQuote from '@/app/components/common/addQuote';
import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import { SelectFormItem } from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import { Form, Steps } from 'antd';
import { useState } from 'react';
import { insertCompany } from '../../../../../redux/actions/company';
import { updateUserById } from '../../../../../redux/actions/user';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import FileCard from './FileCard';

const TrialFlow = () => {
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [trialFlowStep, setTrialFlowStep] = useState<string>('1');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { userInformation } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      setLoading(true);
      if (trialFlowStep === '1') {
        const trialFormValue = form.getFieldsValue();
        if (trialFormValue && Object.keys(trialFormValue).length > 0) {
          const finalUpdateUserData = {
            id: userInformation?.id,
            first_name: trialFormValue?.first_name,
            last_name: trialFormValue?.last_name,
            job_title: trialFormValue?.job_title,
          };
          const finalCompanyData = {
            user_id: userInformation?.id,
            company_name: trialFormValue?.company_name,
          };

          await Promise.all([
            dispatch(updateUserById(finalUpdateUserData)),
            dispatch(insertCompany(finalCompanyData)),
          ]);
        } else {
          console.error('Form values are empty or undefined.');
        }
      }

      // Update trial step safely
      setTrialFlowStep((prevStep) => {
        const nextStep =
          Number(prevStep) < 4 ? String(Number(prevStep) + 1) : prevStep;
        return nextStep;
      });
    } catch (error) {
      console.error('Error in onFinish:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '24px' }}>
      <Form
        style={{ margin: '12px' }}
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        {trialFlowStep === '1' ? (
          <>
            <Space direction="vertical" size={0}>
              <Typography name="Body 2/Bold">Complete My Profile</Typography>
              <Typography name="Caption Regular">
                Update your profile details to get started.
              </Typography>
            </Space>
            <br />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">First Name</Typography>
                  }
                  name={'first_name'}
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9 ]*$/,
                      message: 'Special characters are not allowed!',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter First Name" />
                </SelectFormItem>
              </Col>
              <Col span={12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">Last Name</Typography>
                  }
                  name={'last_name'}
                  rules={[
                    {
                      required: trialFlowStep === '1' ? true : false,
                      message: 'Last Name is required!',
                    },
                    {
                      pattern: /^[a-zA-Z0-9 ]*$/,
                      message: 'Special characters are not allowed!',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter Last Name" />
                </SelectFormItem>
              </Col>
              <Col span={12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">Job Title</Typography>
                  }
                  name={'job_title'}
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9 ]*$/,
                      message: 'Special characters are not allowed!',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter Job Title" />
                </SelectFormItem>
              </Col>
              <Col span={12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Company</Typography>}
                  name={'company_name'}
                  rules={[
                    {
                      required: trialFlowStep === '1' ? true : false,
                      message: 'Company is required!',
                    },
                    {
                      pattern: /^[a-zA-Z0-9 ]*$/,
                      message: 'Special characters are not allowed!',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter Company" />
                </SelectFormItem>
              </Col>
            </Row>
          </>
        ) : trialFlowStep === '2' ? (
          <FileCard />
        ) : trialFlowStep === '3' ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <Typography name="Body 2/Bold">
                  Watch the Intro Video
                </Typography>
                <Typography name="Caption Regular">
                  Learn how to use the platform in this quick tutorial.
                </Typography>
              </Space>
            </Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              span={24}
            >
              <iframe
                width="70%"
                height="515"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
          </Row>
        ) : (
          <>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <Typography name="Body 2/Bold">Try It! </Typography>
                <Typography name="Caption Regular">
                  Upload your first quote and start using the platform.
                </Typography>
              </Space>
            </Col>

            <AddQuote
              uploadFileData={uploadFileData}
              setUploadFileData={setUploadFileData}
              loading={false}
              buttonText="Add Quote"
              isTrialModal
            />
          </>
        )}
        <br />
        <Steps
          current={Number(trialFlowStep) - 1}
          labelPlacement="vertical"
          items={[
            {
              title: (
                <p
                  style={{
                    lineHeight: '20px',
                    fontFamily: 'var(--font-jakarta-sans)',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Complete My Profile
                </p>
              ),
            },
            {
              title: (
                <p
                  style={{
                    lineHeight: '20px',
                    fontFamily: 'var(--font-jakarta-sans)',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Download Example Quotes
                </p>
              ),
            },
            {
              title: (
                <p
                  style={{
                    lineHeight: '20px',
                    fontFamily: 'var(--font-jakarta-sans)',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Watch the Intro Video
                </p>
              ),
            },
            {
              title: (
                <p
                  style={{
                    lineHeight: '20px',
                    fontFamily: 'var(--font-jakarta-sans)',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Try It!
                </p>
              ),
            },
          ]}
        />
      </Form>
      <Row justify={'end'}>
        <Col>
          <Space>
            {trialFlowStep !== '1' && (
              <OsButton
                text={'Back'}
                buttontype="SECONDARY"
                clickHandler={() => {
                  setTrialFlowStep((prevStep) => {
                    const nextStep =
                      Number(prevStep) > 1
                        ? String(Number(prevStep) - 1)
                        : prevStep;
                    return nextStep;
                  });
                }}
              />
            )}
            {String(trialFlowStep) === '4' ? (
              ''
            ) : (
              <OsButton
                loading={String(trialFlowStep) === '1' ? loading : false}
                text={String(trialFlowStep) === '1' ? 'Save & Next' : 'Next'}
                buttontype="PRIMARY"
                clickHandler={() => {
                  form.submit();
                }}
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default TrialFlow;
