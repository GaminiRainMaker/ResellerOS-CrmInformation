/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import DealRegCustomTabs from '@/app/components/common/os-custom-tab/DealRegCustomTab';
import OsDrawer from '@/app/components/common/os-drawer';
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
import {
  getDealRegAddressById,
  updateDealRegAddressById,
} from '../../../../../redux/actions/dealRegAddress';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import NewRegistrationForm from '../dealReg/NewRegistrationForm';
import DealDrawerContent from './DealRegDetailForm/DealRegDrawerContent';

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
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const [activeKey, setActiveKey] = useState('');
  const getOpportunityId = searchParams.get('opportunityId');
  const getPartnerProgramId = searchParams.get('program_id');

  const [selectedUserId, setSelectedUserId] = useState<any>();
  const [formDataValues, setFormDataValues] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);

  useEffect(() => {
    if (getOpportunityId) {
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    }
    if (getPartnerProgramId) {
      dispatch(getDealRegByPartnerProgramId(Number(getPartnerProgramId)));
    }
  }, []);
  const updateTheDealReg = async () => {
    const newObj = {
      ...formDataValues?.[0],
      unique_form_data: [
        JSON?.stringify(formDataValues?.[0]?.unique_form_data),
      ],
      common_form_data: [
        JSON?.stringify(formDataValues?.[0]?.common_form_data),
      ],
    };
    console.log('newObj', newObj);

    // await dispatch(updateDealRegById(newObj));
    // if (getOpportunityId) {
    //   dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
    // }
    // if (getPartnerProgramId) {
    //   dispatch(getDealRegByPartnerProgramId(Number(getPartnerProgramId)));
    // }
  };
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

  useEffect(() => {
    if (!activeKey) {
      const finalArr = [];
      if (DealRegData?.length > 0) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const program_id = DealRegData[0]?.partner_program_id;
        setActiveKey(program_id as string);
        for (let i = 0; i < DealRegData.length; i++) {
          const newObj = {...DealRegData?.[i]};

          newObj.unique_form_data = DealRegData?.[i]?.unique_form_data
            ? JSON?.parse(DealRegData?.[i]?.unique_form_data)
            : [];

          newObj.common_form_data = DealRegData?.[i]?.common_form_data
            ? JSON?.parse(DealRegData?.[i]?.common_form_data)
            : {};
          finalArr.push(newObj);
        }
        setFormDataValues(finalArr);
      }
    }
  }, [DealRegData]);

  useEffect(() => {
    if (cartItems) {
      const newArr = [...formDataValues];
      const index = newArr.findIndex(
        (item: any) => item.partner_program_id === activeKey,
      );

      if (index > -1) {
        const obj = {...newArr[index]};
        obj.unique_form_data = cartItems;
        newArr[index] = obj;

        setFormDataValues(newArr);
      }
    }
  }, [cartItems]);

  const onFinish = async () => {
    const dealRegNewData = form.getFieldsValue();
    try {
      await Promise.all([
        dispatch(updateDealRegById({...dealRegNewData, id: dealReg?.id})),
        dispatch(
          updateDealRegAddressById({...dealRegNewData, dealRegId: dealReg?.id}),
        ),
      ]);
      dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
      dispatch(getDealRegAddressById(dealReg?.id));
      setOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(
    'DealregData',
    DealRegData,
    selectedUserId,
    activeKey,
    cartItems,
    formDataValues,
  );

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
              clickHandler={updateTheDealReg}
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

      <DealRegCustomTabs
        tabs={DealRegData}
        selectedUserId={selectedUserId}
        form={form}
        activeKey={activeKey}
        setFormDataValues={setFormDataValues}
        setCartItems={setCartItems}
        cartItems={cartItems}
        setActiveKey={setActiveKey}
        formDataValues={formDataValues}
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
      </OsDrawer>

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
