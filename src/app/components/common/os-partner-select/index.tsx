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

const OsPartnerSelect: FC<{
  form: FormInstance;
  name?: string;
  setPartnerValue?: any;
  partnerProgramName?: string;
  isRequired?: boolean;
}> = ({
  name = 'partner',
  setPartnerValue,
  form,
  partnerProgramName,
  isRequired = false,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: partnerData} = useAppSelector((state) => state.partner);
  const {userInformation} = useAppSelector((state) => state.user);
  const {
    data: AssignPartnerProgramData,
    loading: AssignPartnerProgramDataloading,
  } = useAppSelector((state) => state.assignPartnerProgram);
  useEffect(() => {
    dispatch(getAllPartnerTemp());
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     getAssignPartnerProgramByOrganization({
  //       organization: userInformation?.organization,
  //     }),
  //   );
  // }, [userInformation]);

  // console.log('AssignPartnerProgramData', AssignPartnerProgramData);

  const partnerOptions = partnerData?.approved?.map((dataAddressItem: any) => ({
    value: dataAddressItem.id,
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {dataAddressItem.partner}
      </Typography>
    ),
  }));

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
