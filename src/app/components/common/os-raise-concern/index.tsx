import {Form} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import {FC} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {RaiseConcernInterface} from './os-raise-concern.interface';

const RaiseConcern: FC<RaiseConcernInterface> = ({
  form,
  onClick,
  title,
  description,
  image,
  showTextArea = true,
}) => {
  const [token] = useThemeToken();

  return (
    <div>
      <Space
        direction="vertical"
        size={12}
        style={{width: '100%', textAlign: 'center'}}
      >
        <Image src={image} alt={image} />
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {title}
        </Typography>
        <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
          {description}
        </Typography>
      </Space>
      <br />
      <br />
      {showTextArea && (
        <Form
          onFinish={onClick}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="concern_text"
            label={
              <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
                Concern
              </Typography>
            }
          >
            <TextArea
              placeholder="Write your Concern here!"
              autoSize={{minRows: 3, maxRows: 5}}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default RaiseConcern;