import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {FC} from 'react';

const AddPartnerProgramScript: FC<any> = ({form, onFinish, loginScript}) => {
  const [token] = useThemeToken();
  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please write the script',
          },
        ]}
        name={loginScript ? 'login_script' : 'script'}
        label={
          <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
            Automation Script
          </Typography>
        }
      >
        <TextArea
          placeholder="Write your script here!"
          autoSize={{minRows: 4, maxRows: 8}}
        />
      </Form.Item>
    </Form>
  );
};

export default AddPartnerProgramScript;
