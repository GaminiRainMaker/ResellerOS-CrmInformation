import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';
import {calculateTabBarPercentage} from '@/app/utils/base';
import CommonSelect from '@/app/components/common/os-select';
import {formatStatus} from '@/app/utils/CONSTANTS';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';

const SubmitDealRegForms: FC<any> = ({form, onFinish}) => {
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
          true
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
    </Form>
  );
};

export default SubmitDealRegForms;
