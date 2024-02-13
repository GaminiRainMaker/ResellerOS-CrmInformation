/* eslint-disable react/no-unstable-nested-components */
import {Form} from 'antd';
import {FC, useEffect} from 'react';
import {getAllPartner} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';

const OsPartnerSelect: FC<any> = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: partnerData} = useAppSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getAllPartner());
  }, []);

  const partnerOptions = partnerData.map((dataAddressItem: any) => ({
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
      name="partner"
      rules={[{required: true, message: 'Please Select Partner!'}]}
    >
      <CommonSelect
        placeholder="Select"
        allowClear
        style={{width: '100%'}}
        options={partnerOptions}
        //   dropdownRender={(menu) => ({menu})}
      />
    </Form.Item>
  );
};

export default OsPartnerSelect;
