/* eslint-disable eqeqeq */
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import {Radio, RadioChangeEvent} from 'antd';
import {FC, useEffect, useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import OsInput from '@/app/components/common/os-input';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getAllBundle, insertBundle} from '../../../../../redux/actions/bundle';

const BundleSection: FC<any> = () => {
  const dispatch = useAppDispatch();
  const {data: bundleData} = useAppSelector((state) => state.bundle);
  const [radioValue, setRadioValue] = useState(1);
  const [token] = useThemeToken();
  const [bundleValue, setBundleValue] = useState<any>();
  const [bundleOptions, setBundleOptions] = useState<React.Key[]>([]);

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };
  const commonAddCreateBundle = async () => {
    await dispatch(insertBundle(bundleValue));

    dispatch(getAllBundle(''));
    setRadioValue(1);
  };
  useEffect(() => {
    dispatch(getAllBundle(''));
  }, []);
  useEffect(() => {
    const bundleArray: any = [];
    if (bundleData) {
      bundleData?.map(
        (item: any) => bundleArray?.push({label: item?.name, value: item?.id}),
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
                  setBundleValue({...bundleValue, name: e.target.value});
                }}
              />
            </div>
            <div style={{marginLeft: '20px'}}>
              <Typography name="Body 3/Regular">Quantity</Typography>
              <OsInput
                style={{width: '235px', marginTop: '5px'}}
                type="number"
                onChange={(e: any) => {
                  setBundleValue({...bundleValue, quantity: e.target.value});
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
          text={radioValue == 1 ? 'Add' : 'Create'}
          buttontype="PRIMARY"
          clickHandler={commonAddCreateBundle}
        />
      </div>
    </Space>
  );
};

export default BundleSection;
