import React, {FC, useEffect} from 'react';
import {Form} from 'antd';
import useThemeToken from '../hooks/useThemeToken';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import Typography from '../typography';
import CommonSelect from '../os-select';
import {OsPartnerProgramSelectInterface} from './os-partner-program.interface';
import {getAllPartnerProgram} from '../../../../../redux/actions/partnerProgram';

const OsPartnerProgramSelect: FC<OsPartnerProgramSelectInterface> = ({
  name = 'partner_program',
  partnerId,
  isRequired = false,
  form,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();

  const {data: partnerProgramData} = useAppSelector(
    (state) => state.partnerProgram,
  );

  useEffect(() => {
    dispatch(getAllPartnerProgram());
  }, []);

  const filteredData = partnerProgramData.filter(
    (item: any) => item.partner === partnerId,
  );

  const partnerProgramsOptions = (
    partnerId ? filteredData : partnerProgramData
  )?.map((program: any) => ({
    label: program.partner_program,
    value: program.id,
  }));

  return (
    <Form.Item
      label="Partner Program"
      name={name}
      rules={[
        {required: isRequired, message: 'Please Select Partner Program!'},
      ]}
    >
      <CommonSelect
        placeholder="Select"
        allowClear
        style={{width: '100%'}}
        options={partnerProgramsOptions}
      />
    </Form.Item>
  );
};

export default OsPartnerProgramSelect;
