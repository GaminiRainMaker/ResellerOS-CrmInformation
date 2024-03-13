'use client';

import Typography from '@/app/components/common/typography';
import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import {Form, FormInstance} from 'antd';
import {
  insertDistributor,
  queryDistributor,
} from '../../../../../redux/actions/distributor';
import {useAppDispatch} from '../../../../../redux/hook';

interface AddDistributorInterface {
  form?: FormInstance;
  setShowModal?: any;
}
const queryParams: any = {
  distributor: null,
};

const AddDistributor: React.FC<AddDistributorInterface> = ({
  form,
  setShowModal,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const onFinish = () => {
    const distributorValue = form?.getFieldValue('distributor');
    if (distributorValue) {
      dispatch(insertDistributor({distributor: distributorValue})).then((d) => {
        if (d?.payload) {
          dispatch(queryDistributor({}));
        }
      });
    }
    setShowModal(false);
    form?.resetFields();
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
          Add Distributor
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
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="distributor" label="Distributor">
            <OsInput placeholder="Distributer" />
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};
export default AddDistributor;
