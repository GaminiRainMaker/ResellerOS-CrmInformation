/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {partnerProgramFilter} from '@/app/utils/base';
import {getAssignPartnerProgramByOrganization} from '../../../../../redux/actions/assignPartnerProgram';
import {getAllPartnerandProgram} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setPartnerRequestData} from '../../../../../redux/slices/partner';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddPartner from '../os-add-partner';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';

const OsPartnerSelect: FC<{
  // form: FormInstance;
  name?: string;
  setPartnerValue?: any;
  partnerProgramName?: string;
  isRequired?: boolean;
  isSuperAdmin?: boolean;
  isAddNewPartner?: boolean;
  notApprovedData?: boolean;
  form?: any;
}> = ({
  name = 'partner',
  setPartnerValue,
  // form,
  partnerProgramName,
  isRequired = false,
  isSuperAdmin = true,
  isAddNewPartner = false,
  notApprovedData = false,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: AssignPartnerProgramData} = useAppSelector(
    (state) => state.assignPartnerProgram,
  );
  const {data: partnerData} = useAppSelector((state) => state.partner);
  const [openAddPartnerModal, setOpenAddPartnerModal] =
    useState<boolean>(false);
  const [allPartnerData, setAllPartnerData] = useState<any>();
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();

  useEffect(() => {
    if (isSuperAdmin) {
      dispatch(getAllPartnerandProgram(''))?.then((payload: any) => {
        setAllPartnerData(payload?.payload);
      });
    }
  }, []);

  useEffect(() => {
    const FilterArrayDataa = partnerProgramFilter(
      'user',
      userInformation,
      allPartnerData,
      1,
      true,
    );

    setAllFilterPartnerData(FilterArrayDataa);
  }, [allPartnerData]);

  useEffect(() => {
    if (notApprovedData) {
      dispatch(getAllPartnerandProgram(''));
    } else {
      dispatch(
        getAssignPartnerProgramByOrganization({
          organization: userInformation?.organization,
        }),
      );
    }
  }, [userInformation]);

  const partnerApprovedObjects: any[] = [];
  AssignPartnerProgramData?.approved?.forEach((entry: any) => {
    const partner = entry?.PartnerProgram?.Partner;
    partnerApprovedObjects?.push(partner);
  });

  const partnerOptions = isSuperAdmin
    ? allPartnerFilterData?.map((partner: any) => ({
        label: partner?.partner,
        value: partner?.id,
      }))
    : notApprovedData
      ? allPartnerFilterData?.map((partner: any) => ({
          label: partner?.partner,
          value: partner?.id,
        }))
      : partnerApprovedObjects?.map((dataAddressItem: any) => ({
          value: dataAddressItem.id,
          label: (
            <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
              {dataAddressItem.partner}
            </Typography>
          ),
        }));

  const setFinalData = (e: any) => {
    const filteredData = allPartnerFilterData?.filter(
      (item: any) => item?.id === e,
    );
    dispatch(setPartnerRequestData(filteredData));
  };

  return (
    <>
      <Form.Item
        label="Partner Name"
        name={name}
        rules={[{required: isRequired, message: 'Please Select Partner!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%'}}
          options={partnerOptions}
          onChange={(e) => {
            setPartnerValue && setPartnerValue(e);
            form?.setFieldsValue({
              name: e,
            });
            form?.resetFields([partnerProgramName]);
             setFinalData(e);
          }}
          onClear={() => {
            form?.resetFields([partnerProgramName]);
          }}
          dropdownRender={(menu) => (
            <>
              {isAddNewPartner && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setOpenAddPartnerModal(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{marginTop: '5px'}}
                  />
                  <Typography
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                  >
                    Request Partner
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </Form.Item>

      <OsModal
        // loading={loading}
        body={<AddPartner form={form} setOpen={setOpenAddPartnerModal} />}
        width={600}
        open={openAddPartnerModal}
        onCancel={() => {
          setOpenAddPartnerModal((p) => !p);
        }}
        footer
        primaryButtonText="Create"
        onOk={form?.submit}
        footerPadding={30}
      />
    </>
  );
};

export default OsPartnerSelect;
