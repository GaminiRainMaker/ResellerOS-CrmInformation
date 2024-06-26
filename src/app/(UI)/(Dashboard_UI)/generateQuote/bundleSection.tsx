/* eslint-disable eqeqeq */
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import {Radio, RadioChangeEvent} from 'antd';
import {FC, useEffect, useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import OsInput from '@/app/components/common/os-input';
import {useSearchParams} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getAllBundle, insertBundle} from '../../../../../redux/actions/bundle';
import {updateQuoteLineItemForBundleId} from '../../../../../redux/actions/quotelineitem';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';

const BundleSection: FC<any> = ({selectTedRowIds, setShowBundleModal}) => {
  const searchParams = useSearchParams();
  const getQuoteId = searchParams.get('id');
  const dispatch = useAppDispatch();
  const {data: bundleData, loading: BundleLoading} = useAppSelector(
    (state) => state.bundle,
  );
  const [radioValue, setRadioValue] = useState(1);
  const [token] = useThemeToken();
  const [bundleValue, setBundleValue] = useState<any>();
  const [bundleOptions, setBundleOptions] = useState<any>([]);
  const [existingBundleId, setExistingBundleId] = useState<any>();

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };
  const commonAddCreateBundle = async () => {
    if (existingBundleId) {
      const data = {
        Ids: selectTedRowIds,
        bundle_id: existingBundleId,
      };
      dispatch(updateQuoteLineItemForBundleId(data));
    } else {
      await dispatch(insertBundle(bundleValue)).then((e) => {
        if (e) {
          const data = {
            Ids: selectTedRowIds,
            bundle_id: e?.payload?.data?.id,
          };
          dispatch(updateQuoteLineItemForBundleId(data));
        }
      });
    }
    await dispatch(getAllBundle(getQuoteId));

    setRadioValue(1);
    setShowBundleModal(false);
    setTimeout(() => {
      location?.reload();
    }, 1000);
  };

  useEffect(() => {
    dispatch(getAllBundle(getQuoteId));
  }, []);

  useEffect(() => {
    const bundleArray: any = [];
    if (bundleData) {
      bundleData?.map((item: any) =>
        bundleArray?.push({label: item?.name, value: item?.id}),
      );
    }
    setBundleOptions(bundleArray);
  }, [bundleData]);

  return (
    <Space
      direction="vertical"
      size={18}
      style={{width: '100%', padding: '20px'}}
    >
      <Space direction="horizontal" size={18} style={{width: '100%'}}>
        <Radio.Group onChange={onChange} value={radioValue}>
          <Radio value={1}>
            {' '}
            <Typography name="Body 3/Regular">
              Add in existing Bundle
            </Typography>
          </Radio>
          <Radio value={2}>
            <Typography name="Body 3/Regular">Create new bundle</Typography>
          </Radio>
        </Radio.Group>
      </Space>
      {radioValue == 1 ? (
        <>
          {' '}
          <Typography style={{marginTop: '10px'}} name="Body 3/Regular">
            Add to Bundle
          </Typography>
          <CommonSelect
            style={{width: '100%', marginTop: '-156px'}}
            placeholder="Select Bundle"
            options={bundleOptions}
            onChange={(e) => {
              setExistingBundleId(e);
            }}
          />
        </>
      ) : (
        <>
          {' '}
          <Space
            direction="horizontal"
            size={2}
            style={{
              width: '100%',
            }}
          >
            {' '}
            <div>
              <Typography name="Body 3/Regular">Name of Bundle</Typography>
              <OsInput
                style={{width: '235px', marginTop: '5px'}}
                onChange={(e: any) => {
                  setBundleValue({
                    ...bundleValue,
                    name: e.target.value,
                    quote_id: getQuoteId,
                  });
                }}
              />
            </div>
            <div style={{marginLeft: '20px'}}>
              <Typography name="Body 3/Regular">Quantity</Typography>
              <OsInputNumber
                type="number"
                min={1}
                style={{width: '235px', marginTop: '5px'}}
                onChange={(e: any) => {
                  setBundleValue({...bundleValue, quantity: e});
                }}
              />
            </div>
          </Space>
          <Typography style={{marginTop: '10px'}} name="Body 3/Regular">
            Description
            <span style={{marginLeft: '3px', color: '#EB445A'}}>
              (optional)
            </span>
          </Typography>
          <OsInput
            style={{width: '98%', marginTop: '-16px'}}
            onChange={(e: any) => {
              setBundleValue({...bundleValue, description: e.target.value});
            }}
          />
        </>
      )}
      <div
        style={{display: 'flex', justifyContent: 'end', marginBottom: '-100px'}}
      >
        <OsButton
          loading={BundleLoading}
          text={radioValue == 1 ? 'Add' : 'Create'}
          buttontype="PRIMARY"
          clickHandler={commonAddCreateBundle}
        />
      </div>
    </Space>
  );
};

export default BundleSection;
