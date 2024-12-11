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
import {useEffect, useRef, useState} from 'react';
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
import DealRegCustomTabs, {DealRegCustomTabsHandle} from './DealRegCustomTabs';
import ElectronBot from './ElectronBot';
import SubmitDealRegForms from './SubmitDealRegForms';
import {
  getSalesForceDealregById,
  getSalesForcePartnerCredentials,
} from '../../../../../redux/actions/salesForce';
import {decrypt, encrypt} from '@/app/utils/base';

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
  const [formData, setFormData] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [salesForceDealregData, setSalesForceDealregData] = useState<any>();
  const {isCanvas, isDecryptedRecord} = useAppSelector((state) => state.canvas);
  // Initialize variables with default values
  let userId: string | undefined;
  let salesForceinstanceUrl: string | undefined;
  let salesForceToken: string | undefined;

  if (isCanvas && isDecryptedRecord) {
    const {userId: decryptedUserId, client} = isDecryptedRecord as any;
    userId = decryptedUserId;
    salesForceinstanceUrl = client?.instanceUrl;
    salesForceToken = client?.oauthToken;
  }
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

  useEffect(() => {
    if (getOpportunityId && !isCanvas) {
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    }
  }, []);

  useEffect(() => {
    dispatch(setDealReg(DealRegData?.[0]));
  }, [DealRegData]);

  const OsBreadCrumbItems = [
    !isCanvas && {
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
          {!isCanvas
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
    const FinalSubmitDealRegForm =
      SubmitDealRegForm && JSON.parse(SubmitDealRegForm?.id);
    const SubmitDealRegFormData = {
      ...FinalSubmitDealRegForm,
      status: 'Submitted',
    };

    if (SubmitDealRegFormData) {
      try {
        let finalAppData: any = {
          dealRegId: SubmitDealRegFormData?.id,
          token: salesForceToken,
          baseURL: salesForceinstanceUrl,
          partnerId: SubmitDealRegFormData?.partner_id,
          partnerProgramId: SubmitDealRegFormData?.partner_program_id,
        };
        let finalAppData123: any = {
          dealRegId: !isCanvas ? SubmitDealRegFormData?.id : '',
          userId: userInformation?.id ?? userId,
          partnerProgramId: SubmitDealRegFormData?.partner_program_id,
          isCanvas: isCanvas,
        };

        if (isCanvas) {
          const dealregData: any = await dispatch(
            getSalesForceDealregById(finalAppData),
          );
          const res: any = await dispatch(
            getSalesForcePartnerCredentials(finalAppData),
          );
          if (dealregData?.payload) {
            finalAppData123.salesforceDealregData = dealregData?.payload?.[0];
          }
          if (res?.payload?.password && res?.payload?.username) {
            const passwordEncryption = await encrypt(
              res.payload.password,
              SECRET_KEY as string,
            );

            const usernameEncryption = await encrypt(
              res.payload.username,
              SECRET_KEY as string,
            );

            finalAppData123.password = `${passwordEncryption.iv}:${passwordEncryption.data}`;
            finalAppData123.username = `${usernameEncryption.iv}:${usernameEncryption.data}`;
          }
        }
        console.log({finalAppData123});
        const response = await dispatch(dealRegFormScript(finalAppData123));
        if (response && !isCanvas) {
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

  const dealRegTabsRef = useRef<DealRegCustomTabsHandle>(null);

  const handleButtonClick = () => {
    // Call the child's onFinish function using the ref
    if (dealRegTabsRef.current) {
      dealRegTabsRef.current.onFinish();
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
            {isCanvas && (
              <OsButton
                text="Save"
                buttontype="SECONDARY"
                clickHandler={() => {
                  handleButtonClick();
                }}
              />
            )}
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
            {!isCanvas && (
              <OsButton
                text="Add New Form"
                buttontype="PRIMARY"
                icon={<PlusIcon width={24} />}
                clickHandler={() => {
                  setShowModal(true);
                }}
              />
            )}
            <OsDropdown menu={{items: dropDownItemss}} />
          </Space>
        </Col>
      </Row>
      <GlobalLoader loading={getDealRegForNewLoading}>
        <DealRegCustomTabs
          form={getFormData}
          formData={formData}
          setFormData={setFormData}
          setSalesForceDealregData={setSalesForceDealregData}
          ref={dealRegTabsRef}
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
