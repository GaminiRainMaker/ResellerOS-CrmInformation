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
  getDealRegByOpportunityId,
  getDealRegByPartnerProgramId,
  updateDealRegStatus,
} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  setDealReg,
  setOpenDealRegDrawer,
} from '../../../../../redux/slices/dealReg';
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import DealRegCustomTabs from './DealRegCustomTabs';
import SubmitDealRegForms from './SubmitDealRegForms';
import {runSalesForceBot} from '../../../../../redux/actions/auth';
import {
  lauchPlayWright,
  lauchSalesPlayWright,
} from '../../../../../redux/actions/playwright';
import {decrypt, processScript, transformDataKeys} from '@/app/utils/base';
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

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
  } = useAppSelector((state) => state.dealReg);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitFormModal, setShowSubmitFormModal] = useState(false);
  const searchParams = useSearchParams()!;
  const getOpportunityId = searchParams && searchParams.get('opportunityId');
  const [formData, setFormData] = useState<any>();

  useEffect(() => {
    if (getOpportunityId) {
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
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
      await dispatch(updateDealRegStatus(SubmitDealRegFormData)).then(
        (response) => {
          if (response?.payload) {
            dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
          }
        },
      );
      setShowSubmitFormModal(false);
      submitDealRegForm.resetFields();
    }
  };

  const launchBotSalesForce = async () => {
    try {
      const {PartnerProgram, unique_form_data} = formData;

      const [iv, encryptedData] =
        PartnerProgram?.PartnerPassword?.password?.split(':');
      const decrypted = await decrypt(encryptedData, SECRET_KEY as string, iv);

      const newFormData = transformDataKeys(unique_form_data);
      let finalObj = {
        email: PartnerProgram?.PartnerPassword?.email,
        password: decrypted,
        data: newFormData,
        script: PartnerProgram?.script,
      };
      const processScriptData = processScript(PartnerProgram?.script, finalObj);

      console.log('processScript', processScriptData, 'finalObj', finalObj);

      const response = await dispatch(lauchPlayWright([processScriptData]));
      if (lauchPlayWright.fulfilled.match(response)) {
        console.log('Script executed successfully:', response.payload);
      } else {
        console.error('Error running script:', response.payload);
      }
    } catch (error) {
      console.error('Error running script:', error);
    }
  };
  const lauchSalesPlayBot = async () => {
    try {
      const response = await dispatch(lauchSalesPlayWright([]));
      if (lauchSalesPlayWright.fulfilled.match(response)) {
        console.log('Script executed successfully:', response.payload);
      } else {
        console.error('Error running script:', response.payload);
      }
    } catch (error) {
      console.error('Error running script:', error);
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
              text="Create Salesforce Account"
              buttontype="SECONDARY"
              clickHandler={lauchSalesPlayBot}
            />
            <OsButton
              text="Launch Bot"
              buttontype="SECONDARY"
              clickHandler={launchBotSalesForce}
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
        primaryButtonText={'Save'}
      />
    </div>
  );
};

export default DealRegDetail;
