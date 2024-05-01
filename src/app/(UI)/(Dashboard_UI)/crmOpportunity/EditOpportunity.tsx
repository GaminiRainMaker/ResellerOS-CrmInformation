import {Row} from '@/app/components/common/antd/Grid';
import AddOpportunity from '@/app/components/common/os-add-opportunity';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import Typography from '@/app/components/common/typography';
import {usePathname, useSearchParams} from 'next/navigation';
import {FC} from 'react';
import {
  getAllOpportunity,
  getOpportunityById,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {useAppDispatch} from '../../../../../redux/hook';
import {EditOpportunityInterface} from './opportunity.interface';

const EditOpportunity: FC<EditOpportunityInterface> = ({
  open,
  setOpen,
  setFormValue,
  formValue,
}) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('id');
  const updateOpportunityData = async () => {
    await dispatch(updateOpportunity(formValue));
    if (pathname?.includes('crmOpportunity')) {
      dispatch(getAllOpportunity());
    } else {
      dispatch(getOpportunityById(opportunityId));
    }
    setOpen(false);
  };

  return (
    <OsDrawer
      title={<Typography name="Body 1/Regular">Opportunity Details</Typography>}
      placement="right"
      onClose={() => setOpen((p: boolean) => !p)}
      open={open}
      width={450}
      footer={
        <Row style={{width: '100%', float: 'right'}}>
          {' '}
          <OsButton
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={updateOpportunityData}
          />
        </Row>
      }
    >
      <AddOpportunity
        setFormValue={setFormValue}
        formValue={formValue}
        drawer="drawer"
      />
    </OsDrawer>
  );
};

export default EditOpportunity;
