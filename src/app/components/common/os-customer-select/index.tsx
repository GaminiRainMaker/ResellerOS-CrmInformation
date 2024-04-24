/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddCustomer from '../os-add-customer';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsCustomerSelectInterface} from './os-customer-select-interface';

const OsCustomerSelect: FC<OsCustomerSelectInterface> = ({
  setCustomerValue,
  customerValue,
  isAddNewCustomer = false,
  isRequired = true,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: dataAddress} = useAppSelector((state) => state?.customer);
  const [open, setOpen] = useState<boolean>(false);
  const [customerOptions, setCustomerOptions] = useState<any>();

  useEffect(() => {
    const customerOptionData = dataAddress?.map((dataAddressItem: any) => ({
      value: dataAddressItem?.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {dataAddressItem?.name}
        </Typography>
      ),
    }));
    setCustomerOptions(customerOptionData);
  }, [dataAddress]);

  useEffect(() => {
    dispatch(getAllCustomer({}));
  }, []);

  return (
    <>
      <Form.Item
        label="Customer"
        name="customer_id"
        rules={[{required: isRequired, message: 'Please Select Customer!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%'}}
          options={customerOptions}
          value={customerValue}
          onChange={(value: number) => {
            setCustomerValue && setCustomerValue(value);
          }}
          dropdownRender={(menu) => (
            <>
              {isAddNewCustomer && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setOpen(true)}
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
                    Add Customer Account
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </Form.Item>

      <OsModal
        body={<AddCustomer setShowModal={setOpen} />}
        width={800}
        open={open}
        onCancel={() => {
          setOpen((p) => !p);
        }}
      />
    </>
  );
};

export default OsCustomerSelect;
