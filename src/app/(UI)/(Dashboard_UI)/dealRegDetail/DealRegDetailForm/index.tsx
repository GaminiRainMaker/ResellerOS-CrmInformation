import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import CommonFields from './CommonField';
import UniqueFields from './UniqueField';

const DealRegDetailForm = () => {
  const [token] = useThemeToken();

  const CommonFieldsItems = [
    {
      key: '1',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Common Fields
        </Typography>
      ),
      children: <CommonFields />,
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
      children: <UniqueFields />,
    },
  ];

  return (
    <Row>
      <Space style={{width: '100%'}} size={24} direction="vertical">
        <OsCollapseAdmin items={CommonFieldsItems} />
      </Space>

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
    </Row>
  );
};

export default DealRegDetailForm;
