/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {
  getAllbillingContact,
  insertbillingContact,
} from '../../../../../redux/actions/billingContact';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddContact from '../os-add-contact';
import {OsContactSelectInterface} from '../os-customer-select/os-customer-select-interface';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';

const OsContactSelect: FC<OsContactSelectInterface> = ({
  customerValue,
  isAddNewContact = false,
  form,
  value,
  name = 'billing_contact_id',
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [contactForm] = Form.useForm();
  const {data: billingContactData, loading} = useAppSelector(
    (state) => state.billingContact,
  );
  const [contactFilterOption, setContactFilterOption] = useState<any>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllbillingContact(''));
  }, []);

  useEffect(() => {
    form?.resetFields(['opportunity_id', name]);
    const filterUsers =
      billingContactData &&
      billingContactData?.filter(
        (item: any) => item?.customer_id === customerValue,
      );

    const contactOptions = filterUsers?.map((contact: any) => ({
      value: contact?.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {contact?.billing_first_name} {contact?.billing_last_name}
        </Typography>
      ),
    }));

    setContactFilterOption(contactOptions);
  }, [JSON.stringify(billingContactData), customerValue]);

  const onFinish = () => {
    const FormData = contactForm?.getFieldsValue();
    const finalDAta = {
      ...FormData,
      customer_id: customerValue,
    };
    dispatch(insertbillingContact(finalDAta))?.then((d: any) => {
      if (d?.payload) {
        contactForm.resetFields();
        form?.setFieldValue('billing_contact_id', d?.payload?.id);
        dispatch(getAllbillingContact(''));
        setOpenModal(false);
      }
    });
  };

  return (
    <>
      <Form.Item
        label="Contact"
        name={name}
        rules={[{required: true, message: 'Please Select Contact!'}]}
      >
        <CommonSelect
          placeholder="Select"
          disabled={!customerValue}
          allowClear
          defaultValue={value}
          style={{width: '100%'}}
          options={contactFilterOption}
          dropdownRender={(menu) => (
            <>
              {isAddNewContact && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={5}
                  onClick={() => setOpenModal(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{marginTop: '5px'}}
                  />
                  <Typography
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                    cursor="pointer"
                  >
                    Add Contact
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
          <AddContact
            form={contactForm}
            onFinish={onFinish}
            customerValue={customerValue}
            isDealregForm={isAddNewContact}
          />
        }
        width={700}
        open={openModal}
        onCancel={() => {
          setOpenModal((p) => !p);
          contactForm.resetFields();
        }}
        onOk={contactForm.submit}
        primaryButtonText="Save"
        footerPadding={20}
      />
    </>
  );
};

export default OsContactSelect;
