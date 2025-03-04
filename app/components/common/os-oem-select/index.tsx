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
import {formatStatus} from '@/utils/CONSTANTS';

const OsOemSelect: FC<OsOemSelectInterface> = ({
  isRequired = false,
  oemValue,
  isAddNewOem = false,
  onChange,
  name = 'oem_id',
  quoteCreation = false,
  distributorValue,
  disabled = false,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {oemDatByDistributorId, data: quoteConfigData} = useAppSelector(
    (state) => state.quoteConfig,
  );
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
  //   if (quoteCreation && distributorValue) {
  //     dispatch(getOemByDistributorId(Number(distributorValue)));
  //   }
  // }, [distributorValue]);

  useEffect(() => {
    const oemFinalOptions = [];
    let finalArr = [];
    if (quoteCreation && distributorValue) {
      finalArr = oemDatByDistributorId;
    } else if (quoteCreation) {
      finalArr = quoteConfigData;
    } else {
      finalArr = OemData;
    }
    for (let i = 0; i < finalArr?.length; i++) {
      const item = finalArr[i];
      const index = oemFinalOptions.findIndex((optionItem) =>
        quoteCreation
          ? item.Oem?.id === optionItem?.value
          : item?.id === optionItem?.value,
      );
      if (index === -1 && (quoteCreation ? item?.oem_id : true)) {
        const obj = {
          label: (
            <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
              {capitalizeFirstLetter(
                quoteCreation
                  ? formatStatus(item?.Partner?.partner)
                  : item?.oem,
              )}
            </Typography>
          ),
          key: quoteCreation ? item.model_id : item?.id,
          value: quoteCreation ? item.model_id : item?.id,
        };
        oemFinalOptions.push(obj);
      }
    }

    setFinalOemOptions([
      ...oemFinalOptions,
      quoteCreation && {
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            Other
          </Typography>
        ),
        value: 'a02fffb7-5221-44a2-8eb1-85781a0ecd67',
      },
    ]);
  }, [
    JSON.stringify(OemData),
    JSON.stringify(oemDatByDistributorId),
    JSON.stringify(quoteConfigData),
    // distributorValue,
  ]);
  return (
    <>
      {/* <SelectFormItem
        label=""
        name={name}
        rules={[{required: isRequired, message: 'Please Select OEM!'}]}
      > */}
      <CommonSelect
        placeholder="Select"
        disabled={disabled}
        allowClear
        style={{width: '100%', height: '38px'}}
        options={finalOemOptions}
        value={oemValue}
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
      {isRequired && <div style={{color: 'red'}}>Please Select OEM!</div>}

      {/* </SelectFormItem> */}

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
