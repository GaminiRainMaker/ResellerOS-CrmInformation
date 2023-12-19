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
  CheckBadgeIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {PopConfirm} from '@/app/components/common/antd/PopConfirm';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {Button, Checkbox, MenuProps, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsInput from '@/app/components/common/os-input';
import {useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import OsAvatar from '@/app/components/common/os-avatar';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import {CheckCircleOutlined, MailOutlined} from '@ant-design/icons';
import {CheckCircleIcon} from '@heroicons/react/24/solid';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from '../generateQuote/UploadFile';

const EditContactModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [editContact, setEditContact] = useState<boolean>(false);
  const router = useRouter();

  const Quotecolumns = [
    {
      primary: 'Billie John',
      secondary: 'Sr. Project Manager',
      fallIconText: 'BJ',
      iconBg: '#1EB159',
      mailText: 'billiejohn@info.com',
      secondCol: <CheckCircleOutlined style={{color: '#1EB159'}} />,
    },
    {
      primary: 'Steve Smith',
      secondary: 'Content Writer',
      fallIconText: 'SS',
      iconBg: '#2364AA',
      mailText: 'stevesmith@info.com',
      secondCol: '',
    },
    {
      primary: 'Kim Blake',
      secondary: 'Graphic Designer',
      fallIconText: 'KB',
      iconBg: '#EB445A',
      mailText: 'kimblake@info.com',
      secondCol: '',
    },
    {
      primary: 'Marie Watson',
      secondary: 'Developer',
      fallIconText: 'MW',
      iconBg: '#ECB816',
      mailText: 'mariewatson@info.com',
      secondCol: '',
    },
    {
      primary: 'Bryan Roller',
      secondary: 'Sr. Developer',
      fallIconText: 'BR',
      iconBg: '#457B9D',
      mailText: 'bryanroller@info.com',
      secondCol: '',
    },
  ];

  return (
    <>
      <Space
        size={4}
        direction="vertical"
        style={{width: '100%', padding: '20px 40px 20px 40px'}}
      >
        {' '}
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Contacts
            </Typography>
          </Col>
          <Col>
            {!editContact ? (
              <OsButton
                buttontype="PRIMARY"
                text="Edit Billing Conatct"
                clickHandler={() => setEditContact(true)}
              />
            ) : (
              <OsButton
                buttontype="PRIMARY"
                text="Save"
                clickHandler={() => setEditContact(false)}
              />
            )}
          </Col>
        </Row>
        <Row style={{display: 'flex'}}>
          {Quotecolumns?.map((item: any, index: number) => (
            <Col key={index}>
              <Row
                style={{
                  background: '#F6F7F8',
                  padding: '12px',
                  borderRadius: '12px',
                  width: '333px',
                  margin: '12px',
                }}
                justify="space-between"
              >
                <Col>
                  <Space direction="vertical" size={12}>
                    <TableNameColumn
                      primaryText={
                        <Typography name="Body 3/Regular">
                          {item?.primary}
                        </Typography>
                      }
                      secondaryText={
                        <Typography name="Body 4/Regular">
                          {item?.secondary}
                        </Typography>
                      }
                      fallbackIcon={item?.fallIconText}
                      iconBg={item?.iconBg}
                    />
                    <Typography name="Body 4/Regular">
                      {' '}
                      <MailOutlined size={24} style={{marginRight: '5px'}} />
                      {item?.mailText}
                    </Typography>
                  </Space>
                </Col>
                <Col>
                  {' '}
                  <Row justify="center" align="middle" style={{height: '100%'}}>
                    {editContact ? (
                      <Checkbox />
                    ) : (
                      <>
                        {item?.secondCol && (
                          <AvatarStyled
                            background="none"
                            icon={item?.secondCol}
                          />
                        )}
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Space>
    </>
  );
};

export default EditContactModal;
