'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
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
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import DealRegCustomTabs from './DealRegCustomTabs';
import {setDealReg} from '../../../../../redux/slices/dealReg';
import GlobalLoader from '@/app/components/common/os-global-loader';

const DealRegDetail = () => {
  const [CommonFieldForm] = Form.useForm();
  const [UniqueFieldForm] = Form.useForm();
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: DealRegData,
    dealReg,
    dealRegUpdateData,
    loading: dealRegLoading,
  } = useAppSelector((state) => state.dealReg);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  // const updateTheDealReg = async () => {
  //   const newObj = {
  //     ...formDataValues?.[0],
  //     unique_form_data: [
  //       JSON?.stringify(formDataValues?.[0]?.unique_form_data),
  //     ],
  //     common_form_data: [
  //       JSON?.stringify(formDataValues?.[0]?.common_form_data),
  //     ],
  //   };
  //   console.log('newObj', newObj);

  //   // await dispatch(updateDealRegById(newObj));
  //   // if (getOpportunityId) {
  //   //   dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
  //   // }
  //   // if (getPartnerProgramId) {
  //   //   dispatch(getDealRegByPartnerProgramId(Number(getPartnerProgramId)));
  //   // }
  // };

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
          Edit Form Details
        </Typography>
      ),
    },
  ];

  const onFinish1 = () => {
    const commonFieldFormData = CommonFieldForm.getFieldsValue();
    const uniqueFieldFormData = UniqueFieldForm.getFieldsValue();
    const commonData =
      Object.keys(commonFieldFormData).length > 0
        ? [JSON.stringify(commonFieldFormData)]
        : dealReg?.common_form_data;

    const uniqueData =
      Object.keys(uniqueFieldFormData).length > 0
        ? [JSON.stringify(uniqueFieldFormData)]
        : dealReg?.unique_form_data;

    const obj = {
      common_form_data: commonData,
      unique_form_data: uniqueData,
      id: dealReg?.id,
    };

    if (obj) {
      dispatch(updateDealRegById(obj)).then((response) => {
        if (response?.payload) {
          dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
        }
      });
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
              loading={dealRegLoading}
              text="Save"
              buttontype="SECONDARY"
              clickHandler={onFinish1}
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
        <DealRegCustomTabs
          CommonFieldForm={CommonFieldForm}
          UniqueFieldForm={UniqueFieldForm}
        />
      </GlobalLoader>

      {/* <DealRegCustomTabs
        tabs={DealRegData}
        selectedUserId={selectedUserId}
        form={form}
        activeKey={activeKey}
        setFormDataValues={setFormDataValues}
        setCartItems={setCartItems}
        cartItems={cartItems}
        setActiveKey={setActiveKey}
        formDataValues={formDataValues}
      /> */}

      {/* <OsDrawer
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
              text="Update Changes"
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
      </OsDrawer> */}

      <OsModal
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
    </div>
  );
};

export default DealRegDetail;
