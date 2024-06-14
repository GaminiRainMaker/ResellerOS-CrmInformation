/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {
  getAllCustomer,
  insertCustomer,
  queryCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsCustomerSelectInterface} from './os-customer-select-interface';
import AddCustomer from '../os-add-customer';
import {insertAddAddress} from '../../../../../redux/actions/address';
import {insertbillingContact} from '../../../../../redux/actions/billingContact';
import {setCustomerProfile} from '../../../../../redux/slices/customer';

const OsCustomerSelect: FC<OsCustomerSelectInterface> = ({
  setCustomerValue,
  customerValue,
  isAddNewCustomer = false,
  isRequired = true,
  isDisable = false,
}) => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const {data: dataAddress, customerProfile} = useAppSelector(
    (state) => state?.customer,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [customerOptions, setCustomerOptions] = useState<any>();
  const [objectValuesForContact, setObjectValueForContact] = useState<any>();
  const [contactDetail, setContactDetail] = useState<any>();
  const [shipppingAddress, setShippingAddress] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

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
  }, [JSON.stringify(dataAddress)]);

  useEffect(() => {
    dispatch(getAllCustomer({}));
  }, []);

  const onFinish = () => {
    const FormData = form.getFieldsValue();
    try {
      setLoading(true);
      dispatch(
        insertCustomer({...FormData, profile_image: customerProfile}),
      ).then((data) => {
        const newAddressObj: any = {
          ...FormData,
          customer_id: data?.payload?.id,
        };
        const newBillingObject: any = {
          ...objectValuesForContact,
          customer_id: data?.payload?.id,
        };
        if (newAddressObj) {
          dispatch(insertAddAddress(newAddressObj));
        }
        if (newAddressObj) {
          dispatch(insertbillingContact(newBillingObject)).then(
            (data1: any) => {
              if (data1?.payload) {
                dispatch(getAllCustomer({}));
                form.resetFields();
                setOpen(false);
              }
            },
          );
        }
        dispatch(setCustomerProfile(''));
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <>
      <Form.Item
        label="Customer"
        name="customer_id"
        rules={[{required: isRequired, message: 'Please Select Customer!'}]}
      >
        <CommonSelect
          disabled={isDisable}
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
        loading={loading}
        body={
          <AddCustomer
            form={form}
            onFinish={onFinish}
            objectValuesForContact={objectValuesForContact}
            setObjectValueForContact={setObjectValueForContact}
            contactDetail={contactDetail}
            setContactDetail={setContactDetail}
            shipppingAddress={shipppingAddress}
            setShippingAddress={setShippingAddress}
          />
        }
        width={700}
        open={open}
        onCancel={() => {
          setOpen((p) => !p);
          form.resetFields();
        }}
        onOk={form.submit}
        primaryButtonText="Save"
        footerPadding={20}
      />
    </>
  );
};

export default OsCustomerSelect;
