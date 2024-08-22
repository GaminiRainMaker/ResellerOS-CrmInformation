'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {useAppDispatch} from '../../../../../redux/hook';
import {Form} from 'antd';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';

const AddFormula: React.FC<any> = ({drawer, form, onFinish}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();

  return (
    <>
      {!drawer && (
        <Row
          justify="space-between"
          style={{
            padding: '24px 40px 20px 40px',
            backgroundColor: '#F0F4F7',
            borderRadius: '10px 10px 0px 0px',
          }}
          gutter={[0, 16]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Add New Formula
          </Typography>
        </Row>
      )}
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <Space
          size={16}
          direction="vertical"
          style={{width: '100%', padding: drawer ? '' : '24px 40px 20px 40px'}}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={drawer ? 24 : 12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Title</Typography>}
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Title is required!',
                  },
                  // {
                  //   pattern: /^[A-Za-z\s]+$/,
                  //   message: 'Please enter valid text.',
                  // },
                ]}
              >
                <OsInput placeholder="Enter Text" />
              </SelectFormItem>
            </Col>

            <Col sm={24} md={drawer ? 24 : 12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Formula</Typography>}
                name="formula"
                rules={[
                  {
                    required: true,
                    message: 'formula is required!',
                  },
                  // {
                  //   pattern: /^[A-Za-z\s]+$/,
                  //   message: 'Please enter valid text.',
                  // },
                ]}
              >
                <OsInput placeholder="Enter Text" />
              </SelectFormItem>{' '}
            </Col>
            <Col sm={24} md={drawer ? 24 : 12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">Description</Typography>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'description is required!',
                  },
                  // {
                  //   pattern: /^[A-Za-z\s]+$/,
                  //   message: 'Please enter valid text.',
                  // },
                ]}
              >
                <OsInput placeholder="Enter Text" />
              </SelectFormItem>{' '}
            </Col>
            <Col sm={24} md={drawer ? 24 : 12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Active</Typography>}
                name="is_active"
                rules={[
                  {
                    required: true,
                    message: 'formula is required!',
                  },
                  // {
                  //   pattern: /^[A-Za-z\s]+$/,
                  //   message: 'Please enter valid text.',
                  // },
                ]}
              >
                <OsInput placeholder="Enter Text" />
              </SelectFormItem>{' '}
            </Col>
          </Row>
        </Space>
      </Form>
    </>
  );
};

export default AddFormula;
