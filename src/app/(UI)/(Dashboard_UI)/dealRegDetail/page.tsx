'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
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
  dealRegFormScript,
  getDealRegByOpportunityId,
  updateDealRegStatus,
} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  setDealReg,
  setOpenDealRegDrawer,
} from '../../../../../redux/slices/dealReg';
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import DealRegCustomTabs from './DealRegCustomTabs';
import ElectronBot from './ElectronBot';
import SubmitDealRegForms from './SubmitDealRegForms';
import {getSalesForceDealregByOpportunityId} from '../../../../../redux/actions/salesForce';

const DealRegDetail = () => {
  const [getFormData] = Form.useForm();
  const [submitDealRegForm] = Form.useForm();
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: DealRegData,
    loading: dealRegLoading,
    getDealRegForNewLoading,
    finalUpdatedDealRegData,
  } = useAppSelector((state) => state.dealReg);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitFormModal, setShowSubmitFormModal] = useState(false);
  const [electronBotModal, showElectronBotModal] = useState(false);
  const searchParams = useSearchParams()!;
  const getOpportunityId = searchParams && searchParams.get('opportunityId');
  const salesForceUrl = searchParams.get('instance_url');
  const salesForceKey = searchParams.get('key');

  const [formData, setFormData] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [salesForceDealregData, setSalesForceDealregData] = useState<any>();

  useEffect(() => {
    const obj = {
      baseURL: salesForceUrl,
      token: salesForceKey,
      opportunityId: getOpportunityId,
    };
    if (getOpportunityId && salesForceUrl && salesForceKey && obj) {
      dispatch(getSalesForceDealregByOpportunityId(obj)).then((res) => {
        if (res?.payload) {
          setSalesForceDealregData(res?.payload);
        }
      });
    } else if (getOpportunityId) {
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    }
  }, []);

  useEffect(() => {
    dispatch(setDealReg(DealRegData?.[0]));
  }, [DealRegData]);

  const OsBreadCrumbItems = [
    !salesForceUrl && {
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
          {!salesForceUrl
            ? DealRegData?.[0]?.Opportunity?.title
            : salesForceDealregData?.[0]?.opportunity_name}
        </Typography>
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          onClick={() => {
            dispatch(setOpenDealRegDrawer(true));
          }}
          name="Body 3/Regular"
        >
          Edit Form Details
        </Typography>
      ),
    },
  ];

  const submitDealRegFormFun = async () => {
    const SubmitDealRegForm = submitDealRegForm.getFieldsValue();
    const SubmitDealRegFormData = {
      ...SubmitDealRegForm,
      status: 'Submitted',
    };
    if (SubmitDealRegFormData) {
      try {
        const finalAppData = {
          dealRegId: SubmitDealRegFormData?.id,
          userId: userInformation?.id,
        };
        const response = await dispatch(dealRegFormScript(finalAppData));
        if (response) {
          await dispatch(updateDealRegStatus(SubmitDealRegFormData)).then(
            (response: {payload: any}) => {
              if (response?.payload) {
                dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
              }
            },
          );
        }
        console.log('response data', response);
      } catch (error) {
        console.error('Error running script:', error);
      }
      setShowSubmitFormModal(false);
      submitDealRegForm.resetFields();
    }
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <OsBreadCrumb items={OsBreadCrumbItems as any} />
        </Col>
        <Col>
          <Space size={8}>
            <OsButton
              text="Intial Setup"
              buttontype="SECONDARY"
              clickHandler={() => {
                showElectronBotModal(true);
              }}
            />

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
      <GlobalLoader loading={getDealRegForNewLoading}>
        <DealRegCustomTabs
          form={getFormData}
          formData={formData}
          setFormData={setFormData}
        />
      </GlobalLoader>

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
        loading={dealRegLoading}
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
        primaryButtonText={'Submit'}
      />

      <OsModal
        // loading={dealRegLoading}
        title="DealregAI Bot Setup"
        bodyPadding={22}
        body={<ElectronBot />}
        width={583}
        open={electronBotModal}
        // onOk={submitDealRegForm?.submit}
        onCancel={() => {
          showElectronBotModal(false);
        }}
        // primaryButtonText={'Save'}
      />
    </div>
  );
};

export default DealRegDetail;
