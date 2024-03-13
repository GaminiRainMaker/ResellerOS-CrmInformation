/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {Form, FormInstance} from 'antd';
import {FC, useEffect} from 'react';
import {getAllPartner} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';

const OsPartnerSelect: FC<{
  form: FormInstance;
  name?: string;
  setPartnerValue?: any;
  partnerProgramName?: string;
}> = ({name = 'partner', setPartnerValue, form, partnerProgramName}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: partnerData} = useAppSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getAllPartner());
  }, []);

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
      rules={[{required: false, message: 'Please Select Partner!'}]}
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
