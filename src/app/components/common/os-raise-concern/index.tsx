import {Form, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC} from 'react';
import RaiseConcernImg from '../../../../../public/assets/static/raiseConcern.svg';
import {updateQuoteConcern} from '../../../../../redux/actions/quote';
import {useAppDispatch} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {RaiseConcernInterface} from './os-raise-concern.interface';

const RaiseConcern: FC<RaiseConcernInterface> = ({
  form,
  quoteLineItemExist,
  setShowRaiseConcernModal,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.warning({
      message: 'Please Add Concern!!',
      description:
        'We are here to assist you! Please write your concern regarding this quote to us.',
    });
  };

  const onFinish = () => {
    const concernData = form?.getFieldsValue();
    if (!concernData?.concern_text) {
      openNotificationWithIcon();
    } else {
      const data = {concern: concernData?.concern_text, id: getQuoteID};
      dispatch(updateQuoteConcern(data));
      router?.push(
        `/fileEditor?id=${getQuoteID}&quoteExist=${quoteLineItemExist}`,
      );
      setShowRaiseConcernModal(false);
      form?.resetFields();
    }
  };

  return (
    <div>
      {contextHolder}
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
        onFinish={onFinish}
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
