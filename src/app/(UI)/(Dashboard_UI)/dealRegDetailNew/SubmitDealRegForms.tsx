import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';
import {calculateTabBarPercentage} from '@/app/utils/base';
import CommonSelect from '@/app/components/common/os-select';
import {formatStatus} from '@/app/utils/CONSTANTS';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';

const SubmitDealRegForms: FC<any> = ({form, onFinish}) => {
  const [token] = useThemeToken();
  const [tabItems, setTabItems] = useState([]);
  const {data: DealRegData} = useAppSelector((state) => state.dealReg);
  const {data: AttributeFieldData} = useAppSelector(
    (state) => state.attributeField,
  );

  useEffect(() => {
    if (!DealRegData) {
      setTabItems([]);
      return;
    }

    const newTabItems =
      DealRegData &&
      DealRegData?.map((element: any) => {
        const {Partner, PartnerProgram} = element;
        const tabPercentage = calculateTabBarPercentage(
          element?.PartnerProgram?.form_data,
          AttributeFieldData,
          element?.unique_form_data,
          element?.common_form_data,
          true,
        );

        if (tabPercentage === 100) {
          return {
            value: element?.id,
            label: (
              <Typography cursor="pointer" name="Button 1">
                {`${formatStatus(Partner?.partner)} - ${formatStatus(PartnerProgram?.partner_program)}`}
              </Typography>
            ),
          };
        }

        return null;
      }).filter((item: any) => item !== null);

    setTabItems(newTabItems);
  }, [DealRegData, AttributeFieldData]);

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <SelectFormItem
        label={<Typography name="Body 4/Medium">Dealreg Form</Typography>}
        name="id"
        rules={[
          {
            required: true,
            message: 'This field is required.',
          },
        ]}
      >
        <CommonSelect
          options={tabItems}
          mode="multiple"
          style={{width: '100%'}}
          placeholder="Select Dealreg Forms"
        />
      </SelectFormItem>
      <br />

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography
          name="Body 3/Bold"
          color={token?.colorLink}
          style={{marginBottom: '6px'}}
        >
          Note:
        </Typography>
        <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
          <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
            <li>
              Only forms that are 100% complete are displayed here. Please
              ensure all required fields are filled out to see your form in this
              list.
            </li>
          </ul>
        </Typography>
      </div>
    </Form>
  );
};

export default SubmitDealRegForms;
