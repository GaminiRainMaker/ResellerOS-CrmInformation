/* eslint-disable @typescript-eslint/indent */
import { Row } from '@/app/components/common/antd/Grid';
import AddCustomerInputVale from '@/app/components/common/os-add-customer/AddCustomerInput';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import Typography from '@/app/components/common/typography';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { updateAddress } from '../../../../../redux/actions/address';
import {
    getCustomerBYId,
    queryCustomer,
    updateCustomer,
} from '../../../../../redux/actions/customer';
import { useAppDispatch } from '../../../../../redux/hook';

const EditCustomer: FC<any> = ({
  formValue,
  open,
  setOpen,
  customerValue,
  setFormValue,
  setCustomerValue,
}) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getCustomerID = searchParams.get('id');


  
  const updateCustomerDetails = async () => {
    await dispatch(updateAddress(formValue));
    await dispatch(updateCustomer(customerValue));
    setOpen((p: boolean) => !p);
    if (pathname?.includes('crmInAccount')) {
      dispatch(
        queryCustomer({
          customer: null,
          contact: null,
        }),
      );
    } else {
      dispatch(getCustomerBYId(getCustomerID));
    }
  };

  return (
    <OsDrawer
      title={<Typography name="Body 1/Regular">Customer Details</Typography>}
      placement="right"
      onClose={() => setOpen((p: boolean) => !p)}
      open={open}
      width={450}
      footer={
        <Row style={{width: '100%', float: 'right'}}>
          <OsButton
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="UPDATE"
            clickHandler={updateCustomerDetails}
          />
        </Row>
      }
    >
      <AddCustomerInputVale
        drawer="drawer"
        setShowModal=""
        setFormValue={setFormValue}
        formValue={formValue}
        setCustomerValue={setCustomerValue}
        customerValue={customerValue}
        setOpen={setOpen}
      />
    </OsDrawer>
  );
};

export default EditCustomer;
