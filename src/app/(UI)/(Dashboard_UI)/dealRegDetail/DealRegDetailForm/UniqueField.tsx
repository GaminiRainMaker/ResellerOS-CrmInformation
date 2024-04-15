import FormBuilderMain from '@/app/components/common/formBuilder/page';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {CollapseSpaceStyle} from './styled-components';
import {updatePartnerProgramById} from '../../../../../../redux/actions/partnerProgram';
import {updateAssignPartnerProgramById} from '../../../../../../redux/actions/assignPartnerProgram';

const UniqueFields: React.FC<any> = ({
  cartItems,
  setCartItems,
  sectionIndexActive,
  setSectionIndexActive,
}) => {
  const [form] = Form.useForm();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const dispatch = useAppDispatch();
  // const formDataObject = JSON?.parse(dealReg?.PartnerProgram?.form_data);

  useEffect(() => {
    setCartItems(JSON?.parse(dealReg?.PartnerProgram?.form_data));
  }, [dealReg]);

  const updateUniqueFiledData = () => {
    const dataa = {
      id: dealReg?.PartnerProgram?.id,
      form_data: JSON?.stringify(cartItems),
    };

    dispatch(updatePartnerProgramById(dataa));
  };
  console.log('3454353242', JSON?.parse(dealReg?.PartnerProgram?.form_data));
  const AccountInformationItem = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" onClick={updateUniqueFiledData}>
          Account Information
        </Typography>
      ),
      children: (
        <>
          {cartItems && (
            <FormBuilderMain
              cartItems={cartItems}
              setCartItems={setCartItems}
              form={form}
              previewFile
              sectionIndexActive={sectionIndexActive}
              setSectionIndexActiv={setSectionIndexActive}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <CollapseSpaceStyle size={24} direction="vertical">
      <OsCollapseAdmin items={AccountInformationItem} />
    </CollapseSpaceStyle>
  );
};
export default UniqueFields;
