'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import DealRegCustomTabs from '@/app/components/common/os-custom-tab/DealRegCustomTab';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import Typography from '@/app/components/common/typography';
import {ArrowDownTrayIcon, PlusIcon} from '@heroicons/react/24/outline';
import {MenuProps} from 'antd';
import Form from 'antd/es/form';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  getDealRegByOpportunityId,
  getDealRegByPartnerProgramId,
  updateDealRegById,
} from '../../../../../redux/actions/dealReg';
import {
  getDealRegAddressById,
  updateDealRegAddressById,
} from '../../../../../redux/actions/dealRegAddress';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DealDrawerContent from './DealRegDetailForm/DealRegDrawerContent';
import {setSubmitDealRegData} from '../../../../../redux/slices/dealReg';

const DealRegDetail = () => {
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: DealRegData,
    dealReg,
    dealRegUpdateData,
  } = useAppSelector((state) => state.dealReg);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const getOpportunityId = searchParams.get('opportunityId');
  const getPartnerProgramId = searchParams.get('program_id');

  const [selectedUserId, setSelectedUserId] = useState<any>();
  const [formDataValues, setFormDataValues] = useState<any>();
  const [cartItems, setCartItems] = useState<any>();

  useEffect(() => {
    if (getOpportunityId) {
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    }
    if (getPartnerProgramId) {
      dispatch(getDealRegByPartnerProgramId(Number(getPartnerProgramId)));
    }
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
            router?.push('/dealReg');
          }}
        >
          All Forms
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {DealRegData?.[0]?.Opportunity?.title}
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

  const onFinish = async () => {
    const dealRegNewData = form.getFieldsValue();
    try {
      await Promise.all([
        dispatch(updateDealRegById({...dealRegNewData, id: dealReg?.id})),
        dispatch(
          updateDealRegAddressById({...dealRegNewData, dealRegId: dealReg?.id}),
        ),
      ]);
      // dispatch(getAllDealReg());
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
      dispatch(getDealRegAddressById(dealReg?.id));
      setOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
              clickHandler={() => {
                // dispatch(updateDealRegById(dealRegUpdateData)).then(() => {
                //   // dispatch(getAllDealReg());
                //   dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
                // });
                // dispatch(setSubmitDealRegData((p: boolean) => !p));
                console.log('SECONDARY', form.submit());
              }}
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

      <DealRegCustomTabs
        tabs={DealRegData}
        selectedUserId={selectedUserId}
        form={form}
        setFormDataValues={setFormDataValues}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />

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
              clickHandler={() => form.submit()}
            />
          </Row>
        }
      >
        <DealDrawerContent
          setSelectedUserId={setSelectedUserId}
          form={form}
          onFinish={onFinish}
        />
      </OsDrawer>
    </div>
  );
};

export default DealRegDetail;
