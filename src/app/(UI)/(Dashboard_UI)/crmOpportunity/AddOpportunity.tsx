'use client';

import Typography from '@/app/components/common/typography';
import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';

interface AddOpportunityInterface {
  formValue: any;
  setFormValue: any;
  setShowModal: any;
  tableData: any;
  drawer?: any;
}

const AddOpportunity: React.FC<AddOpportunityInterface> = ({
  formValue,
  setFormValue,
  setShowModal,
  tableData,
  drawer,
}) => {
  const [token] = useThemeToken();

  const addOpportunity = async () => {
    // dispatch(insertbillingContact(formValue));
    setShowModal((p: boolean) => !p);
  };

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
          padding: drawer ? '0px' :'40px',
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
            disabled
            buttontype="PRIMARY_DISABLED"
            clickHandler={addOpportunity}
            text="Add"
          />
        </Row>
      </Space>
    </>
  );
};

export default AddOpportunity;
