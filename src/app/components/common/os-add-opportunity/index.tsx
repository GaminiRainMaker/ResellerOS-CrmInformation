'use client';

import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import Typography from '@/app/components/common/typography';
import {StageValue} from '@/app/utils/CONSTANTS';
import {useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {
  getAllOpportunity,
  insertOpportunity,
} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {AddOpportunityInterface} from './os-add-opportunity-interface';

const AddOpportunity: React.FC<AddOpportunityInterface> = ({
  formValue,
  setFormValue,
  setShowModal,
  drawer,
  customerValue,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: customerData} = useAppSelector((state) => state.customer);
  const [customerOptions, setCustomerOptions] = useState<any>();
  const [loading, setLoading] = useState(false);

  const addOpportunity = async () => {
    setLoading(true);
    dispatch(insertOpportunity(formValue)).then((d) => {
      if (d?.payload) {
        dispatch(getAllOpportunity());
      }
    });
    setLoading(false);
    setShowModal((p: boolean) => !p);
    setFormValue('');
  };

  useEffect(() => {
    const customerDataArray: any = [];
    if (customerData?.length > 0) {
      // eslint-disable-next-line array-callback-return
      customerData?.map((item: any) => {
        customerDataArray?.push({label: item?.name, value: item?.id});
      });
    }
    setCustomerOptions(customerDataArray);
  }, [customerData]);

  useEffect(() => {
    dispatch(getAllCustomer(''));
  }, []);

  useEffect(() => {
    if (customerValue) {
      setFormValue({
        ...formValue,
        customer_id: customerValue,
      });
    }
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
            Add Opportunity
          </Typography>
        </Row>
      )}

      <Space
        size={18}
        direction="vertical"
        style={{
          width: '100%',
          padding: drawer ? '0px' : '40px',
        }}
      >
        {!customerValue && (
          <>
            <Row>
              <Typography name="Body 4/Regular">
                Select Customer Account
              </Typography>
              <CommonSelect
                placeholder="Select Customer Account"
                style={{width: '100%', marginTop: '5px'}}
                value={formValue?.customer_id}
                options={customerOptions}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    customer_id: e,
                  });
                }}
              />
            </Row>

            <Divider style={{border: '1px solid #C7CDD5'}} />
          </>
        )}

        <Space direction="vertical" style={{width: '100%'}} size={16}>
          <Row>
            <Typography name="Body 4/Regular">Opportunity Title</Typography>
            <OsInput
              placeholder="Opportunity Title"
              value={formValue?.title}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  title: e.target.value,
                });
              }}
            />
          </Row>
          <Row justify="space-between" gutter={[16, 0]}>
            <Col span={12}>
              <Typography name="Body 4/Regular">Amount</Typography>
              <OsInput
                disabled={drawer}
                prefix="$"
                placeholder="$ 00.00"
                value={formValue?.amount}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    amount: e.target.value,
                  });
                }}
              />
            </Col>
            <Col span={12}>
              <Typography name="Body 4/Regular">Stages</Typography>
              <CommonStageSelect
                style={{width: '100%', marginTop: '10px'}}
                options={StageValue}
                currentStage={formValue?.stages}
                onChange={(e: any) => {
                  setFormValue({
                    ...formValue,
                    stages: e,
                  });
                }}
              />
            </Col>
          </Row>
        </Space>

        {!drawer && (
          <Row justify="end">
            <OsButton
              loading={loading}
              disabled={!formValue}
              buttontype={formValue ? 'PRIMARY' : 'PRIMARY_DISABLED'}
              clickHandler={addOpportunity}
              text="Add"
            />{' '}
          </Row>
        )}
      </Space>
    </>
  );
};

export default AddOpportunity;
