/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import { PlusIcon } from '@heroicons/react/24/outline';
import { Form } from 'antd';
import { FC, useEffect, useState } from 'react';
import { insertAddAddress } from '../../../../redux/actions/address';
import {
  getAllbillingContact,
  insertbillingContact,
} from '../../../../redux/actions/billingContact';
import {
  getAllCustomer,
  insertCustomer,
} from '../../../../redux/actions/customer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { setCustomerProfile } from '../../../../redux/slices/customer';
import { Space } from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddCustomer from '../os-add-customer';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import { OsCustomerSelectInterface } from './os-customer-select-interface';


const OsCustomerSelect: FC<OsCustomerSelectInterface> = ({
  setCustomerValue,
  customerValue,
  isAddNewCustomer = false,
  isRequired = true,
  isDisable = false,
  form,
}) => {
  const [token] = useThemeToken();
  const [form1] = Form.useForm();
  const dispatch = useAppDispatch();
  const { data: dataAddress, customerProfile } = useAppSelector(
    (state) => state?.customer,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [customerOptions, setCustomerOptions] = useState<any>();
  const [objectValuesForContact, setObjectValueForContact] = useState<any>();
  const [contactDetail, setContactDetail] = useState<any>();
  const [shipppingAddress, setShippingAddress] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFileds, setErrorFileds] = useState<boolean>(false);
  const [activeKeyForTabs, setActiveKeyForTabs] = useState<any>('1');
  const { userInformation } = useAppSelector((state) => state.user);


  useEffect(() => {
    const customerOptionData =
      dataAddress &&
      dataAddress?.length > 0 &&
      dataAddress?.map((dataAddressItem: any) => ({
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

  const onFinish = async () => {
    const FormData = form1?.getFieldsValue();

    if (activeKeyForTabs < '3') {
      setActiveKeyForTabs((Number(activeKeyForTabs) + 1)?.toString());
      return;
    }
    try {
      setLoading(true);
      await dispatch(
        insertCustomer({ ...FormData, profile_image: customerProfile, user_id: userInformation.id, }),
      ).then((data) => {
        setCustomerOptions([
          ...customerOptions,
          {
            value: data?.payload?.id,
            label: (
              <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
                {FormData?.name}
              </Typography>
            ),
          },
        ]);
        setCustomerValue(data?.payload?.id);
        const newAddressObj: any = {
          ...FormData,
          customer_id: data?.payload?.id,
        };
        const newBillingObject: any = {
          ...objectValuesForContact,
          customer_id: data?.payload?.id,
          billing_email: FormData?.billing_email,
          billing_last_name: FormData?.billing_last_name,
          billing_first_name: FormData?.billing_first_name,
          billing_role: FormData?.billing_role,
          billing_phone: FormData?.billing_phone,
          user_id: userInformation?.id,

        };
        if (newAddressObj) {
          dispatch(insertAddAddress(newAddressObj));
        }
        if (newAddressObj) {
          dispatch(insertbillingContact(newBillingObject)).then(
            (data1: any) => {
              if (data1?.payload) {
                dispatch(getAllCustomer({}));
                dispatch(getAllbillingContact(''));
                form1?.resetFields();
                setOpen(false);
              }
            },
          );
        }
        dispatch(setCustomerProfile(''));
      });
      setLoading(false);
      setActiveKeyForTabs('1');
      form1?.resetFields();
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      form1?.resetFields();
      setOpen(false);
    }
  };

  return (
    <>
      <Form.Item
        label="Customer"
        name="customer_id"
        rules={[{ required: isRequired, message: 'Please Select Customer!' }]}
      >
        <CommonSelect
          placeholder="Select"
          disabled={isDisable}
          allowClear
          style={{ width: '100%' }}
          options={customerOptions}
          // value={customerValue}
          onChange={(value: number) => {
            setCustomerValue && setCustomerValue(value);
          }}
          dropdownRender={(menu) => (
            <>
              {isAddNewCustomer && (
                <Space
                  style={{ cursor: 'pointer' }}
                  size={8}
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{ marginTop: '5px' }}
                  />
                  <Typography
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                    cursor="pointer"
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
            form={form1}
            onFinish={onFinish}
            setActiveKeyForTabs={setActiveKeyForTabs}
            activeKeyForTabs={activeKeyForTabs}
          />
        }
        width={700}
        open={open}
        onCancel={() => {
          setOpen((p) => !p);
          form1?.resetFields();
          setActiveKeyForTabs('1');
        }}
        onOk={form1?.submit}
        primaryButtonText={activeKeyForTabs === '3' ? 'Save' : 'Next'}
        footerPadding={20}
      />
    </>
  );
};

export default OsCustomerSelect;
