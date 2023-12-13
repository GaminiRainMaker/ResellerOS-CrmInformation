/* eslint-disable eqeqeq */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import {Divider, Radio, RadioChangeEvent} from 'antd';
import {FC, useState} from 'react';
import {Checkbox} from '@/app/components/common/antd/Checkbox';
import CommonSelect from '@/app/components/common/os-select';
import OsInput from '@/app/components/common/os-input';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const BundleSection: FC<any> = () => {
  const dispatch = useAppDispatch();
  const {data: quoteData, loading} = useAppSelector((state) => state.quote);
  const [radioValue, setRadioValue] = useState(1);
  const [token] = useThemeToken();
  const [bundleValue, setBundleValue] = useState<any>();

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  console.log('valuevalue', radioValue);
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
                onChange={() => {}}
              />
            </div>
            <div style={{marginLeft: '20px'}}>
              <Typography name="Body 3/Regular">Quantity</Typography>
              <OsInput
                style={{width: '235px', marginTop: '5px'}}
                type="number"
              />
            </div>
          </Space>
          <Typography style={{marginTop: '10px'}} name="Body 3/Regular">
            Description
            <span style={{marginLeft: '3px', color: '#EB445A'}}>
              (optional)
            </span>
          </Typography>
          <OsInput style={{width: '98%', marginTop: '-16px'}} />
        </>
      )}
      <div
        style={{display: 'flex', justifyContent: 'end', marginBottom: '-100px'}}
      >
        <OsButton
          text={radioValue == 1 ? 'Add' : 'Create'}
          buttontype="PRIMARY"
          //   clickHandler={() => {

          //   }}
        />
      </div>
    </Space>
  );
};

export default BundleSection;
