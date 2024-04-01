/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {queryDistributor} from '../../../../../redux/actions/distributor';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import AddDistributor from '../os-add-distributor';
import OsModal from '../os-modal';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsDistriButorSelectInterface} from './os-distributor.interface';
import {
  getDistributorByOemId,
  queryQuoteConfiguration,
} from '../../../../../redux/actions/quoteConfiguration';

const queryParams: any = {
  distributor: null,
};

const OsDistributorSelect: FC<OsDistriButorSelectInterface> = ({
  isRequired = false,
  distributorValue,
  setDistributorValue,
  isAddNewDistributor = false,
  label = false,
  height,
  onChange,
  name = 'distributor_id',
  quoteCreation = false,
  oemValue,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {loading, data: DistributorData} = useAppSelector(
    (state) => state.distributor,
  );
  const {distributorDataByOemId, data: quoteConfigData} = useAppSelector(
    (state) => state.quoteConfig,
  );
  const [showDistributorModal, setShowDistributorModal] =
    useState<boolean>(false);
  const [distributorFilterOption, setDistributorFilterOption] = useState<any>();

  const capitalizeFirstLetter = (str: string | undefined) => {
    if (!str) {
      return ''; // Return an empty string or handle the case as appropriate
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    dispatch(queryDistributor(queryParams));
  }, []);

  useEffect(() => {
    if (quoteCreation) {
      dispatch(queryQuoteConfiguration({}));
    }
  }, [quoteCreation]);

  useEffect(() => {
    if (quoteCreation && oemValue) {
      dispatch(getDistributorByOemId(Number(oemValue)));
    }
  }, [oemValue]);

  useEffect(() => {
    const distributorFinalOptions = [];
    let finalArr = [];
    if (quoteCreation && oemValue) {
      finalArr = distributorDataByOemId;
    } else if (quoteCreation) {
      finalArr = quoteConfigData;
    } else {
      finalArr = DistributorData;
    }
    for (let i = 0; i < finalArr?.length; i++) {
      const item = finalArr[i];
      const index = distributorFinalOptions.findIndex((optionItem) =>
        quoteCreation
          ? item?.Distributor?.id === optionItem?.value
          : item?.id === optionItem?.value,
      );
      if (index === -1) {
        const obj = {
          label: (
            <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
              {capitalizeFirstLetter(
                quoteCreation
                  ? item?.Distributor?.distributor
                  : item?.distributor,
              )}
            </Typography>
          ),
          key: quoteCreation ? item?.Distributor?.id : item?.id,
          // model_id: quoteCreation && item.Distributor?.model_id,
          value: quoteCreation ? item?.Distributor?.id : item?.id,
        };
        distributorFinalOptions.push(obj);
      }
    }

    setDistributorFilterOption(distributorFinalOptions);
  }, [
    DistributorData,
    distributorDataByOemId,
    oemValue,
    quoteConfigData,
    quoteCreation,
    token?.colorPrimaryText,
  ]);

  return (
    <>
      <SelectFormItem label={label ? 'Distributor' : ''} name={name}>
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%', height: '38px'}}
          options={distributorFilterOption}
          defaultValue={distributorValue}
          onChange={onChange}
          dropdownRender={(menu) => (
            <>
              {isAddNewDistributor && (
                <Space
                  style={{cursor: 'pointer'}}
                  size={8}
                  onClick={() => setShowDistributorModal(true)}
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
                    Add Distributor
                  </Typography>
                </Space>
              )}
              {menu}
            </>
          )}
        />
      </SelectFormItem>

      <OsModal
        loading={loading}
        body={
          <AddDistributor form={form} setShowModal={setShowDistributorModal} />
        }
        width={600}
        open={showDistributorModal}
        onCancel={() => {
          setShowDistributorModal((p) => !p);
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

export default OsDistributorSelect;
