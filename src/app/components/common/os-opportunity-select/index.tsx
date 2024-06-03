/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {
  getAllOpportunity,
  insertOpportunity,
} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddOpportunity from '../os-add-opportunity';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsOpportunitySelectInterface} from './os-opportunity-select-interface';

const OsOpportunitySelect: FC<OsOpportunitySelectInterface> = ({
  customerValue,
  isAddNewOpportunity = false,
  form,
  value,
  isRequired = true,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: opportunityData, loading} = useAppSelector(
    (state) => state.Opportunity,
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [opportunityFilterOption, setOpportunityFilterOption] = useState<any>();
  const [opportunityNewValue, setOpportunityNewValue] = useState<number>();
  const [form1] = Form.useForm();

  useEffect(() => {
    dispatch(getAllOpportunity());
  }, []);

  useEffect(() => {
    form?.resetFields(['opportunity_id', 'contact_id']);
    const filterUsers = opportunityData?.filter((item: any) =>
      item?.customer_id?.toString()?.includes(customerValue),
    );

    const opportunityOptions = filterUsers?.map((opportunity: any) => ({
      value: opportunity.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {opportunity.title}
        </Typography>
      ),
    }));

    setOpportunityFilterOption(opportunityOptions);
  }, [JSON.stringify(opportunityData), customerValue]);

  const onFinish = () => {
    const FormDAta = form1.getFieldsValue();
    const finalData = {
      ...FormDAta,
      customer_id: customerValue,
    };
    dispatch(insertOpportunity(finalData)).then((d: any) => {
      if (d?.payload) {
        dispatch(getAllOpportunity());
        setShowModal(false);
        form1.resetFields();
        setOpportunityNewValue(d?.payload?.id);
      }
    });
  };

  return (
    <>
      <Form.Item
        label="Opportunity"
        name="opportunity_id"
        rules={[{required: isRequired, message: 'Please Select Opportunity!'}]}
      >
        <CommonSelect
          placeholder="Select"
          disabled={!customerValue}
          allowClear
          defaultValue={value ?? opportunityNewValue}
          style={{width: '100%'}}
          options={opportunityFilterOption}
          dropdownRender={(menu) => (
            <>
              {isAddNewOpportunity && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setShowModal(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{marginTop: '5px'}}
                  />
                  <Typography
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                  >
                    Add Opportunity
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </Form.Item>

      <OsModal
        loading={loading}
        body={
          <AddOpportunity
            form={form1}
            onFinish={onFinish}
            customerValue={customerValue}
            showCustomerSelect
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form1.resetFields();
        }}
        onOk={form1.submit}
        primaryButtonText="Save"
        footerPadding={30}
      />
    </>
  );
};

export default OsOpportunitySelect;
