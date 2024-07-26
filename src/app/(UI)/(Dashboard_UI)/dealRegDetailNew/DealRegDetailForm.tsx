/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {FC} from 'react';
import CommonFields from './CommonField';
import UniqueFields from './UniqueField';

const DealRegDetailForm: FC<any> = ({data, activeKey, form, handleBlur}) => {
  const [token] = useThemeToken();

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
        />
      ),
    },
  ];

  return (
    <Row>
      <Space style={{width: '100%'}} size={24} direction="vertical">
        <OsCollapseAdmin items={CommonFieldsItems} />
      </Space>
      <>
        {data?.PartnerProgram?.form_data && (
          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              marginTop: '30px',
            }}
          >
            <OsCollapseAdmin items={UniqueFieldsItems} />
          </Space>
        )}
      </>
    </Row>
  );
};

export default DealRegDetailForm;
