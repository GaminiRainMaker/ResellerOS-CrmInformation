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
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import {Checkbox} from 'antd';
import {useAppDispatch} from '../../../../../redux/hook';

interface CustomerAccountInterface {
  activeTab: any;
  formValue: any;
  setFormValue: any;
}

const AddCustomerInputVale: React.FC<CustomerAccountInterface> = ({
  activeTab,
  formValue,
  setFormValue,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();

  return (
    <>
      {activeTab == 1 ? (
        <Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Address Line</Typography>
            <OsInput
              placeholder="Address Line"
              value={formValue?.shiping_address_line}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  shiping_address_line: e.target.value,
                });
              }}
            />
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">City</Typography>
              <OsInput
                placeholder="City"
                value={formValue?.shiping_city}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    shiping_city: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">State</Typography>
              <OsInput
                placeholder="State"
                value={formValue?.shiping_state}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    shiping_state: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Pin Code</Typography>
              <OsInput
                placeholder="pin code"
                value={formValue?.shiping_pin_code}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    shiping_pin_code: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Country</Typography>
              <OsInput
                placeholder="Country"
                value={formValue?.shiping_country}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    shiping_country: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
        </Row>
      ) : activeTab == 2 ? (
        <Row>
          <Row style={{marginTop: '20px', marginBottom: '5px'}}>
            <Checkbox
              checked={formValue?.bill_preVale}
              style={{marginRight: '10px'}}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormValue({
                    ...formValue,
                    billing_address_line: formValue?.shiping_address_line,
                    billing_city: formValue?.shiping_city,
                    billing_state: formValue?.shiping_state,
                    billing_pin_code: formValue?.shiping_pin_code,
                    billing_country: formValue?.shiping_country,
                    bill_preVale: true,
                  });
                } else {
                  setFormValue({
                    ...formValue,
                    billing_address_line: '',
                    billing_city: '',
                    billing_state: '',
                    billing_pin_code: '',
                    billing_country: '',
                    bill_preVale: false,
                  });
                }
              }}
            />{' '}
            <Typography name="Body 3/Regular" align="left">
              Same as Shipping Address
            </Typography>
          </Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Address Line</Typography>
            <OsInput
              placeholder="Address Line"
              value={formValue?.billing_address_line}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  billing_address_line: e.target.value,
                });
              }}
            />
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">City</Typography>
              <OsInput
                placeholder="City"
                value={formValue?.billing_city}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_city: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">State</Typography>
              <OsInput
                placeholder="State"
                value={formValue?.billing_state}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_state: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Pin Code</Typography>
              <OsInput
                placeholder="pin code"
                value={formValue?.billing_pin_code}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_pin_code: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Country</Typography>
              <OsInput
                placeholder="Country"
                value={formValue?.billing_country}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_country: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
        </Row>
      ) : (
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
      )}
    </>
  );
};

export default AddCustomerInputVale;
