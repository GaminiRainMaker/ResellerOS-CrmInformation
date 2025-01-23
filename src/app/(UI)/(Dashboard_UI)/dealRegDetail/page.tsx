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
import {decrypt, encrypt} from '@/app/utils/base';
import {
  addLocatorAndNameForDependentFields,
  dependentFieldProcess,
  processFormData,
  processScript,
} from '@/app/utils/script';
import {PlusIcon} from '@heroicons/react/24/outline';
import {MenuProps, notification} from 'antd';
import Form from 'antd/es/form';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {
  dealRegFormScript,
  getDealRegByOpportunityId,
  updateDealRegStatus,
} from '../../../../../redux/actions/dealReg';
import {getScriptTimer} from '../../../../../redux/actions/generalSetting';
import {
  getSalesForceDealregById,
  getSalesForcePartnerCredentials,
} from '../../../../../redux/actions/salesForce';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  setDealReg,
  setOpenDealRegDrawer,
} from '../../../../../redux/slices/dealReg';
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import DealRegCustomTabs, {DealRegCustomTabsHandle} from './DealRegCustomTabs';
import ElectronBot from './ElectronBot';
import SubmitDealRegForms from './SubmitDealRegForms';

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
  const [isSubmitLoginForm, showIsSubmitLoginForm] = useState(false);
  const searchParams = useSearchParams()!;
  const getOpportunityId = searchParams && searchParams.get('opportunityId');
  const [formData, setFormData] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [salesForceDealregData, setSalesForceDealregData] = useState<any>();
  const {isCanvas, isDecryptedRecord} = useAppSelector((state) => state.canvas);
  const [dealregAppTimer, setDealregAppTimer] = useState<string>('');

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
    dispatch(getScriptTimer('')).then((d: any) => {
      if (d?.payload) {
        setDealregAppTimer(d?.payload?.data);
      }
    });
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
        const finalAppData: any = {
          dealRegId: SubmitDealRegFormData?.id,
          token: salesForceToken,
          baseURL: salesForceinstanceUrl,
          userId: userId,
          partnerId: SubmitDealRegFormData?.partner_id,
          partnerProgramId: SubmitDealRegFormData?.partner_program_id,
        };

        let salesforceData: any = {};
        if (isCanvas) {
          try {
            // Fetch Salesforce deal registration and credentials
            const dealregData: any = await dispatch(
              getSalesForceDealregById(finalAppData),
            );
            const res: any = await dispatch(
              getSalesForcePartnerCredentials(finalAppData),
            );

            if (dealregData?.payload && res?.payload) {
              salesforceData.data = dealregData?.payload?.[0];
              salesforceData.credentials = res?.payload?.data;
              salesforceData.PartnerProgram =
                SubmitDealRegFormData?.PartnerProgram;
            }
          } catch (error) {
            console.error('Error fetching Salesforce data:', error);
          }
        }
        const createScriptData = await createScript(
          isCanvas ? salesforceData : SubmitDealRegFormData,
          isCanvas,
        );
        if (
          createScriptData &&
          (SubmitDealRegFormData?.type === 'registered' ||
            salesforceData?.data?.rosdealregai__Registration_Type__c ===
              'registered')
        ) {
          const scriptEncryption = await encrypt(
            createScriptData as string,
            SECRET_KEY as string,
          );
          const desktopAppData = {
            isCanvas: isCanvas,
            userId: userInformation?.id ?? userId,
            script: JSON.stringify(scriptEncryption),
            scriptTimer: dealregAppTimer,
          };
          const response = await dispatch(dealRegFormScript(desktopAppData));
          if (response) {
            showIsSubmitLoginForm(false);
          }
        } else if (
          SubmitDealRegFormData?.type === 'self_registered' ||
          salesforceData?.data?.rosdealregai__Registration_Type__c ===
            'self_registered'
        ) {
          console.error('Failed to create script data.');
          notification?.open({
            message:
              "Form submitted successfully, but it won't launch as it's a Self Registered form.",
            type: 'info',
          });
          showIsSubmitLoginForm(false);
        }
        if (!isCanvas) {
          try {
            await dispatch(updateDealRegStatus(SubmitDealRegFormData)).then(
              (response: {payload: any}) => {
                if (response?.payload) {
                  dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
                  showIsSubmitLoginForm(false);
                }
              },
            );
          } catch (error) {
            console.error('Error updating deal registration status:', error);
          }
        }
      } catch (error) {
        console.error('Error running script:', error);
      } finally {
        setShowSubmitFormModal(false);
        submitDealRegForm.resetFields();
      }
    }
  };

  const dealRegTabsRef = useRef<DealRegCustomTabsHandle>(null);

  const handleButtonClick = () => {
    // Call the child's onFinish function using the ref
    if (dealRegTabsRef.current) {
      dealRegTabsRef.current.onFinish();
      notification?.open({
        message: 'The form has been saved successfully.',
        type: 'info',
      });
    }
  };

  const createScript = async (dealData: any, isSalesForce: any) => {
    try {
      // Initialize finalMainData with a shallow copy of dealData
      let finalMainData = {...dealData};
      if (isSalesForce) {
        // Process and decrypt unique form data
        const uniqueDataRaw = dealData?.data?.unique_form_data?.replace(
          /^"|"$/g,
          '',
        ); // Remove quotes
        if (uniqueDataRaw) {
          const [uniqueIv, uniqueEncryptedData] = uniqueDataRaw.split(':');
          if (uniqueIv && uniqueEncryptedData) {
            const uniqueDecryptedString = await decrypt(
              uniqueEncryptedData,
              SECRET_KEY as string,
              uniqueIv,
            );
            finalMainData.unique_form_data = JSON.parse(uniqueDecryptedString);
          } else {
            console.error('Invalid unique_form_data format:', uniqueDataRaw);
          }
        } else {
          console.error('unique_form_data is missing or invalid');
        }
      }

      const {PartnerProgram, unique_form_data} = finalMainData;

      if (!PartnerProgram) {
        console.error('PartnerProgram is missing in dealData');
        return null; // Exit early if PartnerProgram is missing
      }

      let finalUniqueData;
      if (unique_form_data) {
        try {
          finalUniqueData = JSON.parse(unique_form_data);
        } catch (error) {
          console.error('Error parsing unique_form_data:', error);
          finalUniqueData = null; // Fallback to null on parsing error
        }
      }

      const template = PartnerProgram?.form_data
        ? JSON.parse(PartnerProgram.form_data)?.[0]?.content
        : null;

      if (PartnerProgram?.PartnerPassword?.password && !isSalesForce) {
        const [iv, encryptedData] =
          PartnerProgram.PartnerPassword.password.split(':');
        if (iv && encryptedData) {
          try {
            finalMainData.password = await decrypt(
              encryptedData,
              SECRET_KEY as string,
              iv,
            );
          } catch (error) {
            console.error('Error decrypting PartnerPassword:', error);
          }
        } else {
          console.error(
            'Invalid PartnerPassword format:',
            PartnerProgram.PartnerPassword.password,
          );
        }
      }
      const newFormData = template
        ? processFormData(template, finalUniqueData)
        : null;
      let updatedData = newFormData
        ? dependentFieldProcess(template, newFormData)
        : null;
      if (updatedData) {
        updatedData = addLocatorAndNameForDependentFields(
          template,
          updatedData,
        );
      }
      const finalData = {
        username: isSalesForce
          ? finalMainData?.credentials?.username
          : PartnerProgram?.PartnerPassword?.username,
        password: isSalesForce
          ? finalMainData?.credentials?.password
          : finalMainData.password,
        data: updatedData,
        script: isSubmitLoginForm
          ? PartnerProgram?.login_script
          : PartnerProgram?.script,
        isLoginStep: PartnerProgram?.login_step,
      };

      // Validation function to check if finalData is complete
      const isFinalDataValid = (data: any) => {
        // List of required fields
        const requiredFields = ['script'];
        // const requiredFields = ['username', 'password', 'data', 'script'];

        // Ensure each required field is present and has a truthy value
        return requiredFields.every((field) => data[field]);
      };

      // Check if finalData is complete before calling processScript
      if (!isFinalDataValid(finalData)) {
        console.log('Final data is incomplete. Skipping processScript.');
        return; // Exit the function if finalData is incomplete
      }
      const processScriptData = processScript(finalData);
      if (processScriptData) {
        return processScriptData;
      }

      return null; // Return null if processScriptData is not generated
    } catch (error) {
      showIsSubmitLoginForm(false);
      console.error('Error in createScript:', error);
      throw error; // Rethrow the error for the caller to handle
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
        loading={isSubmitLoginForm ? false : dealRegLoading}
        thirdLoading={dealRegLoading}
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
        thirdButtonfunction={() => {
          showIsSubmitLoginForm(true);
          submitDealRegForm?.submit();
        }}
        primaryButtonText={'Submit Form'}
        thirdButtonText="Submit Login Form"
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
