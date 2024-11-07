/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddPartnerProgram from '../os-add-partner-program';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsPartnerProgramSelectInterface} from './os-partner-program.interface';
import CustomTextCapitalization from '../hooks/CustomTextCapitalizationHook';
import {usePathname} from 'next/navigation';
import {getAssignPartnerProgramByOrganization} from '../../../../../redux/actions/assignPartnerProgram';

const OsPartnerProgramSelect: FC<OsPartnerProgramSelectInterface> = ({
  organizationName,
  name = 'partner_program',
  partnerId,
  isRequired = false,
  isAddNewProgram = false,
  notApprovedData = false,
  allPartnerData,
}) => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const [openAddProgramModal, setOpenAddProgramModal] =
    useState<boolean>(false);
  const {insertProgramLoading} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const {partnerRequestData} = useAppSelector((state) => state.partner);
  const [finalProgramOptions, setFinalProgramOptions] = useState<any>();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  useEffect(() => {
    let partnerProgramsRequestOptions: any = [];

    let findIndexOfThePartner = allPartnerData?.findIndex(
      (item: any) => item?.id === partnerId,
    );

    const matchedPartner = allPartnerData?.[findIndexOfThePartner];

    matchedPartner?.PartnerPrograms?.forEach((program: any) => {
      if (
        !program?.AssignPartnerProgram ||
        (program?.AssignPartnerProgram &&
          program?.AssignPartnerProgram?.is_approved === false)
      ) {
        partnerProgramsRequestOptions?.push({
          label: <CustomTextCapitalization text={program?.partner_program} />,
          value: JSON.stringify({
            partner: {
              id: matchedPartner?.id,
              name: matchedPartner?.partner,
            },
            program: {
              id: program?.id,
              name: program?.partner_program,
            },
          }),
        });
      }
    });
    setFinalProgramOptions(partnerProgramsRequestOptions);
  }, [allPartnerData, partnerId]);

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
          disabled={!partnerId}
          allowClear
          style={{width: '100%'}}
          options={finalProgramOptions?.sort((a: any, b: any) => {
            if (a.label < b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            return 0;
          })}
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
        loading={insertProgramLoading}
        body={
          <AddPartnerProgram
            form={form}
            setOpen={setOpenAddProgramModal}
            partnerId={partnerId}
            setFinalProgramOptions={setFinalProgramOptions}
            finalProgramOptions={finalProgramOptions}
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
