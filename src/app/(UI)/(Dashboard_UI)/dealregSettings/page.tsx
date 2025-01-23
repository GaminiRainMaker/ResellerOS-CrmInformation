'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {useEffect, useState} from 'react';
import {
  addAndUpdateScriptTimer,
  getAllGeneralSetting,
} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const DealregSetting = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {loading} = useAppSelector((state) => state.gereralSetting);
  const [dealregAppTimer, setDealregAppTimer] = useState<string>('');

  useEffect(() => {
    dispatch(getAllGeneralSetting('')).then((d) => {
      if (d?.payload) {
        setDealregAppTimer(d?.payload?.script_timer);
      }
    });
  }, []);

  const onFinish = () => {
    dispatch(
      addAndUpdateScriptTimer({
        script_timer: dealregAppTimer ? dealregAppTimer : '',
      }),
    );
  };

  return (
    <Space direction="vertical" size={24} style={{width: '100%'}}>
      <Row justify="space-between" align="middle">
        <Col>
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            Dealreg Setting
          </Typography>
        </Col>
        <Col>
          <OsButton
            text="Save"
            buttontype="PRIMARY"
            clickHandler={onFinish}
            loading={loading}
          />
        </Col>
      </Row>

      <Row>
        <Space direction="vertical">
          <Typography name="Body 3/Regular">
            Dealreg App Timer (inmilliseconds)
          </Typography>
          <OsInput
            placeholder="Enter time in milliseconds"
            type="number"
            onChange={(e) => {
              setDealregAppTimer(e.target.value);
            }}
            value={dealregAppTimer}
          />
        </Space>
      </Row>
    </Space>
  );
};

export default DealregSetting;
