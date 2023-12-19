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
import {Button, MenuProps, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsInput from '@/app/components/common/os-input';
import {SearchOutlined} from '@ant-design/icons';
import {useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from '../generateQuote/UploadFile';

const EditContactModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [editContact, setEditContact] = useState<boolean>(false);
  const router = useRouter();

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
      </Space>
    </>
  );
};

export default EditContactModal;
