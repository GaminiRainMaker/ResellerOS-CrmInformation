/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {getAllPartnerProgram} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsPartnerProgramSelectInterface} from './os-partner-program.interface';
import OsModal from '../os-modal';
import AddPartnerProgram from '../os-add-partner-program';

const OsPartnerProgramSelect: FC<OsPartnerProgramSelectInterface> = ({
  name = 'partner_program',
  partnerId,
  isRequired = false,
  isAddNewProgram = false,
  notApprovedData = false,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [openAddProgramModal, setOpenAddProgramModal] =
    useState<boolean>(false);
  const {data: partnerProgramData} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const {partnerRequestData} = useAppSelector((state) => state.partner);

  const filteredPartnerPrograms =
    partnerRequestData?.[0]?.PartnerPrograms?.filter(
      (program: any) =>
        !program?.AssignPartnerProgram ||
        program?.AssignPartnerProgram?.is_approved === null ||
        program?.AssignPartnerProgram?.is_approved === false,
    );

  const partnerProgramsRequestOptions = filteredPartnerPrograms?.map(
    (program: any) => ({
      label: program.partner_program,
      value: program.id,
    }),
  );

  useEffect(() => {
    dispatch(getAllPartnerProgram());
  }, []);

  const filteredData = partnerProgramData.filter(
    (item: any) => item.partner === partnerId,
  );

  const partnerProgramsOptions = (
    partnerId ? filteredData : partnerProgramData
  )?.map((program: any) => ({
    label: program.partner_program,
    value: program.id,
  }));

  return (
    <>
      <Form.Item
        label="Partner Program"
        name={name}
        rules={[
          {required: isRequired, message: 'Please Select Partner Program!'},
        ]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%'}}
          options={
            notApprovedData
              ? partnerProgramsRequestOptions
              : partnerProgramsOptions
          }
          dropdownRender={(menu) => (
            <>
              {isAddNewProgram && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setOpenAddProgramModal(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{marginTop: '5px'}}
                  />
                  <Typography
                    cursor="pointer"
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                  >
                    Request Partner Program
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </Form.Item>

      <OsModal
        // loading={loading}
        body={
          <AddPartnerProgram
            form={form}
            setOpen={setOpenAddProgramModal}
            partnerId={partnerId}
          />
        }
        width={600}
        open={openAddProgramModal}
        onCancel={() => {
          setOpenAddProgramModal((p) => !p);
        }}
        footer
        primaryButtonText="Create"
        onOk={form?.submit}
        footerPadding={30}
      />
    </>
  );
};

export default OsPartnerProgramSelect;
