/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import OsStatusWrapper from '@/app/components/common/os-status';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useState} from 'react';
import {updateQuoteById} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getQuoteLineItemByQuoteId} from '../../../../../redux/actions/quotelineitem';

interface FormDataProps {
  file_name: string;
  opportunity: string;
  customer_name: string;
}

const DrawerContent: FC<any> = ({setOpen}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteLineItemId = searchParams.get('id');

  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [form] = Form.useForm();
  const [drawerData, setDrawerData] = useState<{
    id: number | string;
    createdAt: string;
    status: string;
    formData: FormDataProps;
  }>({
    id: 1,
    createdAt: quoteLineItemByQuoteID?.[0]?.Quote?.createdAt ?? '12/11/2023',
    status: quoteLineItemByQuoteID?.[0]?.Quote?.is_completed
      ? 'Completed'
      : quoteLineItemByQuoteID?.[0]?.Quote?.is_drafted
      ? 'Drafts'
      : 'Recent',
    formData: {
      file_name: quoteLineItemByQuoteID?.[0]?.Quote?.file_name ?? '',
      opportunity: quoteLineItemByQuoteID?.[0]?.Quote?.opportunity ?? '',
      customer_name: quoteLineItemByQuoteID?.[0]?.Quote?.customer_name ?? '',
    },
  });

  const onSubmit = (values: FormDataProps) => {
    console.log('object', values);
    setDrawerData((prev) => ({...prev, formData: values}));
    // dispatch(updateQuoteById());
    // dispatch(getQuoteLineItemByQuoteId(Number(getQuoteLineItemId)));
    setOpen(false);
  };
  return (
    <Space size={24} style={{width: '100%'}} direction="vertical">
      <Row justify="space-between">
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Quote Generate Date
          </Typography>
          {/* <Typography name="Body 2/Regular">12/11/2023</Typography> */}
          <Typography name="Body 2/Regular">
            {' '}
            {drawerData?.createdAt}
          </Typography>
        </Col>
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Status
          </Typography>
          <OsStatusWrapper value={drawerData?.status} />
        </Col>
      </Row>
      <Row>
        <Col style={{width: '100%'}}>
          <Form
            layout="vertical"
            name="wrap"
            wrapperCol={{flex: 1}}
            onFinish={onSubmit}
            form={form}
            initialValues={drawerData?.formData}
          >
            <Form.Item label="File Name" name="file_name">
              <OsInput />
            </Form.Item>

            <Form.Item label="Opportunity" name="opportunity">
              <OsInput />
            </Form.Item>

            <Form.Item label="Customer" name="customer_name">
              <OsInput />
            </Form.Item>

            <Form.Item label=" ">
              <OsButton
                text="Update Changes"
                buttontype="PRIMARY"
                clickHandler={() => form.submit()}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Space>
  );
};

export default DrawerContent;
