import {Form} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import {FC} from 'react';
import RaiseConcernImg from '../../../../../public/assets/static/raiseConcern.svg';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {RaiseConcernInterface} from './os-raise-concern.interface';

const RaiseConcern: FC<RaiseConcernInterface> = ({form, onClick}) => {
  const [token] = useThemeToken();

  return (
    <div>
      <Space
        direction="vertical"
        size={12}
        style={{width: '100%', textAlign: 'center'}}
      >
        <Image src={RaiseConcernImg} alt="RaiseConcernImg" />
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          Raise Your Concern
        </Typography>
        <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
          We are here to assist you ! Please write your concern regarding this
          quote <br />
          to us. Also, you can update the quote manually.
        </Typography>
      </Space>
      <br />
      <br />
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
    </div>
  );
};

export default RaiseConcern;
