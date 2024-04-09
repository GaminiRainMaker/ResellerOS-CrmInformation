/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {Form, FormInstance} from 'antd';
import {FC, useEffect} from 'react';
import {getAllPartnerTemp} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {getAssignPartnerProgramByOrganization} from '../../../../../redux/actions/assignPartnerProgram';
import {getUnassignedProgram} from '../../../../../redux/actions/partnerProgram';

const OsPartnerSelect: FC<{
  form: FormInstance;
  name?: string;
  setPartnerValue?: any;
  partnerProgramName?: string;
  isRequired?: boolean;
  isSuperAdmin?: boolean;
}> = ({
  name = 'partner',
  setPartnerValue,
  form,
  partnerProgramName,
  isRequired = false,
  isSuperAdmin = true,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const {
    data: AssignPartnerProgramData,
    loading: AssignPartnerProgramDataloading,
  } = useAppSelector((state) => state.assignPartnerProgram);
  const {data: partneProgramUnassignedData} = useAppSelector(
    (state) => state.partnerProgram,
  );

  useEffect(() => {
    if (isSuperAdmin) {
      dispatch(getUnassignedProgram());
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
    ? []
    : partnerApprovedObjects?.map((dataAddressItem: any) => ({
        value: dataAddressItem.id,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {dataAddressItem.partner}
          </Typography>
        ),
      }));
      
  console.log('getUnassignedProgram', partneProgramUnassignedData);

  return (
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
        }}
        onClear={() => {
          form?.resetFields([partnerProgramName]);
        }}
      />
    </Form.Item>
  );
};

export default OsPartnerSelect;
