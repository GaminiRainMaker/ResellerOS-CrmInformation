import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC} from 'react';

const AddDocument: FC<any> = ({form}) => {
  const [token] = useThemeToken();

  const onFinish = () => {
    console.log('onFinish');
  };
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]} justify="space-between">
        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Document</Typography>}
            name="title"
            rules={[
              {
                required: true,
                message: 'Document is required!',
              },
            ]}
          >
            <CommonSelect
              style={{width: '100%'}}
              placeholder="Select Document"
              allowClear
            />
          </SelectFormItem>
        </Col>

        <Col span={24}>
          <OSDraggerStyle showUploadList={false} multiple>
            <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
            <Typography
              name="Body 4/Medium"
              color={token?.colorPrimaryText}
              as="div"
            >
              <Typography
                name="Body 4/Medium"
                style={{textDecoration: 'underline', cursor: 'pointer'}}
                color={token?.colorPrimary}
                hoverOnText
              >
                Click to Upload
              </Typography>{' '}
              or Drag and Drop
            </Typography>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              XLS, PDF.
            </Typography>
          </OSDraggerStyle>
        </Col>
      </Row>
    </Form>
  );
};

export default AddDocument;
