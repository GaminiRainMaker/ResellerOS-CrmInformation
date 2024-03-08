import FormBuilderMain from '@/app/components/common/formBuilder/page';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useAppSelector} from '../../../../../../redux/hook';
import {CollapseSpaceStyle} from './styled-components';

const UniqueFields = () => {
  const [form] = Form.useForm();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const formDataObject = JSON?.parse(dealReg?.PartnerProgram?.form_data);
  const AccountInformationItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Account Information</Typography>,
      children: (
        <>
          {formDataObject && (
            <FormBuilderMain
              cartItems={formDataObject}
              form={form}
              previewFile
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
