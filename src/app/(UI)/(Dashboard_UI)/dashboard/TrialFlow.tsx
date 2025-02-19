import AddQuote from '@/app/components/common/addQuote';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form, Steps} from 'antd';
import {useState} from 'react';
import FileCard from './FileCard';

const TrialFlow = ({trialFlowStep, form, onFinish}: any) => {
  const [uploadFileData, setUploadFileData] = useState<any>([]);

  return (
    <Form
      style={{margin: '12px'}}
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
                label={<Typography name="Body 4/Medium">Full Name</Typography>}
                name={'name'}
                rules={[
                  {
                    required: trialFlowStep === '1' ? true : false,
                    message: 'Name is required!',
                  },
                  {
                    pattern: /^[a-zA-Z0-9 ]*$/,
                    message: 'Special characters are not allowed!',
                  },
                ]}
              >
                <OsInput placeholder="Enter Name" />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Role</Typography>}
                name={'role'}
                rules={[
                  {
                    required: trialFlowStep === '1' ? true : false,
                    message: 'Role is required!',
                  },
                  {
                    pattern: /^[a-zA-Z0-9 ]*$/,
                    message: 'Special characters are not allowed!',
                  },
                ]}
              >
                <OsInput placeholder="Enter Role" />
              </SelectFormItem>
            </Col>
            <Col span={24}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Company</Typography>}
                name={'company'}
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
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Typography name="Body 2/Bold">
                Download Example Quotes
              </Typography>
              <Typography name="Caption Regular">
                Download these sample quotes to see how they work.
              </Typography>
            </Space>
          </Col>
          <Col span={24}>
            <FileCard />
          </Col>
        </Row>
      ) : trialFlowStep === '3' ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Typography name="Body 2/Bold">Watch the Intro Video</Typography>
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
              width="560"
              height="315"
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
        current={Number(trialFlowStep - 1)}
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
  );
};

export default TrialFlow;
