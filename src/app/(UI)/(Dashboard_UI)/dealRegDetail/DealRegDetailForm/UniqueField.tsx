import FormBuilderMain from '@/app/components/common/formBuilder/page';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useEffect} from 'react';
import {updatePartnerProgramById} from '../../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {CollapseSpaceStyle} from './styled-components';

const UniqueFields: React.FC<any> = ({
  cartItems,
  setCartItems,
  sectionIndexActive,
  setSectionIndexActive,
  data,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cartItems) {
      setCartItems(JSON?.parse(data?.form_data));
    }
  }, [data]);

  const updateUniqueFiledData = () => {
    const dataa = {
      id: data?.id,
      form_data: JSON?.stringify(cartItems),
    };

    dispatch(updatePartnerProgramById(dataa));
  };
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
