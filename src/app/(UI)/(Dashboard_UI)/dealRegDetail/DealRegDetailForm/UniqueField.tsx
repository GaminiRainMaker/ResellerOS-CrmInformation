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
          {/* <Space
            size={36}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Row justify="space-between" gutter={[24, 24]}>
              <Col sm={24} md={12}>
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Account Name</Typography>
                  <CommonSelect placeholder="Select" style={{width: '100%'}} />
                </Space>
              </Col>
              <Col sm={24} md={12}>
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Industry</Typography>
                  <CommonSelect placeholder="Select" style={{width: '100%'}} />
                </Space>
              </Col>
            </Row>

            <Row justify="space-between" gutter={[24, 24]}>
              <Col sm={24} md={12}>
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Account Website</Typography>
                  <CommonSelect placeholder="Select" style={{width: '100%'}} />
                </Space>
              </Col>

              <Col sm={24} md={12}>
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Account Contact</Typography>
                  <CommonSelect placeholder="Select" style={{width: '100%'}} />
                </Space>
              </Col>
            </Row>
          </Space> */}
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
