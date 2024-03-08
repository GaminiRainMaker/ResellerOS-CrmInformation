/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {getAllOpportunity} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddOpportunity from '../os-add-opportunity';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsOpportunitySelectInterface} from './os-opportunity-select-interface';

const OsOpportunitySelect: FC<OsOpportunitySelectInterface> = ({
  customerValue,
  isAddNewOpportunity = false,
  form,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const [open, setOpen] = useState<boolean>(false);
  const [opportunityFilterOption, setOpportunityFilterOption] = useState<any>();
  const [formValue, setFormValue] = useState<any>();

  useEffect(() => {
    dispatch(getAllOpportunity());
  }, []);


  useEffect(() => {
    form?.resetFields(['opportunity_id']);
    const filterUsers = opportunityData?.filter((item: any) =>
      item?.customer_id?.toString()?.includes(customerValue),
    );
    const opportunityOptions = filterUsers.map((opportunity: any) => ({
      value: opportunity.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {opportunity.title}
        </Typography>
      ),
    }));

    setOpportunityFilterOption(opportunityOptions);
  }, [customerValue]);

  return (
    <>
      <Form.Item
        label="Opportunity"
        name="opportunity_id"
        rules={[{required: true, message: 'Please Select Opportunity!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%'}}
          options={opportunityFilterOption}
          dropdownRender={(menu) => (
            <>
              {isAddNewOpportunity && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{marginTop: '5px'}}
                  />
                  <Typography
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                  >
                    Add Opportunity
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </Form.Item>

      <OsModal
        body={
          <AddOpportunity
            setFormValue={setFormValue}
            formValue={formValue}
            setShowModal={setOpen}
          />
        }
        width={600}
        open={open}
        onCancel={() => {
          setOpen((p) => !p);
        }}
      />
    </>
  );
};

export default OsOpportunitySelect;
