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

const AddCustomerInputVale: React.FC = ({activeTab}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();

  return (
    <>
      {activeTab == 1 ? (
        <Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Address Line</Typography>
            <OsInput placeholder="Address Line" />
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Address Line</Typography>
              <OsInput placeholder="Address Line" />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">State</Typography>
              <OsInput placeholder="State" />
            </Col>
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Pin Code</Typography>
              <OsInput placeholder="pin code" />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Country</Typography>
              <OsInput placeholder="Country" />
            </Col>
          </Row>
        </Row>
      ) : activeTab == 2 ? (
        <Row>
          <Row style={{marginTop: '20px', marginBottom: '5px'}}>
            <Checkbox style={{marginRight: '10px'}} />{' '}
            <Typography name="Body 3/Regular" align="left">
              Same as Shipping Address
            </Typography>
          </Row>
          <Row style={{marginTop: '20px', width: '100%'}}>
            <Typography name="Body 4/Regular">Address Line</Typography>
            <OsInput placeholder="Address Line" />
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Address Line</Typography>
              <OsInput placeholder="Address Line" />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">State</Typography>
              <OsInput placeholder="State" />
            </Col>
          </Row>
          <Row
            style={{marginTop: '20px', width: '100%'}}
            justify="space-between"
          >
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Pin Code</Typography>
              <OsInput placeholder="pin code" />
            </Col>
            <Col style={{width: '47%'}}>
              <Typography name="Body 4/Regular">Country</Typography>
              <OsInput placeholder="Country" />
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
