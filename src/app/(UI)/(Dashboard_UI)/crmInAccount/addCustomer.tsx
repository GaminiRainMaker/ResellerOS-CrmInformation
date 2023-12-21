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
import {
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsTabs from '@/app/components/common/os-tabs';
import {Checkbox, Divider, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import OsInput from '@/app/components/common/os-input';
import {useEffect, useState} from 'react';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import OsAvatar from '@/app/components/common/os-avatar';
import {ArrowUpCircleIcon} from '@heroicons/react/20/solid';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import {useAppDispatch} from '../../../../../redux/hook';
import AddCustomerInputVale from './addCustomerInput';
import {
  getAllCustomer,
  insertCustomer,
} from '../../../../../redux/actions/customer';
import {
  getAllAddress,
  insertAddAddress,
} from '../../../../../redux/actions/address';
import {insertbillingContact} from '../../../../../redux/actions/billingContact';

interface AddCustomertInterface {
  setShowModal: any;
  setOpen: any;
  open: any;
}

const AddCustomer: React.FC<AddCustomertInterface> = ({
  setShowModal,
  setOpen,
  open,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();

  const router = useRouter();
  const [formValue, setFormValue] = useState<any>();
  const [customerValue, setCustomerValue] = useState<any>();

  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 0px 10px 0px',
        }}
        gutter={[0, 16]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Add Customer
        </Typography>
      </Row>

      <Space
        size={0}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <AddCustomerInputVale
          setShowModal={setShowModal}
          setFormValue={setFormValue}
          formValue={formValue}
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
        />
      </Space>
    </>
  );
};

export default AddCustomer;
