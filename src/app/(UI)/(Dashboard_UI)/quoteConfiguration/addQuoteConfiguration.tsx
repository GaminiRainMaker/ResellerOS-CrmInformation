/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Typography from '@/app/components/common/typography';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDistributorSelect from '@/app/components/common/os-distributor-select';
import OsInput from '@/app/components/common/os-input';
import OsOemSelect from '@/app/components/common/os-oem-select';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {
  insertQuoteConfiguration,
  updateNanonetsModel,
} from '../../../../../redux/actions/nanonets';
import {useAppDispatch} from '../../../../../redux/hook';

interface CustomerAccountInterface {
  formValue: any;
  setFormValue: any;
  setShowModal: any;
  drawer?: any;
}

const AddQuoteConiguration: React.FC<CustomerAccountInterface> = ({
  formValue,
  setFormValue,
  setShowModal,
  drawer,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [customerValue, setCustomerValue] = useState();

  const addNewQuoteConfiguration = async () => {
    if (formValue?.id) {
      dispatch(updateNanonetsModel(formValue));
      setShowModal((p: boolean) => !p);
    } else {
      dispatch(insertQuoteConfiguration(formValue));
      setShowModal((p: boolean) => !p);
    }
  };

  useEffect(() => {
    setFormValue({
      ...formValue,
      customer_id: customerValue,
    });
  }, [customerValue]);
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
          {formValue?.id ? 'Update' : 'Add'} Quote Configuration
        </Typography>
      </Row>

      <Space
        size={0}
        direction="vertical"
        style={{
          width: '100%',
          padding: drawer ? '20px' : '24px 40px 20px 40px',
          borderRadius: drawer ? '12px' : '',
          background: drawer ? '#F6F7F8' : '',
        }}
      >
        <Form layout="vertical">
          <OsDistributorSelect isAddNewDistributor />
          <OsOemSelect isAddNewOem />
        </Form>
      </Space>
    </>
  );
};

export default AddQuoteConiguration;
