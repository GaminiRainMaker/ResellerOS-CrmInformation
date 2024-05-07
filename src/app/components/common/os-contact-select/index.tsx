/* eslint-disable react/no-unstable-nested-components */
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {getAllbillingContact} from '../../../../../redux/actions/billingContact';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';

const OsContactSelect: FC<any> = ({
  customerValue,
  isAddNewContact = false,
  form,
  value,
  name = 'billing_contact_id',
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: billingContactData} = useAppSelector(
    (state) => state.billingContact,
  );
  const [contactFilterOption, setContactFilterOption] = useState<any>();

  useEffect(() => {
    dispatch(getAllbillingContact(''));
  }, []);

  useEffect(() => {
    form?.resetFields(['opportunity_id', name]);
    const filterUsers = billingContactData?.filter((item: any) =>
      item?.customer_id?.toString()?.includes(customerValue),
    );

    const contactOptions = filterUsers?.map((contact: any) => ({
      value: contact.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {contact.billing_first_name} {contact.billing_last_name}
        </Typography>
      ),
    }));

    setContactFilterOption(contactOptions);
  }, [JSON.stringify(billingContactData), customerValue]);

  return (
    <>
      <Form.Item
        label="Contact"
        name={name}
        rules={[{required: true, message: 'Please Select Contact!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          defaultValue={value}
          style={{width: '100%'}}
          options={contactFilterOption}
        />
      </Form.Item>
    </>
  );
};

export default OsContactSelect;
