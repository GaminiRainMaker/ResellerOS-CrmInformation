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
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import {useEffect, useState} from 'react';
import Form from 'antd/es/form/Form';
import {
  insertbillingContact,
  queryContact,
} from '../../../../../redux/actions/billingContact';
import {useAppDispatch} from '../../../../../redux/hook';

interface CustomerAccountInterface {
  formValue: any;
  setFormValue: any;
  setShowModal: any;
  drawer?: any;
}

const AddContact: React.FC<CustomerAccountInterface> = ({
  formValue,
  setFormValue,
  setShowModal,
  drawer,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [customerValue, setCustomerValue] = useState();

  const addNewContact = async () => {
    dispatch(insertbillingContact(formValue));
    setShowModal((p: boolean) => !p);
  };

  useEffect(() => {
    setFormValue({
      ...formValue,
      customer_id: customerValue,
    });
  }, [customerValue]);

  return (
    <>
      {!drawer && (
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
            Add Contact
          </Typography>
        </Row>
      )}

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
        {!drawer && (
          <>
            <Form layout="vertical" requiredMark={false}>
              <OsCustomerSelect
                setCustomerValue={setCustomerValue}
                customerValue={customerValue}
              />
            </Form>

            <div
              style={{
                border: ' 1px solid #C7CDD5',
                width: '100%',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            />
          </>
        )}

        <Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">First Name</Typography>
              <OsInput
                placeholder="First Name"
                value={formValue?.billing_first_name}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_first_name: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Last Name</Typography>
              <OsInput
                placeholder="Last Name"
                value={formValue?.billing_last_name}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_last_name: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Role</Typography>
            <OsInput
              placeholder="Role"
              value={formValue?.billing_role}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  billing_role: e.target.value,
                });
              }}
            />
          </Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Email</Typography>
            <OsInput
              placeholder="Email"
              value={formValue?.billing_email}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  billing_email: e.target.value,
                });
              }}
            />
          </Row>
        </Row>
        <Row
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          {!drawer && (
            <OsButton
              buttontype="PRIMARY"
              clickHandler={addNewContact}
              text="Add"
            />
          )}
        </Row>
      </Space>
    </>
  );
};

export default AddContact;
