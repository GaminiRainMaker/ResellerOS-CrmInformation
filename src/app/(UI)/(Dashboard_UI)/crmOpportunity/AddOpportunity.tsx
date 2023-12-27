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

import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import {insertbillingContact} from '../../../../../redux/actions/billingContact';
import {useAppDispatch} from '../../../../../redux/hook';

interface AddOpportunityInterface {
  formValue: any;
  setFormValue: any;
  setShowModal: any;
  tableData: any;
  drawer?: any;
  open?: any;
  setOpen?: any;
}

const AddOpportunity: React.FC<AddOpportunityInterface> = ({
  formValue,
  setFormValue,
  setShowModal,
  tableData,
  drawer,
  open,
  setOpen,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const addNewContact = async () => {
    dispatch(insertbillingContact(formValue));
    setShowModal((p) => !p);
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
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Add Opportunity
        </Typography>
      </Row>

      <Space
        size={18}
        direction="vertical"
        style={{
          width: '100%',
          padding: '40px',
        }}
      >
        <Row>
          <Typography name="Body 4/Regular">Select Customer Account</Typography>
          <CommonSelect
            placeholder="Select Customer Account"
            style={{width: '100%', marginTop: '5px'}}
            value={formValue?.customer_id}
            options={tableData}
            onChange={(e) => {
              setFormValue({
                ...formValue,
                customer_id: e,
              });
            }}
          />
        </Row>

        <Divider style={{border: '1px solid #C7CDD5'}} />

        <Space direction="vertical" style={{width: '100%'}} size={16}>
          <Row>
            <Typography name="Body 4/Regular">Opportunity Title</Typography>
            <OsInput
              placeholder="Opportunity Title"
              value={formValue?.billing_role}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  billing_role: e.target.value,
                });
              }}
            />
          </Row>
          <Row justify="space-between" gutter={[16, 0]}>
            <Col span={12}>
              <Typography name="Body 4/Regular">Amount</Typography>
              <OsInput
                placeholder="$ 00.00"
                value={formValue?.billing_first_name}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_first_name: e.target.value,
                  });
                }}
              />
            </Col>
            <Col span={12}>
              <Typography name="Body 4/Regular">Stages</Typography>
              <OsInput
                placeholder="Select Stage"
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
        </Space>

        <Row justify="end">
          <OsButton
            buttontype="PRIMARY"
            clickHandler={addNewContact}
            text="Add"
          />
        </Row>
      </Space>
    </>
  );
};

export default AddOpportunity;
