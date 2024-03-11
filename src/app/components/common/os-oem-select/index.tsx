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
import {OsOemSelectInterface} from './os-oem.interface';
import {SelectFormItem} from './oem-select-styled';

const queryParams: any = {
  oem: null,
};

const OsOemSelect: FC<OsOemSelectInterface> = ({
  isRequired = false,
  oemValue,
  setOemValue,
  isAddNewOem = false,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {data} = useAppSelector((state) => state?.oem);
  const {loading: OemLoading} = useAppSelector((state) => state.oem);
  const [showOemModal, setShowOemModal] = useState<boolean>(false);

  const capitalizeFirstLetter = (str: string | undefined) => {
    if (!str) {
      return ''; // Return an empty string or handle the case as appropriate
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const OemOptions = data?.map((dataAddressItem: any) => ({
    value: dataAddressItem?.id,
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {capitalizeFirstLetter(dataAddressItem?.oem)}
      </Typography>
    ),
  }));

  useEffect(() => {
    dispatch(queryOEM(queryParams));
  }, []);

  return (
    <>
      <SelectFormItem
        label=""
        name="oem"
        rules={[{required: isRequired, message: 'Please Select OEM!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%', height: '38px'}}
          options={OemOptions}
          value={oemValue}
          onChange={(value: number) => {
            setOemValue && setOemValue(value);
          }}
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
                  >
                    Add OEM Account
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
