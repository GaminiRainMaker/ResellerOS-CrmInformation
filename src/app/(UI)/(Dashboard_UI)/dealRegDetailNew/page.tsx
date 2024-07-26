'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {MenuProps} from 'antd';
import Form from 'antd/es/form';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  getDealRegByOpportunityId,
  getDealRegByPartnerProgramId,
  updateDealRegById,
} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setDealReg} from '../../../../../redux/slices/dealReg';
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import DealRegCustomTabs from './DealRegCustomTabs';
import DealRegDrawer from './DealRegDrawer';
import SubmitDealRegForms from './SubmitDealRegForms';

const DealRegDetail = () => {
  const [FormData] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const [submitDealRegForm] = Form.useForm();
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: DealRegData,
    dealReg,
    loading: dealRegLoading,
  } = useAppSelector((state) => state.dealReg);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitFormModal, setShowSubmitFormModal] = useState(false);
  const searchParams = useSearchParams();
  const getOpportunityId = searchParams.get('opportunityId');
  const getPartnerProgramId = searchParams.get('program_id');

  useEffect(() => {
    if (getOpportunityId) {
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    }
    if (getPartnerProgramId) {
      dispatch(getDealRegByPartnerProgramId(Number(getPartnerProgramId)));
    }
  }, []);

  useEffect(() => {
    dispatch(setDealReg(DealRegData?.[0]));
  }, [DealRegData]);

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
        <Typography onClick={() => setOpenDrawer(true)} name="Body 3/Regular">
          Edit Form Details
        </Typography>
      ),
    },
  ];

  const onDrawerUpdate = async () => {
    const DrawerData = drawerForm.getFieldsValue();
    const updateValues = {
      id: dealReg?.id,
      customer_id: DrawerData?.customer_id,
      contact_id: DrawerData?.contact_id,
    };
    if (updateValues) {
      await dispatch(updateDealRegById(updateValues)).then((response) => {
        if (response?.payload) {
          dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
        }
      });
      setOpenDrawer(false);
      drawerForm.resetFields();
    }
  };

  const submitDealRegFormFun = async () => {
    const SubmitDealRegForm = submitDealRegForm.getFieldsValue();
    const SubmitDealRegFormData = {
      ...SubmitDealRegForm,
      status: 'completed',
    };
    console.log('SubmitDealRegFormData', SubmitDealRegFormData);
    // if (updateValues) {
    //   await dispatch(updateDealRegById(updateValues)).then((response) => {
    //     if (response?.payload) {
    //       dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    //     }
    //   });
    //   setShowSubmitFormModal(false);
    //   submitDealRegForm.resetFields();
    // }
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
              text="Submit Form"
              buttontype="SECONDARY"
              clickHandler={() => {
                setShowSubmitFormModal(true);
              }}
            />
            <OsButton
              text="Add New Form"
              buttontype="PRIMARY"
              icon={<PlusIcon width={24} />}
              clickHandler={() => {
                setShowModal(true);
              }}
            />

            <OsDropdown menu={{items: dropDownItemss}} />
          </Space>
        </Col>
      </Row>
      <GlobalLoader loading={dealRegLoading}>
        <DealRegCustomTabs form={FormData} />
      </GlobalLoader>

      <OsDrawer
        title={<Typography name="Body 1/Regular">Form Settings</Typography>}
        placement="right"
        onClose={() => {
          setOpenDrawer(false);
          drawerForm.resetFields();
        }}
        open={openDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={drawerForm.submit}
            />
          </Row>
        }
      >
        <DealRegDrawer form={drawerForm} onFinish={onDrawerUpdate} />
      </OsDrawer>

      <OsModal
        loading={dealRegLoading}
        bodyPadding={22}
        body={
          <NewRegistrationForm isDealRegDetail setShowModal={setShowModal} />
        }
        width={583}
        open={showModal}
        onOk={() => {}}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer={false}
      />
      <OsModal
        title="Submit DealReg Forms"
        bodyPadding={22}
        body={
          <SubmitDealRegForms
            form={submitDealRegForm}
            onFinish={submitDealRegFormFun}
          />
        }
        width={583}
        open={showSubmitFormModal}
        onOk={submitDealRegForm?.submit}
        onCancel={() => {
          setShowSubmitFormModal(false);
          submitDealRegForm?.resetFields();
        }}
        primaryButtonText={'Save'}
      />
    </div>
  );
};

export default DealRegDetail;
