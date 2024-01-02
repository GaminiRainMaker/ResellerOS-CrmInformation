'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {useState} from 'react';
import AddCustomerInputVale from './addCustomerInput';

interface AddCustomertInterface {
  setShowModal: any;
  setOpen: any;
  open: any;
}

const AddCustomer: React.FC<AddCustomertInterface> = ({setShowModal}) => {
  const [token] = useThemeToken();

  const [formValue, setFormValue] = useState<any>();
  const [customerValue, setCustomerValue] = useState<any>();

  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 0px 10px 0px',
        }}
        gutter={[0, 16]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Add Customer
        </Typography>
      </Row>

      <Space
        size={0}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <AddCustomerInputVale
          setShowModal={setShowModal}
          setFormValue={setFormValue}
          formValue={formValue}
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
        />
      </Space>
    </>
  );
};

export default AddCustomer;
