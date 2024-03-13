'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {Form, FormInstance} from 'antd';
import {insertOEM, queryOEM} from '../../../../../redux/actions/oem';
import {useAppDispatch} from '../../../../../redux/hook';

interface AddOemInterface {
  form?: FormInstance;
  setShowModal?: any;
  distributorValue: number;
}
const AddOem: React.FC<AddOemInterface> = ({
  form,
  setShowModal,
  distributorValue,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();

  const onFinish = async () => {
    const oemValue = form?.getFieldsValue();
    const oemValueObj = {
      distributor_id: distributorValue,
      oem: oemValue?.oem,
    };
    if (oemValue) {
      await dispatch(insertOEM(oemValueObj));
    }
    setShowModal(false);
    form?.resetFields();
    await dispatch(queryOEM({}));
  };
  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 0px 10px 0px',
        }}
        gutter={[0, 0]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Add OEM
        </Typography>
      </Row>

      <Space
        size={0}
        direction="vertical"
        style={{
          width: '100%',
          padding: '24px 40px 20px 40px',
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item name="oem" label="OEM">
            <OsInput placeholder="OEM" />
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};
export default AddOem;
