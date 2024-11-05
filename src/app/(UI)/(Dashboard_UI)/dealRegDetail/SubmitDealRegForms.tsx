import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {calculateTabBarPercentage} from '@/app/utils/base';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';

const SubmitDealRegForms: FC<any> = ({form, onFinish}) => {
  const [token] = useThemeToken();
  const [tabItems, setTabItems] = useState([]);
  const {finalUpdatedDealRegData} = useAppSelector((state) => state.dealReg);
  const {queryData} = useAppSelector((state) => state.attributeField);

  useEffect(() => {
    if (!finalUpdatedDealRegData) {
      setTabItems([]);
      return;
    }

    const newTabItems =
      finalUpdatedDealRegData &&
      finalUpdatedDealRegData
        ?.map((element: any) => {
          const {Partner, PartnerProgram} = element;
          const tabPercentage = calculateTabBarPercentage(
            element?.PartnerProgram?.form_data,
            queryData,
            element?.unique_form_data,
            element?.common_form_data,
            true,
            element?.type,
          );

          // if (tabPercentage === 100 || Number(element?.percentage) != 100 ) {
          // if (tabPercentage) {
          return {
            value: JSON.stringify(element),
            label: (
              <Typography cursor="pointer" name="Button 1">
                {`${formatStatus(Partner?.partner)} - ${formatStatus(PartnerProgram?.partner_program)}`}
              </Typography>
            ),
            // };
          };

          return null;
        })
        .filter((item: any) => item !== null);

    setTabItems(newTabItems);
  }, [finalUpdatedDealRegData, queryData]);

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <SelectFormItem
        label={<Typography name="Body 4/Medium">DealReg Form</Typography>}
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
