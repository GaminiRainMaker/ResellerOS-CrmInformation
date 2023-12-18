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
              value={formValue?.ship_address_line}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  ship_address_line: e.target.value,
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
                value={formValue?.ship_city}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    ship_city: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">State</Typography>
              <OsInput
                placeholder="State"
                value={formValue?.ship_state}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    ship_state: e.target.value,
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
                value={formValue?.ship_pin}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    ship_pin: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Country</Typography>
              <OsInput
                placeholder="Country"
                value={formValue?.ship_country}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    ship_country: e.target.value,
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
                    bill_address_line: formValue?.ship_address_line,
                    bill_city: formValue?.ship_city,
                    bill_state: formValue?.ship_state,
                    bill_pin: formValue?.ship_pin,
                    bill_country: formValue?.ship_country,
                    bill_preVale: true,
                  });
                } else {
                  setFormValue({
                    ...formValue,
                    bill_address_line: '',
                    bill_city: '',
                    bill_state: '',
                    bill_pin: '',
                    bill_country: '',
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
              value={formValue?.bill_address_line}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  bill_address_line: e.target.value,
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
                value={formValue?.bill_city}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    bill_city: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">State</Typography>
              <OsInput
                placeholder="State"
                value={formValue?.bill_state}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    bill_state: e.target.value,
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
                value={formValue?.bill_pin}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    bill_pin: e.target.value,
                  });
                }}
              />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Country</Typography>
              <OsInput
                placeholder="Country"
                value={formValue?.bill_country}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    bill_country: e.target.value,
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
              <OsInput placeholder="First Name" />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Last Name</Typography>
              <OsInput placeholder="Last Name" />
            </Col>
          </Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Role</Typography>
            <OsInput placeholder="Role" />
          </Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Email</Typography>
            <OsInput placeholder="Email" />
          </Row>
        </Row>
      )}
    </>
  );
};

export default AddCustomerInputVale;
