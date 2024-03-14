/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {queryOEM} from '../../../../../redux/actions/oem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddOem from '../os-add-oem';
import OsModal from '../os-modal';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {SelectFormItem} from './oem-select-styled';
import {OsOemSelectInterface} from './os-oem.interface';
import {getOemByDistributorId} from '../../../../../redux/actions/quoteConfiguration';

const OsOemSelect: FC<OsOemSelectInterface> = ({
  isRequired = false,
  oemValue,
  isAddNewOem = false,
  onChange,
  name = 'oem_id',
  quoteCreation = false,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [showOemModal, setShowOemModal] = useState<boolean>(false);
  const [finalOemOptions, setFinalOemOptions] = useState<any>();

  const capitalizeFirstLetter = (str: string | undefined) => {
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const {loading: OemLoading, data: OemData} = useAppSelector(
    (state) => state.oem,
  );

  useEffect(() => {
    dispatch(queryOEM({}));
  }, []);

  // useEffect(() => {
  //   if (quoteCreation) {
  //     dispatch(getOemByDistributorId(Number(oemValue)));
  //   }
  // }, [oemValue]);

  useEffect(() => {
    const OemOptions =
      OemData &&
      OemData?.map((dataAddressItem: any) => ({
        value: dataAddressItem?.id,
        model_id: dataAddressItem?.model_id,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {capitalizeFirstLetter(dataAddressItem?.oem)}
          </Typography>
        ),
      }));

    setFinalOemOptions(OemOptions);
  }, [JSON.stringify(OemData)]);

  return (
    <>
      <SelectFormItem
        label=""
        name={name}
        rules={[{required: isRequired, message: 'Please Select OEM!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%', height: '38px'}}
          options={finalOemOptions}
          defaultValue={oemValue}
          onChange={onChange}
          dropdownRender={(menu) => (
            <>
              {isAddNewOem && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setShowOemModal(true)}
                >
                  <PlusIcon
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{marginTop: '5px'}}
                  />
                  <Typography
                    color={token?.colorPrimaryText}
                    name="Body 3/Regular"
                    hoverOnText
                  >
                    Add OEM
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </SelectFormItem>

      <OsModal
        loading={OemLoading}
        body={<AddOem form={form} setShowModal={setShowOemModal} />}
        width={600}
        open={showOemModal}
        onCancel={() => {
          setShowOemModal((p) => !p);
        }}
        primaryButtonText="Save"
        onOk={() => {
          form?.submit();
        }}
        footerPadding={20}
        footer
      />
    </>
  );
};

export default OsOemSelect;
