import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {FC, useEffect} from 'react';
import CommonFields from './CommonField';
import UniqueFields from './UniqueField';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {getAllOpportunity} from '../../../../../../redux/actions/opportunity';
import {getAllCustomer} from '../../../../../../redux/actions/customer';

const DealRegDetailForm: FC<any> = (data) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();

  const CommonFieldsItems = [
    {
      key: '1',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Common Fields
        </Typography>
      ),
      children: <CommonFields data={data?.data} />,
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

  useEffect(() => {
    dispatch(getAllOpportunity());
    dispatch(getAllCustomer({}));
  }, []);

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
