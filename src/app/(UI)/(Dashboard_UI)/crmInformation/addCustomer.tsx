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
import {useState} from 'react';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import OsAvatar from '@/app/components/common/os-avatar';
import {ArrowUpCircleIcon} from '@heroicons/react/20/solid';
import {useAppDispatch} from '../../../../../redux/hook';
import AddCustomerInputVale from './addCustomerInput';

const AddCustomer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <div>
          <Typography
            name="Body 4/Regular"
            color={activeTab == 1 ? '#1C3557' : '#666666'}
          >
            Shipping Address
          </Typography>
          <div
            style={{
              border: activeTab == 1 ? '1px solid #1C3557' : '',
              marginTop: '10px',
            }}
          />
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div>
          <Typography
            name="Body 4/Regular"
            color={activeTab == 2 ? '#1C3557' : '#666666'}
          >
            Billing Address
          </Typography>
          <div
            style={{
              border: activeTab == 2 ? '1px solid #1C3557' : '',
              marginTop: '10px',
            }}
          />
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div>
          <Typography
            name="Body 4/Regular"
            color={activeTab == 3 ? '#1C3557' : '#666666'}
          >
            Billing Contact
          </Typography>
          <div
            style={{
              marginTop: '10px',
              border: activeTab == 3 ? '1px solid #1C3557' : '',
            }}
          />
        </div>
      ),
      key: '3',
    },
  ];

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
        style={{width: '100%', padding: '24px 60px 20px 60px'}}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <OsAvatar
              icon={
                <ArrowUpCircleIcon
                  color={token?.colorTextSecondary}
                  width={34}
                />
              }
            />
          </Col>
          <Col>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              Legal Name
            </Typography>
            <OsInput placeholder="Legal name" />
          </Col>
          <Col>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              Default Currency
            </Typography>
            <OsInput placeholder="Default Currency" />
          </Col>
        </Row>
      </Space>

      <div
        style={{
          border: ' 1px solid #C7CDD5',
          marginLeft: '40px',
          marginRight: '40px',
          width: '90%',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      />
      <Space
        size={0}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <Row justify="space-between" align="middle">
          {tabItems?.map((item: any) => (
            <Col style={{width: '30%'}}>
              <Typography
                onClick={() => {
                  setActiveTab(item?.key);
                }}
                name="Heading 3/Medium"
                color={token?.colorPrimaryText}
                align="center"
              >
                {item?.label}
              </Typography>
            </Col>
          ))}
        </Row>
        <AddCustomerInputVale activeTab={activeTab} />
      </Space>
    </>
  );
};

export default AddCustomer;
