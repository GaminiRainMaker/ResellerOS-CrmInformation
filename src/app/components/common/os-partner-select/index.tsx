/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {partnerProgramFilter} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {getAllPartnerandProgramFilterData} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setPartnerRequestData} from '../../../../../redux/slices/partner';
import {Space} from '../antd/Space';
import CustomTextCapitalization from '../hooks/CustomTextCapitalizationHook';
import useThemeToken from '../hooks/useThemeToken';
import AddPartner from '../os-add-partner';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {getAssignPartnerProgramByOrganization} from '../../../../../redux/actions/assignPartnerProgram';
import {usePathname} from 'next/navigation';

const OsPartnerSelect: FC<{
  // form: FormInstance;
  organizationName?: string;
  name?: string;
  setPartnerValue?: any;
  partnerProgramName?: string;
  isRequired?: boolean;
  isSuperAdmin?: boolean;
  isAddNewPartner?: boolean;
  notApprovedData?: boolean;
  form?: any;
  allPartnerData?: any;
}> = ({
  organizationName,
  name = 'partner',
  setPartnerValue,
  // form,
  partnerProgramName,
  isRequired = false,
  isSuperAdmin = true,
  isAddNewPartner = false,
  notApprovedData = false,
  allPartnerData,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [form] = Form.useForm();
  const {userInformation, allResellerRecord} = useAppSelector(
    (state) => state.user,
  );
  const {data: PartnerData, insertPartnerLoading} = useAppSelector(
    (state) => state.partner,
  );
  const {data: AssignPartnerProgramData} = useAppSelector(
    (state) => state.assignPartnerProgram,
  );
  const [openAddPartnerModal, setOpenAddPartnerModal] =
    useState<boolean>(false);
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [selectedPartnerId, setSelectedPartnerId] = useState<number>();
  useEffect(() => {
    setAllFilterPartnerData(allPartnerData);
  }, [allPartnerData]);
  const [partnerOptions, setPartnerOptions] = useState<any>();

  useEffect(() => {
    let newOptionArr: any = [];

    allPartnerFilterData?.map((items: any) => {
      newOptionArr?.push({
        label: <CustomTextCapitalization text={items?.partner} />,
        value: items?.id,
      });
    });
    setPartnerOptions(newOptionArr);
  }, [allPartnerFilterData]);

  const partnerApprovedObjects: any[] = [];
  AssignPartnerProgramData?.approved?.forEach((entry: any) => {
    const partner = entry?.PartnerProgram?.Partner;
    partnerApprovedObjects?.push(partner);
  });

  const setFinalData = (e: any) => {
    const filteredData = allPartnerFilterData?.filter(
      (item: any) => item?.id === e,
    );
    dispatch(setPartnerRequestData(filteredData));
  };

  useEffect(() => {
    const filteredData = allPartnerFilterData?.filter(
      (item: any) => item?.id === selectedPartnerId,
    );
    dispatch(setPartnerRequestData(filteredData));
  }, [PartnerData, allPartnerFilterData]);

  //
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
          options={partnerOptions?.sort((a: any, b: any) => {
            if (a.label < b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            return 0;
          })}
          onChange={(e) => {
            setPartnerValue && setPartnerValue(e);
            form?.setFieldsValue({
              name: e,
            });
            form?.resetFields([partnerProgramName]);
            setFinalData(e);
            setSelectedPartnerId(e);
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
                    cursor="pointer"
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
        loading={insertPartnerLoading}
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
