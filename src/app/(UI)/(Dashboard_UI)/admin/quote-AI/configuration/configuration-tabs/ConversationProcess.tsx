'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {ContractConfigurationColumn} from '@/app/utils/CONSTANTS';
import {useEffect, useState} from 'react';
import {TabContainerStyle} from './styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {
  getAllGeneralSetting,
  insertUpdateGeneralSetting,
} from '../../../../../../../../redux/actions/generalSetting';
import {ToggleColStyled} from '@/app/components/common/os-div-row-col/styled-component';
import {Switch} from '@/app/components/common/antd/Switch';
import {
  getUserByTokenAccess,
  updateAdvancedSetting,
} from '../../../../../../../../redux/actions/user';

const ConverSationProcess = () => {
  const [attachDocType, setAttachDocType] = useState<any>();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);

  const [AdvancedSetting, setAdvancedSetting] = useState<boolean>(false);

  const {data: generalSettingData, loading} = useAppSelector(
    (state) => state.gereralSetting,
  );

  const updateGeneralSetting = async () => {
    await dispatch(insertUpdateGeneralSetting(attachDocType));
    dispatch(getAllGeneralSetting(''));
  };
  useEffect(() => {
    setAttachDocType(generalSettingData);
  }, [generalSettingData]);
  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);
  useEffect(() => {
    dispatch(getUserByTokenAccess(''))?.then((payload: any) => {
      // setAdvancedSetting(payload?.payload?.advanced_excel);
      setAdvancedSetting(true);
    });
  }, []);
  const updateAdvancedSettingdd = async (value: boolean) => {
    await dispatch(updateAdvancedSetting({advanced_excel: value}));
    dispatch(getUserByTokenAccess(''))?.then((payload: any) => {
      setAdvancedSetting(payload?.payload?.advanced_excel);
    });
  };
  return (
    <TabContainerStyle>
      <Row>
        <Col span={24}>
          {/* {userInformation?.Admin && (
            <Space
              size={24}
              direction="horizontal"
              style={{
                width: '100%',
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
              }}
            >
              <Switch
                checked={AdvancedSetting}
                onChange={(e) => {
                  setAdvancedSetting(e);

                  updateAdvancedSettingdd(e);
                }}
              />
              <Typography name="Body 2/Medium">
                Advanced Excel/Pdf Files Processing
              </Typography>
            </Space>
          )} */}
          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              background: 'white',
              padding: '24px',
              marginTop: '30px',
              borderRadius: '12px',
            }}
          >
            <OsCollapseAdmin
              items={[
                {
                  key: '1',
                  label: (
                    <Typography name="Body 2/Medium">
                      Attachment Process
                    </Typography>
                  ),
                  children: (
                    <Space
                      size={4}
                      direction="vertical"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Typography name="Body 4/Medium">
                        Attach Doc to{' '}
                      </Typography>
                      <CommonSelect
                        placeholder="Select"
                        options={ContractConfigurationColumn}
                        value={attachDocType?.attach_doc_type}
                        onChange={(e) => {
                          setAttachDocType({
                            ...attachDocType,
                            attach_doc_type: e,
                          });
                        }}
                        style={{width: '100%'}}
                      />
                    </Space>
                  ),
                },
              ]}
            />
          </Space>

          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              background: 'white',
              borderRadius: '12px',
              marginTop: '30px',
              padding: '24px',
            }}
          >
            <OsCollapseAdmin
              items={[
                {
                  key: '2',
                  label: (
                    <Typography name="Body 2/Medium">
                      OEM Configuration{' '}
                    </Typography>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col>
                        <Space>
                          <Checkbox />
                          <Typography name="Body 4/Medium">
                            Include another field
                          </Typography>
                        </Space>
                      </Col>
                      <Col>
                        <Space>
                          <Checkbox />
                          <Typography name="Body 4/Medium">
                            Check case for OEM case
                          </Typography>
                        </Space>
                      </Col>
                      <Col>
                        <Space>
                          <Checkbox />
                          <Typography name="Body 4/Medium">
                            Include another vendor/disti field
                          </Typography>
                        </Space>
                      </Col>
                      <Col>
                        <Space>
                          <Checkbox />
                          <Typography name="Body 4/Medium">
                            Check case for vendor/disti field
                          </Typography>
                        </Space>
                      </Col>
                    </Row>
                  ),
                },
              ]}
            />
          </Space>

          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              background: 'white',
              borderRadius: '12px',
              marginTop: '30px',
              padding: '24px',
            }}
          >
            <OsCollapseAdmin
              items={[
                {
                  key: '3',
                  label: (
                    <Typography name="Body 2/Medium">
                      Existing Product Configuration{' '}
                    </Typography>
                  ),
                  children: (
                    <Space
                      size={36}
                      direction="vertical"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Space
                        direction="vertical"
                        size={4}
                        style={{width: '100%'}}
                      >
                        <Typography name="Body 4/Medium">
                          Price Book ID
                        </Typography>
                        <OsInput placeholder="Write here!" />
                      </Space>
                      <Space
                        direction="vertical"
                        size={4}
                        style={{width: '100%'}}
                      >
                        <Typography name="Body 4/Medium">
                          Match Criteria
                        </Typography>
                        <OsInput placeholder="Write here!" />
                      </Space>
                      <Space size={8}>
                        <Checkbox />
                        <Typography name="Body 4/Medium">
                          Match Existing Product
                        </Typography>
                      </Space>
                    </Space>
                  ),
                },
              ]}
            />
          </Space>
        </Col>
      </Row>
      <footer
        style={{
          width: 'max-content',
          float: 'right',
          position: 'absolute',
          bottom: '0%',
          right: '0%',
        }}
      >
        <OsButton
          text="Save"
          buttontype="PRIMARY"
          loading={loading}
          clickHandler={updateGeneralSetting}
        />
      </footer>
    </TabContainerStyle>
  );
};
export default ConverSationProcess;
