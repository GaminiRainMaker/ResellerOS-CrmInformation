/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {usePathname} from 'next/navigation';
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
import {formatStatus} from '@/app/utils/CONSTANTS';

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
  allPartnerDataForSuperAdmin?: any;
  setAllPartnerData?: any;
  getTheData?: any;
  setGetTheData?: any;
  partnerValue?: any;
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
  allPartnerDataForSuperAdmin,
  setAllPartnerData,
  getTheData,
  setGetTheData,
  partnerValue,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [form] = Form.useForm();
  // partnerData?.AllPartner
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
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [searchOPtions, setSearchOptions] = useState<any>();

  useEffect(() => {
    let newOptionArr: any = [];
    allPartnerFilterData?.map((items: any) => {
      newOptionArr?.push({
        label: items?.partner,
        value: items?.id,
      });
    });
    setPartnerOptions(newOptionArr);
  }, [allPartnerFilterData]);
  useEffect(() => {
    if (
      allPartnerDataForSuperAdmin &&
      allPartnerDataForSuperAdmin?.length > 0
    ) {
      let newOptionArr: any = [];
      allPartnerDataForSuperAdmin?.map((items: any) => {
        newOptionArr?.push({
          label: formatStatus(items?.partner),
          value: items?.id,
        });
      });
      setPartnerOptions(newOptionArr);
    }
  }, [allPartnerDataForSuperAdmin]);

  const partnerApprovedObjects: any[] = [];
  AssignPartnerProgramData?.approved?.forEach((entry: any) => {
    const partner = entry?.PartnerProgram?.Partner;
    partnerApprovedObjects?.push(partner);
  });

  const getPartnerProgramData = async () => {
    if (pathname === '/partners') {
      dispatch(getAllPartnerandProgramFilterData({}))?.then((payload: any) => {
        setAllPartnerData(payload?.payload?.AllPartner);
        setAllFilterPartnerData(payload?.payload?.AllPartner);
        let newOptionArr: any = [];
        payload?.payload?.AllPartner?.map((items: any) => {
          newOptionArr?.push({
            label: items?.partner,
            value: items?.id,
          });
        });
        setPartnerOptions(newOptionArr);
      });
    }
    if (setGetTheData) {
      setGetTheData(false);
    }
  };

  useEffect(() => {
    getPartnerProgramData();
  }, [getTheData]);

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

  // useEffect(() => {
  //   form?.setFieldsValue({
  //     partner_id: partnerValue,
  //   });
  // }, [partnerValue]);

  // useEffect(()=>{
  //   if(searchOPtions?.length > 0){

  //   }

  // },[searchOPtions])

  const [filterOptionsPartner, setFilterOptionsPartner] = useState<any>();
  useEffect(() => {
    let newArrr: any = partnerOptions?.length > 0 ? [...partnerOptions] : [];
    let newOptions: any = [];
    newArrr?.filter((item: any) => {
      if (
        item?.label?.charAt(0)?.toLowerCase() ==
        searchOPtions?.charAt(0)?.toLowerCase()
      ) {
        newOptions?.push(item);
      }
    });

    setFilterOptionsPartner(newOptions);
  }, [searchOPtions]);
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
          showSearch
          onSearch={(e) => {
            setSearchOptions(e);
          }}
          // value={partnerValue ? partnerValue : ''}
          options={
            searchOPtions?.length > 0
              ? filterOptionsPartner
              : partnerOptions &&
                partnerOptions?.sort((a: any, b: any) => {
                  if (a.label < b.label) {
                    return -1;
                  }
                  if (a.label > b.label) {
                    return 1;
                  }
                  return 0;
                })
          }
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
        body={
          <AddPartner
            form={form}
            setOpen={setOpenAddPartnerModal}
            setPartnerOptions={setPartnerOptions}
            partnerOptions={partnerOptions}
            setPartnerValue={setPartnerValue}
          />
        }
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
