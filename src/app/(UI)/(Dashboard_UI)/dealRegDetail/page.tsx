'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import DealRegCustomTabs from '@/app/components/common/os-custom-tab/DealRegCustomTab';
import OsDropdown from '@/app/components/common/os-dropdown';
import Typography from '@/app/components/common/typography';
import {ArrowDownTrayIcon, PlusIcon} from '@heroicons/react/24/outline';
import {MenuProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import OsDrawer from '@/app/components/common/os-drawer';
import {getAllDealReg} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DealDrawerContent from './DealRegDetailForm/DealRegDrawerContent';

const DealRegDetail = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {data: DealRegData} = useAppSelector((state) => state.dealReg);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllDealReg());
  }, []);

  const OsBreadCrumbItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/DealReg');
          }}
        >
          All Forms
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {
            // router?.push(`/generateQuote?id=${getQuoteID}`);
          }}
        >
          Cisco- Impress Technology- Precision
        </Typography>
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography onClick={() => setOpen(true)} name="Body 3/Regular">
          Edit Quote Header
        </Typography>
      ),
    },
    {
      key: '2',
      label: <Typography name="Body 3/Regular">Mark as Complete</Typography>,
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <OsBreadCrumb items={OsBreadCrumbItems} />
        </Col>
        <Col>
          <Space size={8}>
            <OsButton
              text="Save"
              buttontype="SECONDARY"
              clickHandler={() => {}}
            />
            <OsButton
              text="Download"
              buttontype="SECONDARY"
              icon={
                <ArrowDownTrayIcon
                  width={24}
                  height={24}
                  color={token?.colorPrimary}
                />
              }
            />
            <OsButton
              text="Add New Form"
              buttontype="PRIMARY"
              icon={<PlusIcon width={24} />}
            />

            <OsDropdown menu={{items: dropDownItemss}} />
          </Space>
        </Col>
      </Row>
      <DealRegCustomTabs data={DealRegData} />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Form Settings</Typography>}
        placement="right"
        onClose={() => setOpen((p) => !p)}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE CHANGES"
              clickHandler={() => {
                setOpen((p) => !p);
              }}
            />
          </Row>
        }
      >
        <DealDrawerContent />
      </OsDrawer>
    </div>
  );
};

export default DealRegDetail;
