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
import {getDistributorByOemId} from '../../../../../redux/actions/quoteConfiguration';

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
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {loading, data: DistributorData} = useAppSelector(
    (state) => state.distributor,
  );
  const {data: QuoteConfigData} = useAppSelector((state) => state.quoteConfig);
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
    const distributorOptions =
      DistributorData &&
      DistributorData?.map((dataAddressItem: any) => ({
        key: dataAddressItem?.id,
        value: dataAddressItem?.id,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {capitalizeFirstLetter(dataAddressItem?.distributor)}
          </Typography>
        ),
      }));

    setDistributorFilterOption(distributorOptions);
  }, [JSON.stringify(DistributorData)]);

  useEffect(() => {
    dispatch(queryDistributor(queryParams));
  }, []);

  // useEffect(() => {
  //   if (quoteCreation) {
  //     dispatch(getDistributorByOemId(Number(distributorValue)));
  //   }
  // }, [distributorValue]);

  console.log('QuoteConfigData', QuoteConfigData);

  return (
    <>
      <SelectFormItem
        label={label ? 'Distributor' : ''}
        name={name}
        // rules={[{required: isRequired, message: 'Please Select Distributor!'}]}
      >
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%', height: `${height}px`}}
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
