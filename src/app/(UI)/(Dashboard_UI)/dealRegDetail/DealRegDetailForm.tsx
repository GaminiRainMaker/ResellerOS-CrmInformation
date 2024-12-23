/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsDrawer from '@/app/components/common/os-drawer';
import Typography from '@/app/components/common/typography';
import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setOpenDealRegDrawer} from '../../../../../redux/slices/dealReg';
import CommonFields from './CommonField';
import ResponseDetailForm from './ResponseDetailForm';
import UniqueFields from './UniqueField';

const DealRegDetailForm: FC<any> = ({
  data,
  activeKey,
  form,
  handleBlur,
  formData,
  responseForm,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {openDealRegDrawer} = useAppSelector((state) => state.dealReg);

  const CommonFieldsItems = [
    {
      key: '1',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Common Fields
        </Typography>
      ),
      children: (
        <CommonFields
          form={form}
          activeKey={activeKey}
          handleBlur={handleBlur}
          formData={formData}
        />
      ),
    },
  ];

  const UniqueFieldsItems = [
    {
      key: '2',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Unique Fields{' '}
        </Typography>
      ),
      children: (
        <UniqueFields
          data={data?.PartnerProgram}
          form={form}
          activeKey={activeKey}
          handleBlur={handleBlur}
          formData={formData}
        />
      ),
    },
  ];

  const ResponseDetails = [
    {
      key: '2',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Response Details
        </Typography>
      ),
      children: (
        <ResponseDetailForm
          activeKey={activeKey}
          formData={formData}
          responseForm={responseForm}
        />
      ),
    },
  ];

  return (
    <>
      <Space
        style={{
          width: '100%',
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
        }}
        size={24}
        direction="vertical"
      >
        <OsCollapseAdmin items={ResponseDetails} />
      </Space>
      <>
        {data?.PartnerProgram?.form_data &&
          data?.type !== 'self_registered' && (
            <Space
              size={24}
              direction="vertical"
              style={{
                width: '100%',
                marginTop: '30px',
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
              }}
            >
              <OsCollapseAdmin items={UniqueFieldsItems} />
            </Space>
          )}
      </>

      <OsDrawer
        title={<Typography name="Body 1/Regular">Form Settings</Typography>}
        placement="right"
        onClose={() => {
          dispatch(setOpenDealRegDrawer(false));
        }}
        open={openDealRegDrawer}
        width={450}
      >
        <Space style={{width: '100%'}} size={24} direction="vertical">
          <OsCollapseAdmin items={CommonFieldsItems} />
        </Space>
      </OsDrawer>
    </>
  );
};

export default DealRegDetailForm;
